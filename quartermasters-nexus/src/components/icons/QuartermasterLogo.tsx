interface LogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "mono" | "icon";
}

/**
 * Brand logo placeholder.
 * variant="icon" renders just the logo mark.
 * variant="full" renders the logo mark + brand name text.
 */
export function QuartermasterLogo({
  size = 48,
  className = "",
  variant = "full",
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logo mark — placeholder circle until brand finalized */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #1B3A4B 0%, #2A9D8F 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: size * 0.4,
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          B
        </span>
      </div>

      {variant === "full" && (
        <div className="flex flex-col">
          <span
            className="text-lg font-medium tracking-wide leading-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            Quartermasters
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Favicon-ready version — simplified, no text.
 */
export function QuartermasterIcon({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return <QuartermasterLogo size={size} className={className} variant="icon" />;
}
