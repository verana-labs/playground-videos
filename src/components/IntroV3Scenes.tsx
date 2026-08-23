// INTRO v3 scenes: start as copies of the v2 scenes; edit freely (v2's
// files stay untouched).
//   N-1 "foundations": the W3C standards layer and the eIDAS 2.0 legal layer
//       locking together as a stack.
//   N-2 "silos": the stack holds, but around it ecosystems sit isolated.
//   N-9a "build-eco": for ecosystem builders, the governance card alone.
//   N-9b "build-service": for service builders: Join · Choose · Bridge.
//   N-10 "verana-close": lockup, verana.io, the sovereign tagline.
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { AssetImg, useAsset } from "../lib/assets";
import { QrScanToPhone } from "./QrScan";
import { VeranaIoLogo, VeranaMark } from "./VeranaLogo";

const pop = (frame: number, fps: number, d: number) =>
  spring({ frame: frame - fps * d, fps, config: { damping: 200 } });

const WalletTile: React.FC<{ id: string; size?: number }> = ({ id, size = 112 }) => {
  const src = useAsset(`wallet-logos/${id}`);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: theme.card,
        boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: theme.font,
      }}
    >
      {src ? (
        <AssetImg id={`wallet-logos/${id}`} cover={false} style={{ padding: size * 0.14 }} />
      ) : (
        <span style={{ fontSize: size * 0.14, color: theme.muted }}>{id}</span>
      )}
    </div>
  );
};

// ---------------------------------------------------------------- N-1
const Chip: React.FC<{ children: React.ReactNode; color?: "violet" | "blue" }> = ({
  children,
  color = "violet",
}) => (
  <span
    style={{
      fontFamily: theme.mono,
      fontSize: 16,
      color: color === "violet" ? "#6d28d9" : "#1d4ed8",
      background: color === "violet" ? "#f5f3ff" : "#eff6ff",
      border: `1.5px solid ${color === "violet" ? "#ddd6fe" : "#bfdbfe"}`,
      borderRadius: 999,
      padding: "4px 12px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const IdCard: React.FC<{ icon: "user" | "building" | "thing"; label: string }> = ({
  icon,
  label,
}) => {
  const st = { fill: "none", stroke: theme.violet, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <div
      style={{
        width: 250,
        background: theme.card,
        border: "1.5px solid #e2e8f0",
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
      }}
    >
      <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
        {icon === "user" ? (
          <>
            <circle cx="12" cy="8" r="4" {...st} />
            <path d="M5 21 a7 6 0 0 1 14 0" {...st} />
          </>
        ) : icon === "building" ? (
          <>
            <path d="M4 21 V5.5 L13 3 v18 M13 9 l7 2 v10 M2.5 21 h19" {...st} />
          </>
        ) : (
          <>
            <rect x="4" y="7" width="16" height="10" rx="2" {...st} />
            <path d="M8 21 h8 M12 17 v4 M9 11.5 h6" {...st} />
          </>
        )}
      </svg>
      <div style={{ fontFamily: theme.font, fontSize: 21, fontWeight: 700, color: theme.ink }}>
        {label}
      </div>
    </div>
  );
};

const StarsSeal: React.FC<{ size?: number }> = ({ size = 74 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
    <circle cx="24" cy="24" r="22" fill="#1d4ed8" />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x = 24 + 14 * Math.cos(a);
      const y = 24 + 14 * Math.sin(a);
      return (
        <text key={i} x={x} y={y + 2.6} textAnchor="middle" fontSize={7} fill="#facc15">
          {"★"}
        </text>
      );
    })}
  </svg>
);

// N-1 (merged with the former N-1b): Verifiable Credentials are becoming a
// reality. Beat A: the trust triangle under the standards bodies' logo tiles
// (W3C, OWF, ToIP, DIF, ISO/IEC 18013-5). Beat B: the stage splits and nine
// implementation/framework logos pop in (eIDAS 2.0, Google AP2, GLEIF,
// Microsoft Entra, Open Badges, Digi Yatra, ICAO, Catena-X, C2PA).

/** Centered scene title (N-1 / N-1b): mono kicker over a bold headline. */
const SceneTitle: React.FC<{ kicker: string; title: string }> = ({ kicker, title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 0.15);
  return (
    <div
      style={{
        position: "absolute",
        top: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: theme.font,
        opacity: s,
        transform: `translateY(${(1 - s) * -16}px)`,
      }}
    >
      <div style={{ fontFamily: theme.mono, fontSize: 16, letterSpacing: 3, color: theme.faint, textTransform: "uppercase" }}>
        {kicker}
      </div>
      <div style={{ fontSize: 46, fontWeight: 800, color: theme.ink }}>{title}</div>
    </div>
  );
};

const LogoTile: React.FC<{ id: string; label: string; s: number; size?: number }> = ({
  id,
  label,
  s,
  size = 190,
}) => {
  const src = useAsset(id);
  return (
    <div
      style={{
        width: size,
        borderRadius: 18,
        background: theme.card,
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
        padding: "16px 12px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        fontFamily: theme.font,
        opacity: s,
        transform: `scale(${s})`,
      }}
    >
      <div style={{ width: size * 0.42, height: size * 0.42, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {src ? (
          <AssetImg id={id} cover={false} />
        ) : (
          <span style={{ fontSize: 20, fontWeight: 800, color: theme.violet }}>{label}</span>
        )}
      </div>
      <div style={{ fontSize: 15.5, fontWeight: 600, color: theme.muted, textAlign: "center", lineHeight: 1.25 }}>
        {label}
      </div>
    </div>
  );
};

const TriangleNode: React.FC<{ label: string; s: number }> = ({ label, s }) => (
  <div
    style={{
      width: 210,
      padding: "14px 0",
      textAlign: "center",
      background: theme.card,
      border: `2px solid ${theme.violet}`,
      borderRadius: 16,
      boxShadow: "0 10px 26px rgba(15,23,42,0.10)",
      fontFamily: theme.font,
      fontSize: 25,
      fontWeight: 700,
      color: theme.ink,
      opacity: s,
      transform: `scale(${s})`,
    }}
  >
    {label}
  </div>
);

/** Implementation/framework tile: the logo alone on a white card. */
const ImplTile: React.FC<{ id: string; fallback: string; s: number }> = ({ id, fallback, s }) => {
  const src = useAsset(id);
  return (
    <div
      style={{
        width: 172,
        height: 172,
        borderRadius: 22,
        background: theme.card,
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: theme.font,
        opacity: s,
        transform: `scale(${s})`,
      }}
    >
      {src ? (
        <AssetImg id={id} cover={false} style={{ padding: 26 }} />
      ) : (
        <span style={{ fontSize: 19, fontWeight: 800, color: theme.violet, textAlign: "center" }}>{fallback}</span>
      )}
    </div>
  );
};

const IMPLEMENTATIONS = [
  { id: "wallet-logos/eudi", fallback: "eIDAS 2.0" },
  { id: "standards-logos/ap2", fallback: "Google AP2" },
  { id: "standards-logos/gleif", fallback: "GLEIF" },
  { id: "standards-logos/entra", fallback: "Microsoft Entra" },
  { id: "standards-logos/openbadges", fallback: "Open Badges" },
  { id: "standards-logos/digiyatra", fallback: "Digi Yatra" },
  { id: "standards-logos/icao", fallback: "ICAO" },
  { id: "standards-logos/catenax", fallback: "Catena-X" },
  { id: "standards-logos/c2pa", fallback: "C2PA" },
];

export const FoundationsV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  // Beat B push: the standards group compresses to the left half.
  const shift = ease(interpolate(t, [8.0, 8.9], [0, 1], clamp));
  // Animated edge draw for the trust triangle.
  const draw = (d: number, len: number) => ({
    strokeDasharray: len,
    strokeDashoffset: len * (1 - interpolate(t, [d, d + 0.7], [0, 1], clamp)),
  });
  const edgeLabel: React.CSSProperties = {
    position: "absolute",
    fontFamily: theme.mono,
    fontSize: 19,
    color: theme.violet,
    background: "#f5f3ff",
    border: "1.5px solid #ddd6fe",
    borderRadius: 999,
    padding: "3px 14px",
  };
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      <SceneTitle kicker="the foundations" title="Verifiable Credentials" />
      {/* ---- beat A: the standards ecosystem, then docked left ---- */}
      <div
        style={{
          position: "absolute",
          top: 170,
          left: "50%",
          width: 1240,
          transform: `translateX(calc(-50% + ${-shift * 450}px)) scale(${1 - shift * 0.36})`,
          transformOrigin: "top center",
        }}
      >
        <div style={{ display: "flex", gap: 22, justifyContent: "center" }}>
          {[
            { id: "standards-logos/w3c", label: "W3C", at: 0.4 },
            { id: "standards-logos/owf", label: "OpenWallet Foundation", at: 0.65 },
            { id: "standards-logos/toip", label: "Trust over IP", at: 0.9 },
            { id: "standards-logos/dif", label: "DIF", at: 1.15 },
            { id: "standards-logos/iso", label: "ISO/IEC 18013-5", at: 1.4 },
          ].map((l) => (
            <LogoTile key={l.id} id={l.id} label={l.label} s={pop(frame, fps, l.at)} />
          ))}
        </div>
        {/* the verifiable-credentials trust triangle */}
        <div style={{ position: "relative", width: 1040, height: 410, margin: "30px auto 0" }}>
          <svg
            width={1040}
            height={410}
            viewBox="0 0 1040 410"
            style={{ position: "absolute", inset: 0 }}
            aria-hidden
          >
            <defs>
              <marker id="tri-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 z" fill={theme.violet} />
              </marker>
            </defs>
            {/* issues: Issuer -> Holder */}
            <line x1={215} y1={112} x2={455} y2={294} stroke={theme.violet} strokeWidth={3} markerEnd="url(#tri-arrow)" {...draw(2.3, 330)} />
            {/* presents: Holder -> Verifier */}
            <line x1={585} y1={294} x2={825} y2={112} stroke={theme.violet} strokeWidth={3} markerEnd="url(#tri-arrow)" {...draw(2.9, 330)} />
            {/* trusts?: Verifier -> Issuer, the edge Verana serves */}
            <line x1={790} y1={62} x2={250} y2={62} stroke={theme.faint} strokeWidth={3} strokeDasharray="10 8" markerEnd="url(#tri-arrow)" opacity={interpolate(t, [3.5, 4.0], [0, 1], clamp)} />
          </svg>
          <div style={{ position: "absolute", left: 65, top: 32 }}>
            <TriangleNode label="Issuer" s={pop(frame, fps, 1.7)} />
          </div>
          <div style={{ position: "absolute", left: 765, top: 32 }}>
            <TriangleNode label="Verifier" s={pop(frame, fps, 2.1)} />
          </div>
          <div style={{ position: "absolute", left: 415, top: 280 }}>
            <TriangleNode label="Holder" s={pop(frame, fps, 1.9)} />
          </div>
          <div style={{ ...edgeLabel, left: 240, top: 190, opacity: interpolate(t, [2.6, 2.9], [0, 1], clamp) }}>issues</div>
          <div style={{ ...edgeLabel, left: 690, top: 190, opacity: interpolate(t, [3.2, 3.5], [0, 1], clamp) }}>presents</div>
          <div style={{ ...edgeLabel, left: 468, top: 20, color: theme.muted, background: "#f8fafc", border: "1.5px solid #e2e8f0", opacity: interpolate(t, [3.7, 4.0], [0, 1], clamp) }}>trusts?</div>
          {/* credential formats, snapping onto the credential */}
          <div style={{ position: "absolute", left: 0, right: 0, top: 366, display: "flex", gap: 14, justifyContent: "center" }}>
            {["SD-JWT VC", "mdoc"].map((c, i) => (
              <span
                key={c}
                style={{
                  fontFamily: theme.mono,
                  fontSize: 20,
                  color: "#1d4ed8",
                  background: "#eff6ff",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: 999,
                  padding: "5px 18px",
                  transform: `scale(${pop(frame, fps, 3.4 + i * 0.2)})`,
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---- beat B: implementations and frameworks, logos only ---- */}
      {t >= 8.0 ? (
        <div style={{ position: "absolute", left: 1106, top: 196, width: 568 }}>
          <div
            style={{
              fontFamily: theme.mono,
              fontSize: 16,
              letterSpacing: 2.5,
              color: theme.faint,
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 22,
              opacity: interpolate(t, [8.3, 8.7], [0, 1], clamp),
            }}
          >
            implementations and frameworks
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 172px)", gap: 26, justifyContent: "center" }}>
            {IMPLEMENTATIONS.map((l, i) => (
              <ImplTile key={l.id} id={l.id} fallback={l.fallback} s={pop(frame, fps, 8.6 + i * 0.4)} />
            ))}
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-1b
// The sector map of spec/beyond-human-identity.md: nine sectors already
// using verifiable credentials in production beyond citizen identity.
const SECTOR_ICON: Record<string, React.ReactNode> = (() => {
  const st = { fill: "none", stroke: theme.violet, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return {
    agent: (
      <>
        <rect x="5" y="8" width="14" height="10" rx="2" {...st} />
        <path d="M12 4 v4 M9.5 12.5 h.01 M14.5 12.5 h.01 M9 15.5 h6" {...st} />
      </>
    ),
    badge: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" {...st} />
        <circle cx="8" cy="11" r="2" {...st} />
        <path d="M6 16 a2.5 2 0 0 1 4 0 M13 9 h5 M13 13 h5" {...st} />
      </>
    ),
    cap: (
      <>
        <path d="M12 4 L22 9 L12 14 L2 9 Z" {...st} />
        <path d="M6.5 11.5 v3.8 c0 1.6 11 1.6 11 0 v-3.8" {...st} />
      </>
    ),
    building: <path d="M4 21 V5.5 L13 3 v18 M13 9 l7 2 v10 M2.5 21 h19" {...st} />,
    cross: (
      <>
        <circle cx="12" cy="12" r="9" {...st} />
        <path d="M12 8 v8 M8 12 h8" {...st} />
      </>
    ),
    plane: <path d="M21.5 3.5 L2.5 10 L10.5 13.5 L14 21.5 Z M10.5 13.5 L21.5 3.5" {...st} />,
    chain: (
      <>
        <rect x="3" y="13" width="7" height="7" rx="1" {...st} />
        <rect x="14" y="13" width="7" height="7" rx="1" {...st} />
        <rect x="8.5" y="3" width="7" height="7" rx="1" {...st} />
        <path d="M10 13 l1 -3 M14 13 l-1 -3 M10 16.5 h4" {...st} />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 L20 6 v6 c0 4.8 -3.6 7.8 -8 9 c-4.4 -1.2 -8 -4.2 -8 -9 V6 Z" {...st} />
        <text x="12" y="14.6" textAnchor="middle" fontSize="7" fontWeight="700" fill={theme.violet} stroke="none">
          18+
        </text>
      </>
    ),
    camera: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" {...st} />
        <circle cx="12" cy="13.5" r="4" {...st} />
        <path d="M8.5 7 L10 4.5 h4 L15.5 7" {...st} />
      </>
    ),
  };
})();

const SECTORS = [
  { icon: "agent", title: "Agentic commerce", who: "Google AP2 · FIDO · Mastercard, Visa" },
  { icon: "badge", title: "Workforce", who: "Microsoft Entra · LinkedIn" },
  { icon: "cap", title: "Education", who: "Open Badges 3.0 · MIT DCC · EBSI" },
  { icon: "building", title: "Organizations", who: "GLEIF vLEI · eIDAS business wallets" },
  { icon: "cross", title: "Healthcare", who: "SMART Health Cards" },
  { icon: "plane", title: "Travel", who: "Digi Yatra · ICAO DTC · IATA One ID" },
  { icon: "chain", title: "Supply chain", who: "Catena-X · TradeTrust · GS1" },
  { icon: "shield", title: "Age assurance", who: "Google Wallet ZK · EU mini-wallet" },
  { icon: "camera", title: "Content authenticity", who: "C2PA · Adobe, Leica, TikTok" },
];

export const SectorsV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ribbon = pop(frame, fps, 10.2);
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      <SceneTitle kicker="in production today" title="Beyond human identity" />
      <div
        style={{
          position: "absolute",
          top: 230,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 430px)", gap: 30 }}>
          {SECTORS.map((sec, i) => {
            const s = pop(frame, fps, 1.6 + i * 0.85);
            return (
              <div
                key={sec.title}
                style={{
                  background: theme.card,
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 18,
                  boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: s,
                  transform: `scale(${s})`,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    width: 62,
                    height: 62,
                    borderRadius: 15,
                    background: "#f5f3ff",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width={34} height={34} viewBox="0 0 24 24" aria-hidden>
                    {SECTOR_ICON[sec.icon]}
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 25, fontWeight: 700, color: theme.ink }}>{sec.title}</div>
                  <div style={{ fontSize: 16.5, color: theme.muted, marginTop: 2 }}>{sec.who}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 800,
          display: "flex",
          justifyContent: "center",
          opacity: ribbon,
          transform: `translateY(${(1 - ribbon) * 24}px)`,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#6d28d9",
            background: "#f5f3ff",
            border: "1.5px solid #ddd6fe",
            borderRadius: 999,
            padding: "12px 34px",
          }}
        >
          all verifiable credentials · production, 2026
        </span>
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------ N-3 / N-4 / N-5 / N-6
const ChallengeChip: React.FC<{ n: number; label: string }> = ({ n, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 0.3);
  return (
    <div style={{ position: "absolute", top: 64, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <span
        style={{
          fontFamily: theme.mono,
          fontSize: 19,
          letterSpacing: 2,
          color: "#94a3b8",
          background: "rgba(11,18,32,0.9)",
          border: "1.5px solid #334155",
          borderRadius: 999,
          padding: "9px 24px",
          textTransform: "uppercase",
          opacity: s,
          transform: `scale(${s})`,
        }}
      >
        <span style={{ color: theme.amber, marginRight: 12 }}>challenge {n}</span>
        {label}
      </span>
    </div>
  );
};

// The reworked question arc: entity + controller identification (N-3),
// entities identifying themselves pairwise (N-4), and the v1 captures with a
// person / AI agent / service chip row (N-5, N-6).

const PartyIcon: React.FC<{ kind: "person" | "agent" | "service"; size?: number; color?: string }> = ({
  kind,
  size = 34,
  color = "#94a3b8",
}) => {
  const st = { fill: "none", stroke: color, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {kind === "person" ? (
        <>
          <circle cx="12" cy="8" r="4" {...st} />
          <path d="M5 21 a7 6 0 0 1 14 0" {...st} />
        </>
      ) : kind === "agent" ? (
        <>
          <rect x="5" y="8" width="14" height="10" rx="2" {...st} />
          <path d="M12 4 v4 M9.5 12.5 h.01 M14.5 12.5 h.01 M9 15.5 h6" {...st} />
        </>
      ) : (
        <>
          <rect x="3" y="4" width="18" height="14" rx="2" {...st} />
          <path d="M3 8 h18 M7 21 h10" {...st} />
        </>
      )}
    </svg>
  );
};

const NIGHT_CARD: React.CSSProperties = {
  background: "#0b1220",
  border: "1.5px solid #334155",
  borderRadius: 16,
  fontFamily: theme.font,
};

/** N-3: you, facing a service and an AI agent whose identities cycle; the
 *  dim controller card materializes behind both. */
export const IdentifyV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const cycle = Math.floor(t / 0.55);
  const flicker = 0.55 + 0.45 * Math.abs(Math.sin((t / 0.55) * Math.PI));
  const SERVICES = ["support-acme.com", "Aurora Bank", "quickpay.io"];
  const AGENTS = ["Nova Assistant", "agent-7f3", "ShopBot"];
  const ctrl = interpolate(t, [3.4, 4.0], [0, 1], clamp);
  const youIn = pop(frame, fps, 0.35);
  const rows = [
    { kind: "service" as const, label: SERVICES[cycle % 3], top: 250, at: 0.7 },
    { kind: "agent" as const, label: AGENTS[(cycle + 1) % 3], top: 520, at: 1.0 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {/* your gaze */}
        <line x1={540} y1={455} x2={930} y2={320} stroke="#334155" strokeWidth={2} strokeDasharray="7 7" opacity={pop(frame, fps, 0.9)} />
        <line x1={540} y1={505} x2={930} y2={590} stroke="#334155" strokeWidth={2} strokeDasharray="7 7" opacity={pop(frame, fps, 1.2)} />
        {/* toward the unknown controller */}
        <line x1={1420} y1={315} x2={1560} y2={430} stroke="#334155" strokeWidth={2} strokeDasharray="4 7" opacity={ctrl} />
        <line x1={1420} y1={585} x2={1560} y2={470} stroke="#334155" strokeWidth={2} strokeDasharray="4 7" opacity={ctrl} />
      </svg>
      {/* you */}
      <div style={{ position: "absolute", left: 360, top: 400, opacity: youIn, transform: `scale(${youIn})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ ...NIGHT_CARD, width: 130, height: 130, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PartyIcon kind="person" size={62} color="#cbd5e1" />
        </div>
        <span style={{ fontFamily: theme.font, fontSize: 20, color: "#94a3b8", fontWeight: 600 }}>you</span>
      </div>
      {/* the two entities, identities cycling */}
      {rows.map((r) => {
        const s = pop(frame, fps, r.at);
        return (
          <div key={r.kind} style={{ position: "absolute", left: 940, top: r.top, width: 470, opacity: s, transform: `scale(${s})` }}>
            <div style={{ ...NIGHT_CARD, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <PartyIcon kind={r.kind} size={44} color="#cbd5e1" />
              <div>
                <div style={{ fontSize: 16, color: "#64748b", fontFamily: theme.mono, textTransform: "uppercase", letterSpacing: 1.5 }}>
                  {r.kind === "service" ? "service" : "AI agent"}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: "#e2e8f0", opacity: flicker, fontFamily: theme.mono }}>
                  {r.label}
                </div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: 34, color: theme.amber, fontWeight: 800, opacity: flicker }}>?</span>
            </div>
          </div>
        );
      })}
      {/* the controller behind both */}
      <div style={{ position: "absolute", left: 1555, top: 385, width: 280, opacity: ctrl, transform: `translateX(${(1 - ctrl) * 30}px)` }}>
        <div style={{ ...NIGHT_CARD, borderStyle: "dashed", padding: "18px 22px", display: "flex", alignItems: "center", gap: 14 }}>
          <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
            <path d="M4 21 V5.5 L13 3 v18 M13 9 l7 2 v10 M2.5 21 h19" fill="none" stroke="#64748b" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#94a3b8" }}>controller?</div>
            <div style={{ fontSize: 15.5, color: "#64748b" }}>who is behind it</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** N-4: the party triangle, "who are you?" traveling each pairwise edge. */
export const SelfIdentifyV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const NODES = [
    { kind: "person" as const, label: "person", x: 560, y: 270, at: 0.4 },
    { kind: "agent" as const, label: "AI agent", x: 1360, y: 270, at: 0.6 },
    { kind: "service" as const, label: "service", x: 960, y: 660, at: 0.8 },
  ];
  const EDGES = [
    { a: 0, b: 1, at: 1.3 },
    { a: 1, b: 2, at: 2.5 },
    { a: 2, b: 0, at: 3.7 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {EDGES.map((e, i) => (
          <line
            key={i}
            x1={NODES[e.a].x}
            y1={NODES[e.a].y}
            x2={NODES[e.b].x}
            y2={NODES[e.b].y}
            stroke="#334155"
            strokeWidth={2}
            strokeDasharray="7 7"
            opacity={pop(frame, fps, e.at - 0.2)}
          />
        ))}
      </svg>
      {NODES.map((n) => {
        const s = pop(frame, fps, n.at);
        return (
          <div key={n.kind} style={{ position: "absolute", left: n.x - 65, top: n.y - 65, opacity: s, transform: `scale(${s})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ ...NIGHT_CARD, width: 130, height: 130, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PartyIcon kind={n.kind} size={60} color="#cbd5e1" />
            </div>
            <span style={{ fontFamily: theme.font, fontSize: 20, color: "#94a3b8", fontWeight: 600 }}>{n.label}</span>
          </div>
        );
      })}
      {/* the traveling question */}
      {EDGES.map((e, i) => {
        const p = interpolate((t - e.at) % 3.6, [0, 1.4], [0.12, 0.88], clamp);
        const alive = t >= e.at;
        const fade = alive ? Math.min(1, Math.max(0, Math.sin((((t - e.at) % 3.6) / 1.4) * Math.PI) * 1.6)) : 0;
        const x = NODES[e.a].x + (NODES[e.b].x - NODES[e.a].x) * p;
        const y = NODES[e.a].y + (NODES[e.b].y - NODES[e.a].y) * p;
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: x - 86,
              top: y - 22,
              fontFamily: theme.mono,
              fontSize: 19,
              color: theme.amber,
              background: "rgba(11,18,32,0.92)",
              border: "1.5px solid #475569",
              borderRadius: 999,
              padding: "6px 18px",
              opacity: fade,
            }}
          >
            who are you?
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

/** N-5 / N-6: the v1 capture scene plus the generalized-party chip row. */
export const QrScanPartiesV3: React.FC<{
  asset: string;
  qrLabel: string;
  caption?: string;
  phoneSide: "right" | "left";
  vertical: boolean;
}> = ({ asset, qrLabel, caption, phoneSide, vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 1.4);
  const side: React.CSSProperties = phoneSide === "right" ? { left: 90 } : { right: 90 };
  return (
    <AbsoluteFill>
      <QrScanToPhone asset={asset} qrLabel={qrLabel} caption={caption} phoneSide={phoneSide} vertical={vertical} />
      <div style={{ position: "absolute", top: 78, ...side, display: "flex", gap: 12, opacity: s, transform: `translateY(${(1 - s) * -14}px)` }}>
        {(["person", "agent", "service"] as const).map((k) => (
          <span
            key={k}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: theme.font,
              fontSize: 17,
              fontWeight: 600,
              color: "#cbd5e1",
              background: "rgba(11,18,32,0.88)",
              border: "1.5px solid #334155",
              borderRadius: 999,
              padding: "7px 16px",
            }}
          >
            <PartyIcon kind={k} size={22} />
            {k === "person" ? "person" : k === "agent" ? "AI agent" : "service"}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-2
export const SilosV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  // Isolated ecosystem islands on the night stage; then interconnections
  // draw between them, and new islands appear and join the mesh.
  const clusters = [
    { x: 360, y: 320, n: 5, delay: 0.5 },
    { x: 960, y: 240, n: 6, delay: 0.8 },
    { x: 1560, y: 330, n: 5, delay: 1.1 },
    { x: 620, y: 640, n: 6, delay: 1.4 },
    { x: 1330, y: 650, n: 5, delay: 1.7 },
    // the newcomers, appearing once the mesh starts to form
    { x: 180, y: 560, n: 4, delay: 4.8, fresh: true },
    { x: 1745, y: 585, n: 4, delay: 5.6, fresh: true },
    { x: 965, y: 505, n: 4, delay: 6.4, fresh: true },
  ];
  // Interconnections between island hubs (cross-border links).
  const links = [
    { a: 0, b: 1, at: 3.4 },
    { a: 1, b: 2, at: 3.8 },
    { a: 3, b: 4, at: 4.2 },
    { a: 0, b: 3, at: 4.5 },
    { a: 5, b: 0, at: 5.5 },
    { a: 6, b: 2, at: 6.3 },
    { a: 7, b: 1, at: 7.1 },
    { a: 7, b: 4, at: 7.5 },
    { a: 7, b: 3, at: 7.9 },
  ];
  const CHALLENGES = ["create", "cross-border", "mutual authentication", "discover"];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <div style={{ position: "absolute", top: 58, left: 0, right: 0, display: "flex", gap: 14, justifyContent: "center" }}>
        {CHALLENGES.map((c, i) => {
          const s = pop(frame, fps, 7.0 + i * 0.35);
          return (
            <span
              key={c}
              style={{
                fontFamily: theme.mono,
                fontSize: 17,
                letterSpacing: 1.5,
                color: "#94a3b8",
                background: "rgba(11,18,32,0.9)",
                border: "1.5px solid #334155",
                borderRadius: 999,
                padding: "8px 20px",
                textTransform: "uppercase",
                opacity: s,
                transform: `scale(${s})`,
              }}
            >
              <span style={{ color: theme.amber, marginRight: 10 }}>{i + 1}</span>
              {c}
            </span>
          );
        })}
      </div>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {links.map((l, i) => {
          const A = clusters[l.a];
          const B = clusters[l.b];
          const len = Math.hypot(B.x - A.x, B.y - A.y);
          const drawn = interpolate(t, [l.at, l.at + 0.8], [0, 1], clamp);
          return (
            <line
              key={i}
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={theme.indigo}
              strokeWidth={2.5}
              opacity={0.85 * drawn}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - drawn)}
            />
          );
        })}
      </svg>
      {clusters.map((c, ci) => {
        const s = pop(frame, fps, c.delay);
        const nodes = Array.from({ length: c.n }, (_, i) => {
          const a = (i / c.n) * Math.PI * 2;
          return { x: c.x + 95 * Math.cos(a), y: c.y + 62 * Math.sin(a) };
        });
        return (
          <div key={ci} style={{ position: "absolute", inset: 0, opacity: s }}>
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              <ellipse
                cx={c.x}
                cy={c.y}
                rx={150}
                ry={105}
                fill="none"
                stroke={c.fresh ? "#475569" : "#334155"}
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {nodes.map((n, i) => (
                <line
                  key={i}
                  x1={c.x}
                  y1={c.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="#1e293b"
                  strokeWidth="2"
                />
              ))}
            </svg>
            {[{ x: c.x, y: c.y, hub: true }, ...nodes].map((n, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: n.x - (i === 0 ? 17 : 11),
                  top: n.y - (i === 0 ? 17 : 11),
                  width: i === 0 ? 34 : 22,
                  height: i === 0 ? 34 : 22,
                  borderRadius: "50%",
                  background: i === 0 ? "#334155" : "#1f2937",
                  border: `2px solid ${i === 0 ? "#64748b" : "#475569"}`,
                }}
              />
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-3
/** Challenge 1, create: a new ecosystem island assembles in dashed,
 *  not-yet-real styling; capability chips snap on, then dashed links reach
 *  out toward discoverable / interconnectable / joinable. */
export const CreateEcoQV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const hubIn = pop(frame, fps, 0.9);
  const CHIPS = [
    { label: "trust registry", x: 665, y: 330, at: 1.8 },
    { label: "credential schemas", x: 1090, y: 330, at: 2.9 },
    { label: "accreditation lists", x: 640, y: 555, at: 4.0 },
    { label: "business model", x: 1105, y: 555, at: 5.1 },
  ];
  const OUT = [
    { label: "discoverable", tx: 300, ty: 210, at: 6.8 },
    { label: "interconnectable", tx: 1620, ty: 210, at: 7.9 },
    { label: "joinable", tx: 960, ty: 165, at: 9.0 },
  ];
  const HUB = { x: 960, y: 450 };
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <ChallengeChip n={1} label="create" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <ellipse cx={HUB.x} cy={HUB.y} rx={330} ry={200} fill="none" stroke="#475569" strokeWidth={2.5} strokeDasharray="8 8" opacity={hubIn} />
        {OUT.map((o, i) => {
          const drawn = interpolate(t, [o.at, o.at + 0.7], [0, 1], clamp);
          const len = Math.hypot(o.tx - HUB.x, o.ty - (HUB.y - 200));
          return (
            <line
              key={i}
              x1={HUB.x}
              y1={HUB.y - 200}
              x2={o.tx}
              y2={o.ty}
              stroke={theme.indigo}
              strokeWidth={2.5}
              strokeDasharray="9 9"
              opacity={0.8 * drawn}
              strokeDashoffset={len * (1 - drawn)}
            />
          );
        })}
      </svg>
      <div style={{ position: "absolute", left: HUB.x - 65, top: HUB.y - 65, opacity: hubIn, transform: `scale(${hubIn})` }}>
        <div style={{ ...NIGHT_CARD, width: 130, height: 130, borderRadius: "50%", borderStyle: "dashed", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 52, color: theme.amber, fontWeight: 800 }}>?</span>
        </div>
      </div>
      {CHIPS.map((c) => {
        const s = pop(frame, fps, c.at);
        return (
          <span
            key={c.label}
            style={{
              position: "absolute",
              left: c.x - 100,
              top: c.y,
              fontFamily: theme.mono,
              fontSize: 20,
              color: "#cbd5e1",
              background: "rgba(11,18,32,0.92)",
              border: "1.5px dashed #475569",
              borderRadius: 999,
              padding: "9px 22px",
              opacity: s,
              transform: `scale(${s})`,
            }}
          >
            {c.label}
          </span>
        );
      })}
      {OUT.map((o) => {
        const s = pop(frame, fps, o.at + 0.5);
        return (
          <span
            key={o.label}
            style={{
              position: "absolute",
              left: o.tx - 105,
              top: o.ty - 22,
              fontFamily: theme.mono,
              fontSize: 19,
              color: theme.amber,
              background: "rgba(11,18,32,0.92)",
              border: "1.5px solid #475569",
              borderRadius: 999,
              padding: "7px 20px",
              opacity: s,
              transform: `scale(${s})`,
            }}
          >
            {o.label}?
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-4
/** Challenge 2, cross-border: the established mesh on the left, new
 *  flag-tagged ecosystems on the right, arrows stopped at the border. */
export const CrossBorderQV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const borderIn = pop(frame, fps, 0.4);
  const island = (cx: number, cy: number, delay: number, dashed: boolean, flag?: string, tag?: string) => {
    const s = pop(frame, fps, delay);
    const nodes = Array.from({ length: 5 }, (_, i) => {
      const a = (i / 5) * Math.PI * 2;
      return { x: cx + 80 * Math.cos(a), y: cy + 52 * Math.sin(a) };
    });
    return (
      <div style={{ position: "absolute", inset: 0, opacity: s }}>
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <ellipse cx={cx} cy={cy} rx={125} ry={88} fill="none" stroke={dashed ? "#475569" : "#334155"} strokeWidth={2} strokeDasharray={dashed ? "6 6" : undefined} />
          {nodes.map((n, i) => (
            <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="#1e293b" strokeWidth={2} />
          ))}
        </svg>
        {[{ x: cx, y: cy }, ...nodes].map((n, i) => (
          <div key={i} style={{ position: "absolute", left: n.x - (i === 0 ? 15 : 9), top: n.y - (i === 0 ? 15 : 9), width: i === 0 ? 30 : 18, height: i === 0 ? 30 : 18, borderRadius: "50%", background: i === 0 ? "#334155" : "#1f2937", border: `2px solid ${i === 0 ? "#64748b" : "#475569"}` }} />
        ))}
        {flag ? (
          <span style={{ position: "absolute", left: cx - 27, top: cy - 145, fontSize: 30, background: "rgba(11,18,32,0.9)", border: "1.5px solid #475569", borderRadius: 12, padding: "4px 10px" }}>{flag}</span>
        ) : null}
        {tag ? (
          <span style={{ position: "absolute", left: cx - 62, top: cy + 100, fontFamily: theme.mono, fontSize: 16, color: "#94a3b8", background: "rgba(11,18,32,0.9)", border: "1.5px solid #475569", borderRadius: 999, padding: "5px 14px" }}>{tag}</span>
        ) : null}
      </div>
    );
  };
  const arrows = [
    { y: 300, at: 3.2 },
    { y: 480, at: 3.9 },
    { y: 645, at: 4.6 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <ChallengeChip n={2} label="cross-border" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={960} y1={150} x2={960} y2={790} stroke="#64748b" strokeWidth={3} strokeDasharray="12 10" opacity={borderIn} />
        {arrows.map((a, i) => {
          const drawn = interpolate(t, [a.at, a.at + 0.6], [0, 1], clamp);
          return (
            <g key={i} opacity={drawn}>
              <line x1={1210} y1={a.y} x2={1210 - 200 * drawn} y2={a.y} stroke={theme.indigo} strokeWidth={2.5} strokeDasharray="8 8" />
              <path d={`M ${1210 - 200 * drawn} ${a.y - 8} l -14 8 l 14 8 z`} fill={theme.indigo} />
            </g>
          );
        })}
        <line x1={400} y1={300} x2={650} y2={620} stroke={theme.indigo} strokeWidth={2.5} opacity={0.8 * interpolate(t, [1.2, 1.8], [0, 1], clamp)} />
      </svg>
      {island(400, 300, 0.6, false)}
      {island(650, 620, 0.9, false)}
      {island(1330, 300, 1.6, true, "🇯🇵")}
      {island(1650, 490, 2.0, true, "🇵🇪")}
      {island(1330, 645, 2.4, true, undefined, "any sector")}
      {arrows.map((a, i) => {
        const s = pop(frame, fps, a.at + 0.6);
        return (
          <span key={i} style={{ position: "absolute", left: 935, top: a.y - 26, fontSize: 30, color: theme.amber, fontWeight: 800, background: theme.night, padding: "0 6px", opacity: s, transform: `scale(${s})` }}>
            ?
          </span>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-5
/** Challenge 3, mutual authentication: a service + agent pair per country,
 *  pinging who are you? / can I trust you? across the divide. */
export const MutualAuthV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const node = (x: number, y: number, kind: "agent" | "service", delay: number) => {
    const s = pop(frame, fps, delay);
    return (
      <div style={{ position: "absolute", left: x - 60, top: y - 60, opacity: s, transform: `scale(${s})` }}>
        <div style={{ ...NIGHT_CARD, width: 120, height: 120, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PartyIcon kind={kind} size={54} color="#cbd5e1" />
        </div>
      </div>
    );
  };
  const ping = (x1: number, x2: number, y: number, label: string, at: number, period: number) => {
    const cycle = (t - at + period * 10) % period;
    const p = interpolate(cycle, [0, 1.6], [0.1, 0.9], clamp);
    const fade = t >= at ? Math.max(0, Math.sin((cycle / 1.6) * Math.PI)) : 0;
    const x = x1 + (x2 - x1) * p;
    return (
      <span
        style={{
          position: "absolute",
          left: x - 92,
          top: y - 21,
          fontFamily: theme.mono,
          fontSize: 19,
          color: theme.amber,
          background: "rgba(11,18,32,0.94)",
          border: "1.5px solid #475569",
          borderRadius: 999,
          padding: "6px 18px",
          opacity: fade,
        }}
      >
        {label}
      </span>
    );
  };
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <ChallengeChip n={3} label="mutual authentication" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={560} y1={350} x2={1360} y2={350} stroke="#334155" strokeWidth={2} strokeDasharray="7 7" opacity={pop(frame, fps, 1.1)} />
        <line x1={560} y1={620} x2={1360} y2={620} stroke="#334155" strokeWidth={2} strokeDasharray="7 7" opacity={pop(frame, fps, 1.3)} />
      </svg>
      <span style={{ position: "absolute", left: 385, top: 210, fontSize: 34, background: "rgba(11,18,32,0.9)", border: "1.5px solid #475569", borderRadius: 12, padding: "5px 12px", opacity: pop(frame, fps, 0.4) }}>🇫🇷</span>
      {node(450, 350, "service", 0.5)}
      {node(450, 620, "agent", 0.7)}
      <span style={{ position: "absolute", left: 1455, top: 210, fontSize: 34, background: "rgba(11,18,32,0.9)", border: "1.5px solid #475569", borderRadius: 12, padding: "5px 12px", opacity: pop(frame, fps, 0.6) }}>🇯🇵</span>
      {node(1470, 350, "service", 0.8)}
      {node(1470, 620, "agent", 1.0)}
      {ping(560, 1360, 350, "who are you?", 1.6, 3.4)}
      {ping(1360, 560, 620, "can I trust you?", 3.3, 3.4)}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-7
export const EcosystemSearchV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const lensIn = pop(frame, fps, 0.3);
  const pairIn = pop(frame, fps, 0.6);
  const nodes = [
    { x: 620, y: 250, delay: 0.7 },
    { x: 1320, y: 230, found: true, delay: 0.9 },
    { x: 520, y: 560, found: true, delay: 1.1 },
    { x: 1440, y: 560, delay: 1.3 },
    { x: 1100, y: 720, delay: 1.5 },
  ];
  const st = { fill: "none", stroke: "#e2e8f0", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <ChallengeChip n={4} label="discover" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={960}
            y1={430}
            x2={n.x}
            y2={n.y}
            stroke="#1e293b"
            strokeWidth="2.5"
            opacity={interpolate(t, [n.delay, n.delay + 0.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        ))}
      </svg>
      {nodes.map((n, i) => {
        const s2 = pop(frame, fps, n.delay);
        return (
          <div key={i} style={{ position: "absolute", left: n.x - 26, top: n.y - 26, transform: `scale(${s2})` }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                background: "#1f2937",
                border: `2.5px solid ${n.found ? "#10b981" : "#475569"}`,
              }}
            />
            {n.found ? (
              <div style={{ position: "absolute", right: -7, top: -7, transform: `scale(${pop(frame, fps, n.delay + 0.5)})` }}>
                <svg width={26} height={26} viewBox="0 0 20 20" aria-hidden>
                  <circle cx="10" cy="10" r="10" fill={theme.green} />
                  <path d="M5.5 10.5 L8.5 13.5 L14.5 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : null}
          </div>
        );
      })}
      {/* the searchers: a person and their AI agent, side by side */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 720,
          display: "flex",
          gap: 20,
          alignItems: "center",
          opacity: pairIn,
          transform: `scale(${pairIn})`,
        }}
      >
        {(["user", "bot"] as const).map((k) => (
          <div
            key={k}
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              background: "#111827",
              border: "2.5px solid #64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={44} height={44} viewBox="0 0 24 24" aria-hidden>
              {k === "user" ? (
                <>
                  <circle cx="12" cy="8" r="4" {...st} />
                  <path d="M5 21 a7 6 0 0 1 14 0" {...st} />
                </>
              ) : (
                <>
                  <path d="M12 8V4H8" {...st} />
                  <rect x="4" y="8" width="16" height="12" rx="2" {...st} />
                  <path d="M2 14h2 M20 14h2 M15 13v2 M9 13v2" {...st} />
                </>
              )}
            </svg>
          </div>
        ))}
        <svg width={90} height={24} viewBox="0 0 90 24" aria-hidden>
          <path d="M2 12 H78 M78 12 l-10 -8 M78 12 l-10 8" stroke="#64748b" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* pulse rings + lens */}
      {[0, 0.8].map((d) => {
        const cycle = ((t - 0.9 - d) % 1.6 + 1.6) % 1.6;
        const on = t > 0.9 + d ? 1 : 0;
        return (
          <svg key={d} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <circle
              cx={960}
              cy={430}
              r={90 + cycle * 150}
              fill="none"
              stroke={theme.violet}
              strokeWidth="3"
              opacity={on * Math.max(0, 0.5 - (cycle / 1.6) * 0.5)}
            />
          </svg>
        );
      })}
      <div style={{ position: "absolute", left: 960 - 80, top: 430 - 80, transform: `scale(${lensIn})` }}>
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            background: theme.gradient,
            boxShadow: "0 24px 70px rgba(118,62,240,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={80} height={80} viewBox="0 0 24 24" aria-hidden>
            <circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="#fff" strokeWidth="2.2" />
            <path d="M15.2 15.2 L20.5 20.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-8a
const LIST_ICON = {
  stars: null, // rendered via StarsSeal
  doc: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <path d="M6 2 h9 l5 5 v15 a1 1 0 0 1 -1 1 H6 a1 1 0 0 1 -1 -1 V3 a1 1 0 0 1 1 -1 z" fill="none" stroke="#b45309" strokeWidth="1.8" />
      <path d="M15 2 v5 h5 M8.5 13 l2.5 2.5 L15.5 10" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  globe: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#047857" strokeWidth="1.8" />
      <path d="M3 12 h18 M12 3 a14 14 0 0 1 0 18 M12 3 a14 14 0 0 0 0 18" fill="none" stroke="#047857" strokeWidth="1.6" />
    </svg>
  ),
  lei: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 21 V5.5 L13 3 v18 M13 9 l7 2 v10 M2.5 21 h19" fill="none" stroke="#0369a1" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M7 8.5 h2.5 M7 12 h2.5 M7 15.5 h2.5 M15.5 13.5 h2 M15.5 16.5 h2" stroke="#0369a1" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  passport: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="2.5" width="14" height="19" rx="2" fill="none" stroke="#6d28d9" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="3.2" fill="none" stroke="#6d28d9" strokeWidth="1.7" />
      <path d="M8.5 16.5 h7" stroke="#6d28d9" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

export const TrustListsV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lists = [
    { icon: "stars" as const, name: "EU Trusted Lists", sub: "eIDAS · European Commission", at: 0.5 },
    { icon: "doc" as const, name: "Adobe AATL", sub: "document signing", at: 0.8 },
    { icon: "globe" as const, name: "Root programs", sub: "Microsoft · Apple · Mozilla", at: 1.1 },
    { icon: "passport" as const, name: "ICAO PKD", sub: "ePassports", at: 1.4 },
    { icon: "lei" as const, name: "GLEIF", sub: "LEI · vLEI issuers", at: 1.7 },
  ];
  const gapIn = pop(frame, fps, 7.5);
  const clusters = [
    { x: 430, y: 0 }, { x: 750, y: 40 }, { x: 1080, y: 10 }, { x: 1400, y: 45 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center" }}>
      {/* the official layer */}
      <div style={{ position: "absolute", top: 170, display: "flex", gap: 22 }}>
        {lists.map((l) => {
          const s = pop(frame, fps, l.at);
          return (
            <div
              key={l.name}
              style={{
                width: 342,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 18,
                padding: "20px 20px",
                boxShadow: "0 14px 40px rgba(15,23,42,0.09)",
                opacity: s,
                transform: `translateY(${(1 - s) * 40}px)`,
                fontFamily: theme.font,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {l.icon === "stars" ? <StarsSeal size={44} /> : LIST_ICON[l.icon]}
                <div>
                  <div style={{ fontSize: 21, fontWeight: 700, color: theme.ink }}>{l.name}</div>
                  <div style={{ fontSize: 15.5, color: theme.muted }}>{l.sub}</div>
                </div>
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  fontFamily: theme.mono,
                  fontSize: 14,
                  letterSpacing: 2,
                  color: "#1d4ed8",
                  background: "#eff6ff",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: 999,
                  padding: "4px 12px",
                }}
              >
                OFFICIAL
              </span>
            </div>
          );
        })}
      </div>
      {/* the boundary of the official scope */}
      <svg width="1700" height="4" style={{ position: "absolute", top: 430 }} aria-hidden>
        <line x1="0" y1="2" x2="1700" y2="2" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="12 10" opacity={gapIn} />
      </svg>
      {/* below the line: the private world, uncovered */}
      <div style={{ position: "absolute", top: 470, width: 1700, opacity: gapIn }}>
        {clusters.map((c2, ci) => (
          <svg key={ci} width={210} height={140} style={{ position: "absolute", left: c2.x - 105, top: c2.y }} aria-hidden>
            <ellipse cx={105} cy={70} rx={95} ry={60} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
            {Array.from({ length: 5 }, (_, i) => {
              const a = (i / 5) * Math.PI * 2;
              return <circle key={i} cx={105 + 55 * Math.cos(a)} cy={70 + 34 * Math.sin(a)} r={9} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.6" />;
            })}
          </svg>
        ))}
        <div
          style={{
            position: "absolute",
            top: 160,
            width: "100%",
            textAlign: "center",
            fontFamily: theme.mono,
            fontSize: 19,
            letterSpacing: 2,
            color: theme.muted,
          }}
        >
          private ecosystems · not covered
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-9
const FreedomPanel: React.FC<{
  index: number;
  title: string;
  subtitle: string;
  appearAt: number;
  children: React.ReactNode;
}> = ({ index, title, subtitle, appearAt, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, appearAt);
  return (
    <div
      style={{
        width: 530,
        opacity: s,
        transform: `translateY(${(1 - s) * 70}px)`,
        fontFamily: theme.font,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            background: theme.gradient,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.display,
            fontWeight: 700,
            fontSize: 26,
            boxShadow: "0 8px 20px rgba(118,62,240,0.35)",
          }}
        >
          {index}
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: theme.display, fontSize: 34, fontWeight: 700, color: theme.ink }}>
            {title}
          </div>
          <div style={{ fontSize: 21, color: theme.muted }}>{subtitle}</div>
        </div>
      </div>
      <div
        style={{
          background: theme.card,
          borderRadius: 20,
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
          padding: 26,
          height: 430,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const EcoCard: React.FC<{ width?: number; fontScale?: number }> = ({ width = 780, fontScale = 1.35 }) => (
  <div
    style={{
      width,
      background: theme.card,
      border: "1.5px solid #e2e8f0",
      borderRadius: 20,
      boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
      padding: "30px 34px",
      fontFamily: theme.font,
    }}
  >
    <div style={{ fontSize: 24 * fontScale, fontWeight: 700, color: theme.ink, marginBottom: 16 }}>
      Your Ecosystem
    </div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
      <Chip>your governance framework</Chip>
      <Chip>your credential schemas</Chip>
    </div>
    {["Accredited issuers", "Accredited verifiers"].map((r) => (
      <div
        key={r}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1.5px solid #e2e8f0",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 10,
          fontSize: 19 * fontScale,
          color: "#475569",
        }}
      >
        <svg width={22} height={22} viewBox="0 0 20 20" aria-hidden>
          <circle cx="10" cy="10" r="10" fill={theme.green} />
          <path d="M5.5 10.5 L8.5 13.5 L14.5 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {r}
      </div>
    ))}
    <div style={{ fontFamily: theme.mono, fontSize: 15 * fontScale, color: theme.violet }}>
      your rules · your business model
    </div>
  </div>
);

/** N-9a: for ecosystem builders, the governance card alone, center stage. */
/** N-9a rebuilt from verana.io/ecosystems, simplified: the root card anchors
 *  on the registry and publishes its artifacts (left), the participant tree
 *  grows tier by tier (right), then the lens finds it: discoverable. */
const TreeCard: React.FC<{ title: string; sub?: string; s: number; width?: number; accent?: boolean }> = ({
  title,
  sub,
  s,
  width = 230,
  accent,
}) => (
  <div
    style={{
      width,
      background: accent ? "#f5f3ff" : theme.card,
      border: `2px solid ${accent ? theme.violet : "#ddd6fe"}`,
      borderRadius: 14,
      boxShadow: "0 10px 26px rgba(15,23,42,0.10)",
      padding: "12px 10px",
      textAlign: "center",
      fontFamily: theme.font,
      opacity: s,
      transform: `scale(${s})`,
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 700, color: theme.ink }}>{title}</div>
    {sub ? <div style={{ fontSize: 14.5, color: theme.muted, marginTop: 2 }}>{sub}</div> : null}
  </div>
);

export const BuildEcoTreeV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const draw = (d: number) => interpolate(t, [d, d + 0.5], [0, 1], clamp);
  const rootIn = pop(frame, fps, 0.5);
  const anchorIn = pop(frame, fps, 1.3);
  const ARTIFACTS = [
    { label: "governance framework", at: 2.7 },
    { label: "credential schemas", at: 3.5 },
    { label: "business model", at: 4.3 },
  ];
  const ringIn = interpolate(t, [9.8, 10.5], [0, 1], clamp);
  const lensIn = pop(frame, fps, 10.2);
  const badgeIn = pop(frame, fps, 11.0);
  // The tree column.
  const TX = 1310;
  const tier = (y: number) => y;
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      <SceneTitle kicker="for ecosystem builders" title="Build your ecosystem" />
      {/* ---- left: the root card, its anchor, its artifacts ---- */}
      <div style={{ position: "absolute", left: 480 - 190, top: 200, width: 380, opacity: rootIn, transform: `scale(${rootIn})` }}>
        <div
          style={{
            background: "#f5f3ff",
            border: `2.5px solid ${theme.violet}`,
            borderRadius: 18,
            boxShadow: "0 14px 36px rgba(15,23,42,0.12)",
            padding: "20px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontFamily: theme.mono, fontSize: 14, letterSpacing: 2, color: theme.violet }}>T0 · ROOT</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: theme.ink, marginTop: 4 }}>Your Ecosystem</div>
        </div>
      </div>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={480} y1={318} x2={480} y2={368} stroke={theme.violet} strokeWidth={2.5} strokeDasharray="6 6" opacity={anchorIn} />
        {ARTIFACTS.map((a, i) => (
          <line key={a.label} x1={480} y1={438} x2={480} y2={438 + 36 + i * 78 - 36} stroke="#ddd6fe" strokeWidth={0} />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 480 - 260, top: 372, width: 520, textAlign: "center", whiteSpace: "nowrap", opacity: anchorIn, transform: `translateY(${(1 - anchorIn) * -10}px)` }}>
        <span
          style={{
            fontFamily: theme.mono,
            fontSize: 15,
            letterSpacing: 1,
            color: "#1d4ed8",
            background: "#eff6ff",
            border: "1.5px solid #bfdbfe",
            borderRadius: 999,
            padding: "8px 18px",
          }}
        >
          anchored on the Verifiable Public Registry
        </span>
      </div>
      <div style={{ position: "absolute", left: 480 - 165, top: 452, width: 330, display: "flex", flexDirection: "column", gap: 16 }}>
        {ARTIFACTS.map((a) => {
          const s = pop(frame, fps, a.at);
          return (
            <span
              key={a.label}
              style={{
                fontFamily: theme.mono,
                fontSize: 19,
                color: "#6d28d9",
                background: "#f5f3ff",
                border: "1.5px solid #ddd6fe",
                borderRadius: 999,
                padding: "11px 20px",
                textAlign: "center",
                opacity: s,
                transform: `scale(${s})`,
              }}
            >
              {a.label}
            </span>
          );
        })}
      </div>
      {/* published tick: each artifact hangs off the root */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {ARTIFACTS.map((a, i) => (
          <line
            key={a.label}
            x1={480}
            y1={412}
            x2={480}
            y2={452 + i * 78 + 24}
            stroke="#ddd6fe"
            strokeWidth={2}
            opacity={0.0}
          />
        ))}
      </svg>

      {/* ---- onboarding edge from the root card into the tree ---- */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={672} y1={258} x2={TX - 122} y2={258} stroke={theme.violet} strokeWidth={2.5} strokeDasharray="7 7" opacity={draw(5.6)} />
        {/* accredits: root -> grantors */}
        <line x1={TX} y1={300} x2={TX - 180} y2={396} stroke={theme.violet} strokeWidth={2.5} opacity={draw(6.4)} />
        <line x1={TX} y1={300} x2={TX + 180} y2={396} stroke={theme.violet} strokeWidth={2.5} opacity={draw(6.4)} />
        {/* grantors -> issuers/verifiers */}
        <line x1={TX - 180} y1={470} x2={TX - 180} y2={532} stroke={theme.violet} strokeWidth={2.5} opacity={draw(7.2)} />
        <line x1={TX + 180} y1={470} x2={TX + 180} y2={532} stroke={theme.violet} strokeWidth={2.5} opacity={draw(7.2)} />
        {/* issuers issue to / verifiers verify holders */}
        <line x1={TX - 180} y1={606} x2={TX - 40} y2={688} stroke="#a78bfa" strokeWidth={2.5} strokeDasharray="6 6" opacity={draw(8.0)} />
        <line x1={TX + 180} y1={606} x2={TX + 40} y2={688} stroke="#a78bfa" strokeWidth={2.5} strokeDasharray="6 6" opacity={draw(8.0)} />
        {/* the discoverable ring */}
        <ellipse cx={TX} cy={505} rx={350} ry={320} fill="none" stroke={theme.green} strokeWidth={3} strokeDasharray="10 8" opacity={ringIn} />
      </svg>
      {/* tier labels */}
      {[
        { label: "T1 · GRANTORS", y: 415, at: 6.4 },
        { label: "T2 · ISSUERS + VERIFIERS", y: 552, at: 7.2 },
        { label: "T3 · HOLDERS", y: 700, at: 8.0 },
      ].map((l) => (
        <span
          key={l.label}
          style={{
            position: "absolute",
            left: 742,
            top: tier(l.y),
            fontFamily: theme.mono,
            fontSize: 13,
            letterSpacing: 1.5,
            color: theme.faint,
            opacity: interpolate(t, [l.at, l.at + 0.4], [0, 1], clamp),
          }}
        >
          {l.label}
        </span>
      ))}
      {/* tree nodes */}
      <div style={{ position: "absolute", left: TX - 120, top: 222 }}>
        <TreeCard title="Ecosystem" sub="root of trust" s={pop(frame, fps, 5.9)} width={240} accent />
      </div>
      <div style={{ position: "absolute", left: TX - 180 - 110, top: 398 }}>
        <TreeCard title="Issuer Grantor" sub="accredits issuers" s={pop(frame, fps, 6.6)} width={220} />
      </div>
      <div style={{ position: "absolute", left: TX + 180 - 110, top: 398 }}>
        <TreeCard title="Verifier Grantor" sub="accredits verifiers" s={pop(frame, fps, 6.7)} width={220} />
      </div>
      <div style={{ position: "absolute", left: TX - 180 - 110, top: 535 }}>
        <TreeCard title="Issuers" sub="issue credentials" s={pop(frame, fps, 7.4)} width={220} />
      </div>
      <div style={{ position: "absolute", left: TX + 180 - 110, top: 535 }}>
        <TreeCard title="Verifiers" sub="request proofs" s={pop(frame, fps, 7.5)} width={220} />
      </div>
      {/* holders: person · service · AI agent */}
      <div style={{ position: "absolute", left: TX - 132, top: 690, display: "flex", gap: 24 }}>
        {(["person", "service", "agent"] as const).map((k, i) => {
          const s = pop(frame, fps, 8.2 + i * 0.15);
          return (
            <div
              key={k}
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: theme.card,
                border: "2px solid #ddd6fe",
                boxShadow: "0 8px 20px rgba(15,23,42,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: s,
                transform: `scale(${s})`,
              }}
            >
              <PartyIcon kind={k} size={36} color={theme.violet} />
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: TX - 190, top: 772, width: 380, textAlign: "center", fontSize: 15.5, color: theme.muted, fontWeight: 600, opacity: interpolate(t, [8.6, 9.0], [0, 1], clamp) }}>
        holders · human · service · AI agent
      </div>
      {/* ---- beat 4: found by the lens ---- */}
      <div style={{ position: "absolute", left: TX + 255, top: 132, opacity: lensIn, transform: `scale(${lensIn}) rotate(-12deg)` }}>
        <svg width={74} height={74} viewBox="0 0 24 24" aria-hidden>
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke={theme.green} strokeWidth={2.2} />
          <path d="M15.5 15.5 L21 21" stroke={theme.green} strokeWidth={2.6} strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: TX - 105, top: 128, opacity: badgeIn, transform: `scale(${badgeIn})` }}>
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: theme.greenDark,
            background: "#ecfdf5",
            border: `2px solid ${theme.green}`,
            borderRadius: 999,
            padding: "9px 26px",
          }}
        >
          discoverable
        </span>
      </div>
    </AbsoluteFill>
  );
};

export const BuildEcoV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 0.4);
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center" }}>
      <div style={{ position: "absolute", top: 170, opacity: s, transform: `translateY(${(1 - s) * 50}px)` }}>
        <EcoCard />
      </div>
    </AbsoluteFill>
  );
};

/** N-9b: for service builders: Join · Choose · Bridge. */
export const ServiceV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wallets = ["inji", "eudi", "paradym", "bcwallet", "hologram", "talao"];
  const link = interpolate(frame, [fps * 2.6, fps * 3.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: theme.surface,
        flexDirection: "row",
        gap: 48,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FreedomPanel index={1} title="Join" subtitle="ecosystems, on Verana or other trust lists" appearAt={0.4}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
          {[
            { icon: <VeranaMark size={44} />, name: "Ecosystems on Verana", sub: "sovereign trust registries" },
            {
              icon: (
                <svg width={44} height={44} viewBox="0 0 24 24" aria-hidden>
                  <path d="M4 5.5 h16 M4 10 h16 M4 14.5 h16 M4 19 h10" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              ),
              name: "Other trust lists",
              sub: "official and industry lists",
            },
          ].map((e) => (
            <div
              key={e.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: "1.5px solid #e2e8f0",
                borderRadius: 16,
                padding: "18px 20px",
                fontFamily: theme.font,
              }}
            >
              <span style={{ display: "inline-flex", width: 56, height: 56, borderRadius: 14, background: "#f8fafc", alignItems: "center", justifyContent: "center" }}>
                {e.icon}
              </span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: theme.ink }}>{e.name}</div>
                <div style={{ fontSize: 17, color: theme.muted }}>{e.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </FreedomPanel>

      <FreedomPanel index={2} title="Choose" subtitle="your personal wallet · privacy preserved" appearAt={1.1}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", maxWidth: 420 }}>
          {wallets.map((id, i) => (
            <div key={id} style={{ transform: `scale(${pop(frame, fps, 1.6 + i * 0.12)})` }}>
              <WalletTile id={id} />
            </div>
          ))}
        </div>
      </FreedomPanel>

      <FreedomPanel index={3} title="Bridge" subtitle="to other ecosystems" appearAt={1.8}>
        <div style={{ position: "relative", width: 460, height: 300 }}>
          <svg width={460} height={300} style={{ position: "absolute", inset: 0 }}>
            {[{ cx: 95, cy: 110 }, { cx: 365, cy: 190 }].map((c2, ci) => (
              <g key={ci}>
                <ellipse cx={c2.cx} cy={c2.cy} rx={88} ry={64} fill="none" stroke="#ddd6fe" strokeWidth="2.5" />
                {Array.from({ length: 4 }, (_, i) => {
                  const a = (i / 4) * Math.PI * 2 + 0.5;
                  return (
                    <circle
                      key={i}
                      cx={c2.cx + 52 * Math.cos(a)}
                      cy={c2.cy + 36 * Math.sin(a)}
                      r={11}
                      fill="#f5f3ff"
                      stroke={theme.violet}
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            ))}
            <path
              d="M 168 135 C 220 150, 250 155, 292 172"
              stroke={theme.violet}
              strokeWidth="4"
              fill="none"
              strokeDasharray={1}
              strokeDashoffset={1 - link}
              pathLength={1}
            />
          </svg>
          <div style={{ position: "absolute", left: 230 - 26, top: 152 - 26, transform: `scale(${pop(frame, fps, 3.2)})` }}>
            <VeranaMark size={52} />
          </div>
        </div>
      </FreedomPanel>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-10
export const VeranaCloseV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const lockIn = pop(frame, fps, 0.3);
  const urlIn = interpolate(frame, [fps * 1.2, fps * 1.7], [0, 1], clamp);
  const lineIn = interpolate(frame, [fps * 1.8, fps * 2.3], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: "translateY(-40px)" }}>
        <div style={{ opacity: lockIn, transform: `scale(${0.9 + 0.1 * lockIn})` }}>
          <VeranaIoLogo size={130} />
        </div>
        <div
          style={{
            marginTop: 54,
            fontFamily: theme.mono,
            fontSize: 42,
            color: theme.muted,
            letterSpacing: 1,
            opacity: urlIn,
            transform: `translateY(${(1 - urlIn) * 24}px)`,
          }}
        >
          https://verana.io
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: theme.font,
            fontSize: 38,
            fontWeight: 700,
            color: theme.ink,
            textAlign: "center",
            maxWidth: 1200,
            lineHeight: 1.35,
            opacity: lineIn,
            transform: `translateY(${(1 - lineIn) * 24}px)`,
          }}
        >
          Build and join sovereign ecosystems on an open, public infrastructure, owned by no
          one.
        </div>
      </div>
    </AbsoluteFill>
  );
};
