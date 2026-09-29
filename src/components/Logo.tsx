interface MarkProps {
  className?: string;
  idSuffix?: string;
}

/**
 * A.T Automation Solutions — icon mark.
 *
 * The "A" is a clean chrome triangle; the "T" is a crossbar with a rounded
 * right cap plus a stem that overlaps the triangle's right leg. A black
 * articulated robotic arm sits inside the triangle.
 */
export function LogoMark({ className = "", idSuffix = "a" }: MarkProps) {
  const gTri = `at-tri-${idSuffix}`;
  const gT = `at-t-${idSuffix}`;
  const clipA = `at-clip-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 640 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A.T Automation Solutions"
    >
      <defs>
        {/* chrome across the triangle: bright apex falling to a cool base */}
        <linearGradient id={gTri} gradientUnits="userSpaceOnUse" x1="120" y1="45" x2="440" y2="425">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor="#eef2f8" />
          <stop offset="64%" stopColor="#c6cfdc" />
          <stop offset="100%" stopColor="#8792a5" />
        </linearGradient>

        {/* T: white crossbar polishing down into a grey stem */}
        <linearGradient id={gT} gradientUnits="userSpaceOnUse" x1="0" y1="45" x2="0" y2="425">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#edf1f7" />
          <stop offset="70%" stopColor="#aab4c4" />
          <stop offset="100%" stopColor="#7d8798" />
        </linearGradient>

        {/* keep every shading pass inside the A silhouette */}
        <clipPath id={clipA}>
          <path
            d="M255 45 L475 420 L35 420 Z
               M255 232 L355 420 L155 420 Z"
            clipRule="evenodd"
          />
        </clipPath>
      </defs>

      {/* ---------- T ---------- */}
      {/* crossbar — square top-right corner, large rounded bottom-right cap */}
      <path d="M300 45 H605 V57 A55 55 0 0 1 550 112 H300 Z" fill={`url(#${gT})`} />
      {/* stem */}
      <path d="M450 112 H520 V420 H450 Z" fill={`url(#${gT})`} />

      {/* ---------- A: triangle with an inverted-V counter ---------- */}
      <path
        d="M255 45 L475 420 L35 420 Z
           M255 232 L355 420 L155 420 Z"
        fill={`url(#${gTri})`}
        fillRule="evenodd"
      />

      {/* directional chrome shading, clipped to the A */}
      <g clipPath={`url(#${clipA})`}>
        {/* bright specular running down the outer left slope */}
        <path d="M255 45 L35 420 L102 420 L255 158 Z" fill="#ffffff" opacity="0.75" />
        {/* softer falloff just inboard of the highlight */}
        <path d="M255 45 L102 420 L142 420 L255 227 Z" fill="#ffffff" opacity="0.3" />
        {/* right leg sits in shadow */}
        <path d="M255 45 L475 420 L404 420 L255 165 Z" fill="#5d6879" opacity="0.4" />
        {/* deepest tone hugging the outer right edge */}
        <path d="M255 45 L475 420 L442 420 L255 105 Z" fill="#3e4757" opacity="0.42" />
      </g>

      {/* black seam where the triangle's right leg crosses the T stem */}
      <path
        d="M449 376 L478 425"
        stroke="#03030A"
        strokeWidth="11"
        strokeLinecap="square"
      />

      {/* ---------- Robotic arm (reaching upward) ---------- */}
      {/* shoulder pivot low-left -> upper arm rises right -> elbow ->
          forearm angles up-left -> wrist pivot -> gripper claw opening up */}

      {/* upper arm: shoulder up-right to elbow */}
      <path
        d="M186 356 L300 320"
        fill="none"
        stroke="#03030A"
        strokeWidth="46"
        strokeLinecap="round"
      />
      {/* forearm: elbow rising up-left to the wrist */}
      <path
        d="M300 320 L246 196"
        fill="none"
        stroke="#03030A"
        strokeWidth="44"
        strokeLinecap="round"
      />

      {/* shoulder pivot */}
      <circle cx="180" cy="358" r="36" fill="#03030A" />
      <circle cx="180" cy="358" r="15" fill="#F4F7FB" />

      {/* wrist pivot */}
      <circle cx="244" cy="190" r="32" fill="#03030A" />
      <circle cx="244" cy="190" r="13.5" fill="#F4F7FB" />

      {/* gripper claw — prongs flare upward, U-notch opening to the top */}
      <path
        d="M227 170
           C 211 163, 202 149, 202 132
           L 202 122
           A 12 12 0 0 1 226 122
           L 226 130
           C 226 139, 233 144, 242 144
           L 247 144
           C 256 144, 263 139, 263 130
           L 263 122
           A 12 12 0 0 1 287 122
           L 287 132
           C 287 149, 278 163, 262 170
           Z"
        fill="#03030A"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  showTagline?: boolean;
}

const BLUE = "#5566CC";
const RULE = "#3A49A8";

/** Full stacked lockup: mark + wordmark + rules + tagline. */
export default function Logo({
  className = "",
  markClassName = "w-40 sm:w-52",
  showTagline = true,
}: LogoProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <LogoMark className={markClassName} idSuffix="full" />

      {/* A.T AUTOMATION */}
      <div className="mt-6 font-display text-2xl sm:text-4xl font-bold tracking-[0.16em] whitespace-nowrap leading-none">
        <span style={{ color: BLUE }}>A.T</span>{" "}
        <span className="text-white">AUTOMATION</span>
      </div>

      {/* ——— SOLUTIONS ——— */}
      <div className="mt-3 flex w-full items-center justify-center gap-4">
        <span className="h-px flex-1 max-w-[70px] sm:max-w-[110px]" style={{ background: RULE }} />
        <span
          className="font-display text-sm sm:text-xl font-medium tracking-[0.46em] leading-none pl-[0.46em]"
          style={{ color: BLUE }}
        >
          SOLUTIONS
        </span>
        <span className="h-px flex-1 max-w-[70px] sm:max-w-[110px]" style={{ background: RULE }} />
      </div>

      {showTagline && (
        <div className="mt-4 font-body text-[9px] sm:text-[11px] font-light tracking-[0.34em] text-[#E4E9F2] pl-[0.34em]">
          EMPOWERING GROWTH WITH AI
        </div>
      )}
    </div>
  );
}
