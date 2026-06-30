/**
 * SVG-mask geometry for the silk reveal.
 *
 * The reveal works by translating a wide diagonal gradient across an SVG
 * mask. While the gradient sweeps across, the logo is revealed; after the
 * sweep the highlight stays on as a subtle stationary sheen that the
 * cursor nudges by 2-3 pixels.
 */

export const LOGO_VIEWBOX = 200;

/** Build the gradient stops for the moving silk highlight. */
export const silkStops = (color: string) => [
  { offset: 0.0, stopColor: "#000000" },
  { offset: 0.42, stopColor: "#000000" },
  { offset: 0.5, stopColor: "#ffffff" },
  { offset: 0.58, stopColor: "#000000" },
  { offset: 1.0, stopColor: "#000000" },
  // 'color' kept in signature for downstream tinting if needed
  { offset: -1, stopColor: color },
];

/** Compute the (x1,y1)-(x2,y2) anchors of the moving silk gradient. */
export const silkGradient = (progress: number, angleDeg: number) => {
  // progress 0 -> highlight off-screen left, 1 -> off-screen right
  const span = 280; // travel range in viewBox units
  const cx = -40 + progress * span;
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad) * 90;
  const dy = Math.sin(rad) * 90;
  return {
    x1: cx - dx,
    y1: 100 - dy,
    x2: cx + dx,
    y2: 100 + dy,
  };
};