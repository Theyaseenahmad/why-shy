

export interface LogoRevealProps {
  /** Optional className for the wrapping element. */
  className?: string;
  /** Optional pixel size of the rendered logo. */
  size?: number;
  /** Hex color of the silk highlight & ribbon banner. */
  accent?: string;
}

export interface HighlightState {
  /** angle in degrees of the moving silk highlight */
  angle: number;
  /** intensity scalar [0..1] of the post-reveal sheen */
  intensity: number;
  /** progress of the entrance [0..1] */
  progress: number;
}
