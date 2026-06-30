// Shared types for the hero/ribbon module.

export interface RibbonCanvasProps {
  /** Hex color of the satin ribbon. */
  color?: string;
  /** Width of the ribbon strip in world units. */
  width?: number;
  /** Number of control points along the ribbon. */
  segments?: number;
  /** Enable mouse interaction. */
  interactive?: boolean;
  /** Optional className for the wrapping div. */
  className?: string;
}

export interface RibbonProps {
  color: string;
  width: number;
  segments: number;
  interactive: boolean;
  reduceMotion: boolean;
  quality: "high" | "medium" | "low";
}

export interface ControlPoint {
  x: number;
  y: number;
  z: number;
  // previous position for verlet integration
  px: number;
  py: number;
  pz: number;
  // rest (home) position
  rx: number;
  ry: number;
  rz: number;
}
