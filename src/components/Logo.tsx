/**
 * A.T Automation Solutions — official logo artwork.
 * Files live in /public/brand (transparent WebP, cut from the master logo).
 */
interface MarkProps {
  className?: string;
  /** kept for backwards compatibility with the old SVG version */
  idSuffix?: string;
}

/** The "AT" icon mark on its own (header, small spaces). */
export function LogoMark({ className = "" }: MarkProps) {
  return (
    <img
      src="/brand/logo-mark.webp"
      width={480}
      height={316}
      alt="A.T Automation Solutions logo"
      className={`select-none ${className}`}
      draggable={false}
      decoding="async"
    />
  );
}

interface LogoProps {
  className?: string;
}

/** Full stacked lockup: mark + wordmark + tagline. */
export default function Logo({ className = "w-64 sm:w-80" }: LogoProps) {
  return (
    <img
      src="/brand/logo-full.webp"
      width={640}
      height={524}
      alt="A.T Automation Solutions — Empowering growth with AI"
      className={`select-none h-auto ${className}`}
      draggable={false}
      decoding="async"
    />
  );
}
