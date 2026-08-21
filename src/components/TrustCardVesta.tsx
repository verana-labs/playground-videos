// The real Proof of Trust shown in I-10: a faithful replica of the
// playground's full TrustCard for Vesta Appliances ("chain" design), matching
// the site card element for element: DID row (with copy / open / close
// icons), Service and Operated-by checks, the Verana-branded TRUSTED verdict
// with its registry note, the amber "Also presents: ISO 9001 (demo)" section,
// and the three ISSUER accreditations (ECS-Service, ECS-Badge, Authorized
// Repairer). Data mirrors playground app/usecases/vesta/scenes.ts.
import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

const VeranaTile: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden>
    <defs>
      <linearGradient id="tcVesta" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#763EF0" />
        <stop offset="100%" stopColor="#9F7AEA" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="12" fill="url(#tcVesta)" />
    <g transform="translate(12.3 13.1) scale(0.7407)" fill="#fff">
      <path d="M26.9932 51.6972L5.805 11.0977L2.91263 16.2161L0 10.6048L5.98725 0L26.9932 40.2483L47.9993 0L54 10.6217L51.0773 16.2161L48.1849 11.0977L26.9932 51.6972Z" />
      <path d="M13.696 0L26.9935 25.4637L39.9367 0H13.696Z" />
    </g>
  </svg>
);

const Icon: React.FC<{ d: React.ReactNode; size?: number; color?: string }> = ({
  d,
  size = 17,
  color = "#9ca3af",
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

const Tick: React.FC = () => (
  <span
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      width: 38,
      height: 38,
      borderRadius: 19,
      border: "3px solid #059669",
      background: "#ecfdf5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  </span>
);

const MicroLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#9ca3af" }}>
    {children}
  </div>
);

const GreenCheckInline: React.FC = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#059669", fontWeight: 700 }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
    verified
  </span>
);

export const TrustCardVesta: React.FC<{ appeared?: number }> = ({ appeared = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = (t: number) =>
    interpolate(frame - appeared - fps * t, [0, 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  return (
    <div
      style={{
        width: 1010,
        background: "#fff",
        borderRadius: 20,
        border: "1.5px solid #e5e7eb",
        boxShadow: "0 30px 80px rgba(15,23,42,0.14)",
        padding: "24px 28px",
        fontFamily: theme.font,
        textAlign: "left",
      }}
    >
      {/* DID row with copy / open / close icons, as on the site */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: at(0) }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: "#059669", boxShadow: "0 0 0 4px #ecfdf5", flexShrink: 0 }} />
        <span style={{ fontFamily: theme.mono, fontSize: 17, color: "#4b5563", whiteSpace: "nowrap" }}>
          did:webvh:QmVd...8r7S:vesta.playground.testnet.verana.network
        </span>
        <Icon d={<><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>} />
        <Icon d={<><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>} />
        <span style={{ marginLeft: "auto" }}>
          <Icon d={<path d="M18 6 6 18M6 6l12 12" />} />
        </span>
      </div>

      {/* Verification chain */}
      <div style={{ position: "relative", marginTop: 16 }}>
        <span style={{ position: "absolute", left: 17, top: 8, bottom: 22, width: 3, background: "linear-gradient(to bottom, #a7f3d0, #34d399)" }} />
        <div style={{ position: "relative", paddingLeft: 56, paddingBottom: 14, opacity: at(0.2) }}>
          <Tick />
          <MicroLabel>Service · ECS-Service</MicroLabel>
          <div style={{ fontSize: 23, fontWeight: 800, color: theme.ink }}>Vesta Appliances</div>
          <div style={{ fontSize: 16.5, color: theme.muted }}>
            Organization anchor service · Self-issued (controller: Vesta Appliances) · Verana ECS Ecosystem
          </div>
        </div>
        <div style={{ position: "relative", paddingLeft: 56, paddingBottom: 14, opacity: at(0.45) }}>
          <Tick />
          <MicroLabel>Operated by · ECS-Organization</MicroLabel>
          <div style={{ fontSize: 23, fontWeight: 800, color: theme.ink }}>
            Vesta Appliances {"\u{1F1E8}\u{1F1ED}"} · Geneva, Switzerland
          </div>
          <div style={{ fontSize: 16.5, color: theme.muted }}>
            Helvetia Trust Services (demo) · Verana ECS Ecosystem
          </div>
        </div>
      </div>

      {/* Verdict + registry note */}
      <div style={{ paddingLeft: 56, opacity: at(0.7), transformOrigin: "left center", transform: `scale(${0.92 + 0.08 * at(0.7)})` }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 14,
            border: "3px solid #059669",
            background: "#fff",
            padding: "8px 18px",
            fontSize: 20,
            fontWeight: 900,
            letterSpacing: 1,
            color: "#059669",
            boxShadow: "0 6px 20px rgba(5,150,105,0.25)",
          }}
        >
          <VeranaTile /> TRUSTED
        </span>
        <div style={{ marginTop: 8, fontSize: 15.5, color: "#9ca3af" }}>
          Both identity checks verified against the Verana public registry (story data - dedicated Vesta cast pending).
        </div>
      </div>

      {/* Also presents: ISO 9001 (demo) */}
      <div style={{ marginTop: 14, borderTop: "1.5px solid #e5e7eb", paddingTop: 10, opacity: at(0.95) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#b45309", fontSize: 17.5, fontWeight: 700 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          Also presents: ISO 9001 (demo)
          <span style={{ marginLeft: "auto" }}>
            <Icon d={<path d="m18 15-6-6-6 6" />} size={15} />
          </span>
        </div>
        <div style={{ marginTop: 6, paddingLeft: 28, fontSize: 16.5, color: "#4b5563", display: "flex", alignItems: "center", gap: 6 }}>
          <b style={{ color: theme.ink }}>ISO 9001 (demo)</b> · issued by NormaCert (demo) · ISO Certification Ecosystem (demo) <GreenCheckInline />
        </div>
      </div>

      {/* Accreditations: the three ISSUER roles */}
      <div style={{ marginTop: 12, borderTop: "1.5px solid #e5e7eb", paddingTop: 10, opacity: at(1.15) }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <MicroLabel>Accreditations</MicroLabel>
          <span style={{ borderRadius: 999, background: "#f5f3ff", color: theme.violet, fontSize: 14, fontWeight: 800, padding: "1px 12px" }}>
            3
          </span>
          <span style={{ marginLeft: "auto" }}>
            <Icon d={<path d="m18 15-6-6-6 6" />} size={15} />
          </span>
        </div>
        {[
          ["ECS-Service", "Verana ECS Ecosystem · self-accredited", 0],
          ["ECS-Badge", "Verana ECS Ecosystem · self-accredited", 1],
          ["Authorized Repairer", "Vesta Repair Network · ecosystem root", 2],
        ].map(([schema, context, i]) => (
          <div
            key={schema as string}
            style={{ display: "flex", alignItems: "baseline", gap: 11, marginBottom: 6, opacity: at(1.2 + (i as number) * 0.15) }}
          >
            <span
              style={{
                borderRadius: 6,
                background: "#f5f3ff",
                color: theme.violet,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.5,
                padding: "3px 9px",
                textTransform: "uppercase",
              }}
            >
              ISSUER
            </span>
            <span style={{ fontSize: 18.5, fontWeight: 800, color: theme.ink }}>{schema}</span>
            <span style={{ fontSize: 16, color: theme.muted }}>{context}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
