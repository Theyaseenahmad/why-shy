import type { ControlPoint } from "./types";

/**
 * Verlet-integration ribbon physics.
 *
 * The ribbon is modelled as a chain of points connected by distance
 * constraints. Each frame we:
 *   1. apply external forces (spring-to-home, mouse repulsion, idle breathing)
 *   2. integrate using verlet (no velocity stored explicitly)
 *   3. relax distance constraints between adjacent points
 *   4. pin the two endpoints to their rest position
 *
 * All math is allocation-free: callers reuse the same arrays/objects every
 * frame.
 */

export const createControlPoints = (
  count: number,
  width: number
): ControlPoint[] => {
  const points: ControlPoint[] = new Array(count);
  const half = width / 2;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    // gentle parabolic arc at rest for a natural draped feel
    const x = -half + t * width;
    const y = Math.sin(t * Math.PI) * 0.18 - 0.05;
    const z = Math.cos(t * Math.PI) * 0.08;
    points[i] = {
      x,
      y,
      z,
      px: x,
      py: y,
      pz: z,
      rx: x,
      ry: y,
      rz: z,
    };
  }
  return points;
};

export interface StepOptions {
  /** mouse world position; null if no interaction this frame */
  mouseX: number;
  mouseY: number;
  mouseActive: boolean;
  /** interaction radius (world units) */
  radius: number;
  /** repulsion strength */
  push: number;
  /** spring constant pulling each point back to its rest position */
  spring: number;
  /** damping (0 = none, 1 = freeze) */
  damping: number;
  /** time in seconds for idle breathing */
  time: number;
  /** number of constraint iterations */
  iterations: number;
  /** breathing amplitude */
  breath: number;
  /** influence of entrance animation [0..1]; while < 1 the right side is
   * folded toward the left so the ribbon can "weave" itself across */
  entrance: number;
}

export const stepRibbon = (points: ControlPoint[], opts: StepOptions): void => {
  const count = points.length;
  const {
    mouseX,
    mouseY,
    mouseActive,
    radius,
    push,
    spring,
    damping,
    time,
    iterations,
    breath,
    entrance,
  } = opts;

  const radiusSq = radius * radius;
  const invR = 1 / radius;
  const oneMinusDamp = 1 - damping;

  // 1. Forces + verlet integration -----------------------------------------
  for (let i = 0; i < count; i++) {
    const p = points[i];
    const t = i / (count - 1);

    // entrance: while entrance < 1, force points to the right of the
    // travelling "head" to their starting bunched position near the left
    // anchor, then release them as the head passes through.
    let rx = p.rx;
    let ry = p.ry;
    let rz = p.rz;
    if (entrance < 1) {
      const head = entrance; // 0..1, position of the travelling end
      if (t > head) {
        const k = (t - head) / Math.max(1 - head, 0.0001);
        rx = p.rx * (1 - k) + points[0].rx * k;
        ry = p.ry * (1 - k) + (points[0].ry - 0.15) * k;
        rz = p.rz * (1 - k) + (points[0].rz + 0.05) * k;
      }
    }

    // spring-to-rest
    let fx = (rx - p.x) * spring;
    let fy = (ry - p.y) * spring;
    let fz = (rz - p.z) * spring;

    // gentle, non-looping idle motion (sum of slow sinusoids w/ irrational
    // frequencies so the pattern never visibly repeats)
    const phase = t * Math.PI * 2.0;
    fy += Math.sin(time * 0.31 + phase * 1.0) * breath;
    fy += Math.sin(time * 0.17 + phase * 2.3) * breath * 0.45;
    fz += Math.cos(time * 0.23 + phase * 1.7) * breath * 0.55;

    // mouse repulsion (skip on endpoints, they are pinned anyway)
    if (mouseActive && i !== 0 && i !== count - 1) {
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const distSq = dx * dx + dy * dy;
      if (distSq < radiusSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        // smoothstep falloff so the push is gentle at the edge and never snaps
        const n = 1 - dist * invR;
        const falloff = n * n * (3 - 2 * n);
        const f = (push * falloff) / dist;
        fx += dx * f;
        fy += dy * f;
        // small out-of-plane push so the ribbon catches light differently
        fz += falloff * push * 0.35;
      }
    }

    // verlet integrate
    const vx = (p.x - p.px) * oneMinusDamp;
    const vy = (p.y - p.py) * oneMinusDamp;
    const vz = (p.z - p.pz) * oneMinusDamp;
    p.px = p.x;
    p.py = p.y;
    p.pz = p.z;
    p.x = p.x + vx + fx;
    p.y = p.y + vy + fy;
    p.z = p.z + vz + fz;
  }

  // 2. Distance constraints -------------------------------------------------
  // Compute the rest distance between each pair from the home positions
  // (cached on the points). This is cheap and keeps the ribbon "stiff" so it
  // never stretches into a noodle.
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < count - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const rdx = b.rx - a.rx;
      const rdy = b.ry - a.ry;
      const rdz = b.rz - a.rz;
      const rest = Math.sqrt(rdx * rdx + rdy * rdy + rdz * rdz);

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dz = b.z - a.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.0001;
      const diff = (dist - rest) / dist;
      // small stiffness factor so movement still propagates
      const k = 0.5;
      const ox = dx * diff * 0.5 * k;
      const oy = dy * diff * 0.5 * k;
      const oz = dz * diff * 0.5 * k;
      a.x += ox;
      a.y += oy;
      a.z += oz;
      b.x -= ox;
      b.y -= oy;
      b.z -= oz;
    }

    // 3. Pin endpoints back to home
    const first = points[0];
    first.x = first.rx;
    first.y = first.ry;
    first.z = first.rz;

    const last = points[count - 1];
    // while entrance < 1, the "travelling head" is the right endpoint and
    // animates from left anchor across to its rest position
    if (entrance < 1) {
      const head = entrance;
      last.x = first.rx + (last.rx - first.rx) * head;
      last.y = first.ry + (last.ry - first.ry) * head + Math.sin(head * Math.PI) * 0.15;
      last.z = first.rz + (last.rz - first.rz) * head;
    } else {
      last.x = last.rx;
      last.y = last.ry;
      last.z = last.rz;
    }
  }
};
