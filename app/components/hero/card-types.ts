// Types for FloatingCards.

export interface FloatingCardData {
  id: string;
  label: string;
  title: string;
  meta?: string;
  /** screen-space coordinates expressed as fractions of the viewport.
   * x: 0 (left) -> 1 (right). y: 0 (top) -> 1 (bottom). */
  x: number;
  y: number;
  /** z layer for parallax. 1 = furthest, 5 = closest. */
  depth: 1 | 2 | 3 | 4 | 5;
  /** tilt at rest (deg) for editorial off-axis feel */
  tilt: number;
  variant: "creator" | "campaign" | "metric" | "tag" | "status" | "strategy";
  /** entrance order */
  order: number;
}

export interface FloatingCardProps {
  data: FloatingCardData;
  mouseX: number;
  mouseY: number;
}
