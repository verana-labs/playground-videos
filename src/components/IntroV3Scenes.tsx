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
import QRCode from "qrcode";
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

/** The one scene-title grammar, both stages: mono kicker over a bold
 *  headline. `accent` renders the kicker in amber (the challenge scenes). */
const SceneTitle: React.FC<{ kicker: string; title: string; tone?: "light" | "dark"; accent?: boolean }> = ({
  kicker,
  title,
  tone = "light",
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 0.15);
  const dark = tone === "dark";
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
      <div
        style={{
          fontFamily: theme.mono,
          fontSize: 17,
          letterSpacing: 3,
          color: accent ? theme.amber : dark ? "#64748b" : theme.faint,
          textTransform: "uppercase",
        }}
      >
        {kicker}
      </div>
      <div style={{ fontSize: 46, fontWeight: 800, color: dark ? "#e2e8f0" : theme.ink, marginTop: 2 }}>{title}</div>
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
  // Animated edge draw for the trust triangle; the arrowhead only lands
  // once its line is nearly there.
  const drawP = (d: number) => interpolate(t, [d, d + 0.7], [0, 1], clamp);
  const draw = (p: number, len: number) => ({
    strokeDasharray: len,
    strokeDashoffset: len * (1 - p),
  });
  const p1 = drawP(2.3);
  const p2 = drawP(2.9);
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
          transform: `translateX(calc(-50% + ${-shift * 470}px)) translateY(${shift * 40}px) scale(${1 - shift * 0.26})`,
          transformOrigin: "top center",
        }}
      >
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 16,
            letterSpacing: 2.5,
            color: theme.faint,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 20,
            opacity: interpolate(t, [0.3, 0.7], [0, 1], clamp),
          }}
        >
          standards and specifications
        </div>
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
        <div style={{ position: "relative", width: 1040, height: 470, margin: "34px auto 0" }}>
          <svg
            width={1040}
            height={470}
            viewBox="0 0 1040 470"
            style={{ position: "absolute", inset: 0 }}
            aria-hidden
          >
            <defs>
              <marker id="tri-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 z" fill={theme.violet} />
              </marker>
            </defs>
            {/* issues: Issuer -> Holder */}
            <line x1={215} y1={112} x2={455} y2={344} stroke={theme.violet} strokeWidth={3} markerEnd={p1 > 0.82 ? "url(#tri-arrow)" : undefined} {...draw(p1, 330)} />
            {/* presents: Holder -> Verifier */}
            <line x1={585} y1={344} x2={825} y2={112} stroke={theme.violet} strokeWidth={3} markerEnd={p2 > 0.82 ? "url(#tri-arrow)" : undefined} {...draw(p2, 330)} />
            {/* trusts?: Verifier -> Issuer, the edge Verana serves */}
            <line x1={790} y1={62} x2={250} y2={62} stroke={theme.faint} strokeWidth={3} strokeDasharray="10 8" markerEnd={t > 3.9 ? "url(#tri-arrow)" : undefined} opacity={interpolate(t, [3.5, 4.0], [0, 1], clamp)} />
          </svg>
          <div style={{ position: "absolute", left: 65, top: 32 }}>
            <TriangleNode label="Issuer" s={pop(frame, fps, 1.7)} />
          </div>
          <div style={{ position: "absolute", left: 765, top: 32 }}>
            <TriangleNode label="Verifier" s={pop(frame, fps, 2.1)} />
          </div>
          <div style={{ position: "absolute", left: 415, top: 330 }}>
            <TriangleNode label="Holder" s={pop(frame, fps, 1.9)} />
          </div>
          <div style={{ ...edgeLabel, left: 240, top: 215, opacity: interpolate(t, [2.6, 2.9], [0, 1], clamp) }}>issues</div>
          <div style={{ ...edgeLabel, left: 690, top: 215, opacity: interpolate(t, [3.2, 3.5], [0, 1], clamp) }}>presents</div>
          <div style={{ ...edgeLabel, left: 468, top: 20, color: theme.muted, background: "#f8fafc", border: "1.5px solid #e2e8f0", opacity: interpolate(t, [3.7, 4.0], [0, 1], clamp) }}>trusts?</div>
          {/* credential formats + transport protocols, snapping on below */}
          {[
            { label: "formats", items: ["SD-JWT", "AnonCreds", "JSON-LD", "vLEI", "mdoc"], top: 414, at: 3.3 },
            { label: "protocols", items: ["OpenID4VC", "DIDComm", "Linked-VP", "KERI", "ISO 18013-7"], top: 462, at: 3.9 },
          ].map((row) => (
            <div key={row.label} style={{ position: "absolute", left: 0, right: 0, top: row.top, display: "flex", gap: 10, justifyContent: "center", alignItems: "center" }}>
              <span style={{ fontFamily: theme.mono, fontSize: 14, letterSpacing: 1.5, color: theme.faint, textTransform: "uppercase", marginRight: 2, width: 104, textAlign: "right", opacity: interpolate(t, [row.at - 0.1, row.at + 0.2], [0, 1], clamp) }}>
                {row.label}
              </span>
              {row.items.map((c, i) => (
                <span
                  key={c}
                  style={{
                    fontFamily: theme.mono,
                    fontSize: 18,
                    color: "#1d4ed8",
                    background: "#eff6ff",
                    border: "1.5px solid #bfdbfe",
                    borderRadius: 999,
                    padding: "4px 14px",
                    transform: `scale(${pop(frame, fps, row.at + i * 0.15)})`,
                  }}
                >
                  {c}
                </span>
              ))}
              <span style={{ width: 104 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ---- beat B: implementations and frameworks, logos only ---- */}
      {t >= 8.0 ? (
        <div style={{ position: "absolute", left: 1106, top: 232, width: 568 }}>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 178px)", gap: 22, justifyContent: "center" }}>
            {IMPLEMENTATIONS.map((l, i) => (
              <LogoTile key={l.id} id={l.id} label={l.fallback} size={178} s={pop(frame, fps, 8.6 + i * 0.4)} />
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
    { x: 360, y: 430, n: 5, delay: 0.5 },
    { x: 960, y: 350, n: 6, delay: 0.8 },
    { x: 1560, y: 440, n: 5, delay: 1.1 },
    { x: 620, y: 750, n: 6, delay: 1.4 },
    { x: 1330, y: 760, n: 5, delay: 1.7 },
    // the newcomers, appearing once the mesh starts to form
    { x: 180, y: 670, n: 4, delay: 4.8, fresh: true },
    { x: 1745, y: 695, n: 4, delay: 5.6, fresh: true },
    { x: 965, y: 615, n: 4, delay: 6.4, fresh: true },
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
  // Each badge lands as the narration names its challenge.
  const CHALLENGES = [
    { n: 1, label: "create and monetize", at: 3.9 },
    { n: 2, label: "cross-border", at: 9.2 },
    { n: 3, label: "mutual authentication", at: 12.2 },
    { n: 4, label: "discovery", at: 15.2 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <SceneTitle tone="dark" kicker="the next step" title="Interconnect ecosystems: the challenges" />
      <div style={{ position: "absolute", top: 912, left: 0, right: 0, display: "flex", gap: 20, justifyContent: "center" }}>
        {CHALLENGES.map((c) => {
          const s = pop(frame, fps, c.at);
          return (
            <span
              key={c.n}
              style={{
                fontFamily: theme.mono,
                fontSize: 25,
                letterSpacing: 1.5,
                color: "#e2e8f0",
                background: "rgba(11,18,32,0.95)",
                border: "2px solid #475569",
                borderRadius: 999,
                padding: "13px 30px",
                textTransform: "uppercase",
                boxShadow: "0 12px 34px rgba(0,0,0,0.45)",
                opacity: s,
                transform: `scale(${s})`,
              }}
            >
              <span style={{ color: theme.amber, marginRight: 12, fontWeight: 700 }}>{c.n}</span>
              {c.label}
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
    { label: "trust registry", x: 640, y: 470, at: 1.8 },
    { label: "credential schemas", x: 1140, y: 470, at: 2.9 },
    { label: "accreditation lists", x: 640, y: 730, at: 4.0 },
    { label: "business model", x: 1140, y: 730, at: 5.1 },
  ];
  const OUT = [
    { label: "discoverable", tx: 300, ty: 300, at: 6.8 },
    { label: "interconnectable", tx: 1620, ty: 300, at: 7.9 },
    { label: "joinable", tx: 960, ty: 250, at: 9.0 },
  ];
  const HUB = { x: 960, y: 600 };
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <SceneTitle tone="dark" accent kicker="challenge 1" title="Scale, by creating ecosystems at will" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <ellipse cx={HUB.x} cy={HUB.y} rx={360} ry={215} fill="none" stroke="#475569" strokeWidth={2.5} strokeDasharray="8 8" opacity={hubIn} />
        {OUT.map((o, i) => {
          const drawn = interpolate(t, [o.at, o.at + 0.7], [0, 1], clamp);
          const len = Math.hypot(o.tx - HUB.x, o.ty - (HUB.y - 215));
          return (
            <line
              key={i}
              x1={HUB.x}
              y1={HUB.y - 215}
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
    { y: 360, at: 3.2 },
    { y: 570, at: 3.9 },
    { y: 800, at: 4.6 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <SceneTitle tone="dark" accent kicker="challenge 2" title="Scale cross-border" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={960} y1={180} x2={960} y2={960} stroke="#64748b" strokeWidth={3} strokeDasharray="12 10" opacity={borderIn} />
        {arrows.map((a, i) => {
          const drawn = interpolate(t, [a.at, a.at + 0.6], [0, 1], clamp);
          return (
            <g key={i} opacity={drawn}>
              <line x1={1210} y1={a.y} x2={1210 - 200 * drawn} y2={a.y} stroke={theme.indigo} strokeWidth={2.5} strokeDasharray="8 8" />
              <path d={`M ${1210 - 200 * drawn} ${a.y - 8} l -14 8 l 14 8 z`} fill={theme.indigo} />
            </g>
          );
        })}
        <line x1={400} y1={360} x2={650} y2={720} stroke={theme.indigo} strokeWidth={2.5} opacity={0.8 * interpolate(t, [1.2, 1.8], [0, 1], clamp)} />
      </svg>
      {island(400, 360, 0.6, false)}
      {island(650, 720, 0.9, false)}
      {island(1330, 360, 1.6, true, "🇯🇵")}
      {island(1650, 570, 2.0, true, "🇵🇪")}
      {island(1330, 800, 2.4, true, undefined, "any sector")}
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
      <SceneTitle tone="dark" accent kicker="challenge 3" title="Mutual authentication" />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={560} y1={430} x2={1360} y2={430} stroke="#334155" strokeWidth={2} strokeDasharray="7 7" opacity={pop(frame, fps, 1.1)} />
        <line x1={560} y1={730} x2={1360} y2={730} stroke="#334155" strokeWidth={2} strokeDasharray="7 7" opacity={pop(frame, fps, 1.3)} />
      </svg>
      <span style={{ position: "absolute", left: 385, top: 290, fontSize: 34, background: "rgba(11,18,32,0.9)", border: "1.5px solid #475569", borderRadius: 12, padding: "5px 12px", opacity: pop(frame, fps, 0.4) }}>🇫🇷</span>
      {node(450, 430, "service", 0.5)}
      {node(450, 730, "agent", 0.7)}
      <span style={{ position: "absolute", left: 1455, top: 290, fontSize: 34, background: "rgba(11,18,32,0.9)", border: "1.5px solid #475569", borderRadius: 12, padding: "5px 12px", opacity: pop(frame, fps, 0.6) }}>🇯🇵</span>
      {node(1470, 430, "service", 0.8)}
      {node(1470, 730, "agent", 1.0)}
      {ping(560, 1360, 430, "who are you?", 1.6, 3.4)}
      {ping(1360, 560, 730, "can I trust you?", 3.3, 3.4)}
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
    { x: 620, y: 320, delay: 0.7 },
    { x: 1320, y: 300, found: true, delay: 0.9 },
    { x: 520, y: 640, found: true, delay: 1.1 },
    { x: 1440, y: 640, delay: 1.3 },
    { x: 1100, y: 800, delay: 1.5 },
  ];
  const st = { fill: "none", stroke: "#e2e8f0", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <SceneTitle tone="dark" accent kicker="challenge 4" title="Discover trusted services" />
      {/* the query, typed live */}
      {(() => {
        const PROMPT = "find agents certified ISO 24001, offering open banking, in Europe";
        const typed = Math.floor(interpolate(t, [0.9, 4.4], [0, PROMPT.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
        const cursorOn = frame % 20 < 12;
        return (
          <div style={{ position: "absolute", top: 830, left: 610, right: 0, display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                minWidth: 960,
                background: "rgba(11,18,32,0.95)",
                border: "1.5px solid #475569",
                borderRadius: 999,
                padding: "16px 28px",
                opacity: pop(frame, fps, 0.8),
              }}
            >
              <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
                <circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="#64748b" strokeWidth="2.2" />
                <path d="M15.2 15.2 L20.5 20.5" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span style={{ fontFamily: theme.mono, fontSize: 23, color: "#e2e8f0" }}>
                {PROMPT.slice(0, typed)}
                <span style={{ opacity: cursorOn ? 1 : 0, color: theme.amber }}>|</span>
              </span>
            </div>
          </div>
        );
      })()}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={960}
            y1={510}
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
              <div
                style={{
                  position: "absolute",
                  left: -110,
                  top: 62,
                  whiteSpace: "nowrap",
                  fontFamily: theme.mono,
                  fontSize: 16,
                  color: "#a7f3d0",
                  background: "rgba(11,18,32,0.95)",
                  border: `1.5px solid ${theme.green}`,
                  borderRadius: 999,
                  padding: "6px 14px",
                  transform: `scale(${pop(frame, fps, 4.6)})`,
                }}
              >
                ISO 24001 · open banking · EU
              </div>
            ) : null}
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
          top: 800,
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
              cy={510}
              r={90 + cycle * 150}
              fill="none"
              stroke={theme.violet}
              strokeWidth="3"
              opacity={on * Math.max(0, 0.5 - (cycle / 1.6) * 0.5)}
            />
          </svg>
        );
      })}
      <div style={{ position: "absolute", left: 960 - 80, top: 510 - 80, transform: `scale(${lensIn})` }}>
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
  width?: number;
  children: React.ReactNode;
}> = ({ index, title, subtitle, appearAt, width = 530, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, appearAt);
  return (
    <div
      style={{
        width,
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
          <div style={{ fontFamily: theme.display, fontSize: 30, fontWeight: 700, color: theme.ink }}>
            {title}
          </div>
          <div style={{ fontSize: 18, color: theme.muted }}>{subtitle}</div>
        </div>
      </div>
      <div
        style={{
          background: theme.card,
          borderRadius: 20,
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
          padding: 26,
          height: 470,
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
  // Attention pulse: a quick swell + glow as the narration names the element.
  const pulseK = (at: number) => interpolate(t, [at, at + 0.25, at + 0.9], [0, 1, 0], clamp);
  // Word-synced beats, measured from the take-6 clip.
  const ARTIFACTS = [
    { label: "governance framework", at: 9.9 },
    { label: "credential schemas", at: 11.6 },
    { label: "business model", at: 12.9 },
  ];
  const rootPulse = pulseK(7.5);
  const ringIn = interpolate(t, [18.6, 19.3], [0, 1], clamp);
  const lensIn = pop(frame, fps, 19.0);
  const badgeIn = pop(frame, fps, 19.4);
  // The tree column.
  const TX = 1310;
  const tier = (y: number) => y;
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      <SceneTitle kicker="for ecosystem builders" title="Build your ecosystem" />
      {/* ---- left: the root card, its anchor, its artifacts ---- */}
      <div style={{ position: "absolute", left: 480 - 190, top: 230, width: 380, opacity: rootIn, transform: `scale(${rootIn * (1 + 0.08 * rootPulse)})` }}>
        <div
          style={{
            background: "#f5f3ff",
            border: `2.5px solid ${theme.violet}`,
            borderRadius: 18,
            boxShadow: `0 14px 36px rgba(15,23,42,0.12), 0 0 0 ${12 * rootPulse}px rgba(124,58,237,0.16)`,
            padding: "22px 24px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 31, fontWeight: 800, color: theme.ink }}>Your Ecosystem</div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 480 - 165, top: 410, width: 330, display: "flex", flexDirection: "column", gap: 18 }}>
        {ARTIFACTS.map((a) => {
          const s = pop(frame, fps, a.at);
          const k = pulseK(a.at + 0.1);
          return (
            <span
              key={a.label}
              style={{
                fontFamily: theme.mono,
                fontSize: 20,
                color: "#6d28d9",
                background: "#f5f3ff",
                border: "1.5px solid #ddd6fe",
                borderRadius: 999,
                padding: "12px 20px",
                textAlign: "center",
                opacity: s,
                transform: `scale(${s * (1 + 0.1 * k)})`,
                boxShadow: `0 0 0 ${10 * k}px rgba(124,58,237,0.16)`,
              }}
            >
              {a.label}
            </span>
          );
        })}
      </div>

      {/* ---- onboarding edge from the root card into the tree ---- */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        <line x1={672} y1={288} x2={TX - 122} y2={288} stroke={theme.violet} strokeWidth={2.5} strokeDasharray="7 7" opacity={draw(14.4)} />
        {/* accredits: root -> grantors */}
        <line x1={TX} y1={330} x2={TX - 180} y2={438} stroke={theme.violet} strokeWidth={2.5} opacity={draw(15.3)} />
        <line x1={TX} y1={330} x2={TX + 180} y2={438} stroke={theme.violet} strokeWidth={2.5} opacity={draw(15.3)} />
        {/* grantors -> issuers/verifiers */}
        <line x1={TX - 180} y1={514} x2={TX - 180} y2={606} stroke={theme.violet} strokeWidth={2.5} opacity={draw(16.1)} />
        <line x1={TX + 180} y1={514} x2={TX + 180} y2={606} stroke={theme.violet} strokeWidth={2.5} opacity={draw(16.1)} />
        {/* issuers issue to / verifiers verify holders */}
        <line x1={TX - 180} y1={684} x2={TX - 40} y2={770} stroke="#a78bfa" strokeWidth={2.5} strokeDasharray="6 6" opacity={draw(16.9)} />
        <line x1={TX + 180} y1={684} x2={TX + 40} y2={770} stroke="#a78bfa" strokeWidth={2.5} strokeDasharray="6 6" opacity={draw(16.9)} />
        {/* the discoverable ring */}
        <ellipse cx={TX} cy={560} rx={365} ry={365} fill="none" stroke={theme.green} strokeWidth={3} strokeDasharray="10 8" opacity={ringIn} />
      </svg>
      {/* tier labels */}
      {[
        { label: "T1 · GRANTORS", y: 458, at: 15.3 },
        { label: "T2 · ISSUERS + VERIFIERS", y: 628, at: 16.1 },
        { label: "T3 · HOLDERS", y: 792, at: 16.9 },
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
      <div style={{ position: "absolute", left: TX - 120, top: 252 }}>
        <TreeCard title="Ecosystem" sub="root of trust" s={pop(frame, fps, 14.7)} width={240} accent />
      </div>
      <div style={{ position: "absolute", left: TX - 180 - 110, top: 440 }}>
        <TreeCard title="Issuer Grantor" sub="accredits issuers" s={pop(frame, fps, 15.5)} width={220} />
      </div>
      <div style={{ position: "absolute", left: TX + 180 - 110, top: 440 }}>
        <TreeCard title="Verifier Grantor" sub="accredits verifiers" s={pop(frame, fps, 15.6)} width={220} />
      </div>
      <div style={{ position: "absolute", left: TX - 180 - 110, top: 608 }}>
        <TreeCard title="Issuers" sub="issue credentials" s={pop(frame, fps, 16.3)} width={220} />
      </div>
      <div style={{ position: "absolute", left: TX + 180 - 110, top: 608 }}>
        <TreeCard title="Verifiers" sub="request proofs" s={pop(frame, fps, 16.4)} width={220} />
      </div>
      {/* holders: person · service · AI agent */}
      <div style={{ position: "absolute", left: TX - 132, top: 772, display: "flex", gap: 24 }}>
        {(["person", "service", "agent"] as const).map((k, i) => {
          const s = pop(frame, fps, 17.1 + i * 0.15);
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
      <div style={{ position: "absolute", left: TX - 190, top: 856, width: 380, textAlign: "center", fontSize: 15.5, color: theme.muted, fontWeight: 600, opacity: interpolate(t, [17.5, 17.9], [0, 1], clamp) }}>
        holders · human · service · AI agent
      </div>
      {/* ---- beat 4: found by the lens ---- */}
      <div style={{ position: "absolute", left: TX + 290, top: 212, opacity: lensIn, transform: `scale(${lensIn}) rotate(-12deg)` }}>
        <svg width={74} height={74} viewBox="0 0 24 24" aria-hidden>
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke={theme.green} strokeWidth={2.2} />
          <path d="M15.5 15.5 L21 21" stroke={theme.green} strokeWidth={2.6} strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: TX - 105, top: 952, opacity: badgeIn, transform: `scale(${badgeIn})` }}>
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
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const W = 424;
  const iconCircle = (kind: "service" | "agent", size: number, at: number, badge?: boolean) => (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#f5f3ff",
        border: `2px solid ${theme.violet}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${pop(frame, fps, at)})`,
        flexShrink: 0,
      }}
    >
      <PartyIcon kind={kind} size={size * 0.52} color={theme.violet} />
      {badge ? (
        <span
          style={{
            position: "absolute",
            right: -8,
            bottom: -8,
            width: 32,
            height: 32,
            borderRadius: 10,
            background: theme.card,
            border: "1.5px solid #e2e8f0",
            boxShadow: "0 6px 14px rgba(15,23,42,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={19} height={19} viewBox="0 0 24 24" aria-hidden>
            <rect x="3" y="6" width="18" height="13" rx="2.5" fill="none" stroke={theme.violet} strokeWidth="1.9" />
            <path d="M15 12.5 h3" stroke={theme.violet} strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </span>
      ) : null}
    </div>
  );
  const credCard = (x: number, y: number, at: number) => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 118,
        borderRadius: 12,
        background: theme.card,
        border: `2px solid ${theme.violet}`,
        boxShadow: "0 10px 24px rgba(15,23,42,0.14)",
        padding: "8px 10px",
        transform: `scale(${pop(frame, fps, at)}) rotate(${x < 150 ? -6 : 6}deg)`,
        fontFamily: theme.mono,
      }}
    >
      <div style={{ height: 7, borderRadius: 4, background: theme.gradient, marginBottom: 7 }} />
      <div style={{ fontSize: 11.5, color: theme.muted }}>ecosystem credential</div>
    </div>
  );
  return (
    <AbsoluteFill
      style={{
        background: theme.surface,
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 46,
      }}
    >
      <SceneTitle kicker="for service builders" title="Deploy your services" />
      {/* below the panels: any personal wallet, via the Verana resolver */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 872, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <span
          style={{
            fontFamily: theme.mono,
            fontSize: 19,
            color: "#6d28d9",
            background: "#f5f3ff",
            border: "1.5px solid #ddd6fe",
            borderRadius: 999,
            padding: "9px 26px",
            opacity: interpolate(t, [16.8, 17.2], [0, 1], clamp),
          }}
        >
          issue to any personal wallet · just integrate the Verana resolver
        </span>
        <div style={{ display: "flex", gap: 16 }}>
          {["inji", "eudi", "authbound", "paradym", "bcwallet", "wwwallet", "hologram", "sphereon", "talao", "nl-wallet"].map((id, i) => (
            <div key={id} style={{ transform: `scale(${pop(frame, fps, 17.3 + i * 0.1)})` }}>
              <WalletTile id={id} size={64} />
            </div>
          ))}
        </div>
      </div>
      <FreedomPanel index={1} title="Deploy" subtitle="your services and AI agents" appearAt={0.4} width={W}>
        <div style={{ display: "flex", gap: 38, marginBottom: 30 }}>
          {iconCircle("service", 124, 0.9)}
          {iconCircle("agent", 124, 1.1)}
        </div>
        <span
          style={{
            fontFamily: theme.mono,
            fontSize: 15,
            color: "#6d28d9",
            background: "#f5f3ff",
            border: "1.5px solid #ddd6fe",
            borderRadius: 999,
            padding: "6px 15px",
            opacity: interpolate(t, [1.7, 2.0], [0, 1], clamp),
          }}
        >
          your business wallet, your choice
        </span>
      </FreedomPanel>

      <FreedomPanel index={2} title="Join" subtitle="the ecosystems you care about" appearAt={1.1} width={W}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <div style={{ border: "1.5px solid #ddd6fe", background: "#faf9ff", borderRadius: 16, padding: "14px 16px", fontFamily: theme.font }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <svg width={30} height={30} viewBox="0 0 64 64" aria-hidden>
                <rect x="0" y="0" width="64" height="64" rx="12" fill="#763EF0" />
                <g transform="translate(32 33) scale(0.76923) translate(-27 -27)" fill="white">
                  <path d="M26.9932 51.6972L5.805 11.0977L2.91263 16.2161L0 10.6048L5.98725 0L26.9932 40.2483L47.9993 0L54 10.6217L51.0773 16.2161L48.1849 11.0977L26.9932 51.6972Z" />
                  <path d="M13.696 0L26.9935 25.4637L39.9367 0H13.696Z" />
                </g>
              </svg>
              <span style={{ fontSize: 20, fontWeight: 700, color: theme.ink }}>Ecosystems on Verana</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { bg: "#ecfdf5", fg: "#059669", d: "M12 3 C7 8 7 14 12 21 C17 14 17 8 12 3 Z" },
                { bg: "#eff6ff", fg: "#2563eb", d: "M13 2 L5 13 h5 L11 22 L19 10 h-5 Z" },
                { bg: "#fff7ed", fg: "#ea580c", d: "M12 21 C7 16 4 12.5 4 9 a4.5 4.5 0 0 1 8 -2.5 A4.5 4.5 0 0 1 20 9 c0 3.5 -3 7 -8 12 Z" },
                { bg: "#fdf2f8", fg: "#db2777", d: "M12 3 a4 4 0 0 1 4 4 c0 1.5 -1 2.6 -2 3.4 L14 20 h-4 l0 -9.6 C9 9.6 8 8.5 8 7 a4 4 0 0 1 4 -4 Z" },
              ].map((e2, i) => (
                <span key={i} style={{ display: "inline-flex", width: 52, height: 52, borderRadius: 13, background: e2.bg, alignItems: "center", justifyContent: "center", transform: `scale(${pop(frame, fps, 1.7 + i * 0.12)})` }}>
                  <svg width={26} height={26} viewBox="0 0 24 24" aria-hidden>
                    <path d={e2.d} fill={e2.fg} />
                  </svg>
                </span>
              ))}
            </div>
          </div>
          <div style={{ border: "1.5px solid #e2e8f0", borderRadius: 16, padding: "14px 16px", fontFamily: theme.font }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <svg width={28} height={28} viewBox="0 0 24 24" aria-hidden>
                <path d="M4 5.5 h16 M4 10 h16 M4 14.5 h16 M4 19 h10" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: 20, fontWeight: 700, color: theme.ink }}>Other Ecosystems</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {["wallet-logos/eudi", "standards-logos/gleif", "standards-logos/icao"].map((id, i) => (
                <span key={id} style={{ display: "inline-flex", width: 52, height: 52, borderRadius: 13, background: "#f8fafc", border: "1px solid #e2e8f0", alignItems: "center", justifyContent: "center", overflow: "hidden", transform: `scale(${pop(frame, fps, 2.2 + i * 0.12)})` }}>
                  <AssetImg id={id} cover={false} style={{ padding: 7 }} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </FreedomPanel>

      <FreedomPanel index={3} title="Attach" subtitle="credentials to your services" appearAt={1.8} width={W}>
        <div style={{ position: "relative", width: 360, height: 356 }}>
          <div style={{ position: "absolute", left: 180 - 52, top: 4 }}>{iconCircle("service", 104, 2.3)}</div>
          {credCard(28, 78, 2.9)}
          {credCard(214, 78, 3.2)}
          {/* the mini trust graph, your node lit */}
          <svg width={360} height={170} style={{ position: "absolute", left: 0, top: 168 }} aria-hidden>
            {[
              [70, 60, 180, 95], [180, 95, 292, 55], [180, 95, 110, 140], [180, 95, 262, 140], [70, 60, 110, 140],
            ].map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ddd6fe" strokeWidth={2.5} opacity={interpolate(t, [3.6 + i * 0.1, 3.9 + i * 0.1], [0, 1], clamp)} />
            ))}
            {[
              [70, 60], [292, 55], [110, 140], [262, 140],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={13} fill="#f5f3ff" stroke={theme.violet} strokeWidth={2} opacity={interpolate(t, [3.6 + i * 0.1, 3.9 + i * 0.1], [0, 1], clamp)} />
            ))}
            <circle cx={180} cy={95} r={17} fill="#ecfdf5" stroke={theme.green} strokeWidth={3} opacity={interpolate(t, [4.1, 4.4], [0, 1], clamp)} />
          </svg>
          <div style={{ position: "absolute", left: 0, right: 0, top: 320, textAlign: "center", opacity: pop(frame, fps, 4.4) }}>
            <span style={{ fontSize: 17, fontWeight: 800, color: theme.greenDark, background: "#ecfdf5", border: `2px solid ${theme.green}`, borderRadius: 999, padding: "7px 18px", fontFamily: theme.font }}>
              visible in the Trust Graph
            </span>
          </div>
        </div>
      </FreedomPanel>

      <FreedomPanel index={4} title="Issue &amp; Verify" subtitle="credentials of your ecosystems" appearAt={2.5} width={W}>
        <div style={{ position: "relative", width: 378, height: 330 }}>
          <div style={{ position: "absolute", left: 189 - 44, top: 0 }}>{iconCircle("service", 88, 3.0)}</div>
          <svg width={378} height={330} style={{ position: "absolute", inset: 0 }} aria-hidden>
            <defs>
              <marker id="iv-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 z" fill={theme.violet} />
              </marker>
            </defs>
            <line x1={155} y1={95} x2={82} y2={185} stroke={theme.violet} strokeWidth={3} markerEnd="url(#iv-arrow)" opacity={interpolate(t, [3.4, 3.8], [0, 1], clamp)} />
            <line x1={189} y1={100} x2={189} y2={185} stroke={theme.violet} strokeWidth={3} strokeDasharray="8 7" markerEnd="url(#iv-arrow)" opacity={interpolate(t, [3.7, 4.1], [0, 1], clamp)} />
            <line x1={223} y1={95} x2={296} y2={185} stroke={theme.violet} strokeWidth={3} markerEnd="url(#iv-arrow)" opacity={interpolate(t, [4.0, 4.4], [0, 1], clamp)} />
          </svg>
          <span style={{ position: "absolute", left: 40, top: 108, fontFamily: theme.mono, fontSize: 15, color: theme.violet, background: "#f5f3ff", border: "1.5px solid #ddd6fe", borderRadius: 999, padding: "3px 11px", opacity: interpolate(t, [3.6, 3.9], [0, 1], clamp) }}>
            issue
          </span>
          <span style={{ position: "absolute", left: 252, top: 108, fontFamily: theme.mono, fontSize: 15, color: theme.violet, background: "#f5f3ff", border: "1.5px solid #ddd6fe", borderRadius: 999, padding: "3px 11px", opacity: interpolate(t, [4.1, 4.4], [0, 1], clamp) }}>
            verify
          </span>
          <div style={{ position: "absolute", left: 32, top: 196, transform: `scale(${pop(frame, fps, 3.8)})` }}>
            <WalletTile id="eudi" size={82} />
          </div>
          <div style={{ position: "absolute", left: 189 - 41, top: 196 }}>{iconCircle("agent", 82, 4.1)}</div>
          <div style={{ position: "absolute", left: 264, top: 196 }}>{iconCircle("service", 82, 4.4, true)}</div>
          <div style={{ position: "absolute", left: -20, right: -20, top: 296, textAlign: "center", fontSize: 15, color: theme.muted, fontWeight: 600, fontFamily: theme.font, opacity: interpolate(t, [4.7, 5.1], [0, 1], clamp) }}>
            personal wallets · AI agents · services with wallets
          </div>
        </div>
      </FreedomPanel>
    </AbsoluteFill>
  );
};

const PLAYGROUND_URL = "https://playground.testnet.verana.network";
const pgQr = QRCode.create(PLAYGROUND_URL, { errorCorrectionLevel: "M" });
const PG_SIZE = pgQr.modules.size;
const PG_DATA = pgQr.modules.data as Uint8Array;

/** A real, scannable QR to the public playground (quiet zone included). */
const PlaygroundQr: React.FC<{ px: number }> = ({ px }) => {
  const cell = px / (PG_SIZE + 8);
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < PG_SIZE; y++) {
    for (let x = 0; x < PG_SIZE; x++) {
      if (PG_DATA[y * PG_SIZE + x]) {
        rects.push(
          <rect key={`${x}-${y}`} x={(x + 4) * cell} y={(y + 4) * cell} width={cell + 0.35} height={cell + 0.35} fill="#0f172a" />
        );
      }
    }
  }
  return (
    <svg width={px} height={px} style={{ display: "block", background: "#fff" }}>
      {rects}
    </svg>
  );
};

/** N-8b: the reveal as three answer cards, landing on the narrated triplet
 *  and previewing the three build sequences that follow (N-9a / N-9b / N-9c). */
export const AnswersV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const st = { fill: "none", stroke: theme.violet, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const CARDS = [
    {
      title: "Sovereign ecosystems",
      sub: "build your own trust registry: your rules, your schemas, your business model",
      at: 3.9,
      icon: (
        <>
          <rect x="9" y="3" width="6" height="5" rx="1" {...st} />
          <rect x="3" y="16" width="6" height="5" rx="1" {...st} />
          <rect x="15" y="16" width="6" height="5" rx="1" {...st} />
          <path d="M12 8 v3 M12 11 L6 16 M12 11 L18 16" {...st} />
        </>
      ),
    },
    {
      title: "Verifiable services",
      sub: "deploy services and AI agents; issue and verify credentials from any ecosystem you are interested in",
      at: 5.4,
      icon: (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" {...st} />
          <circle cx="8.5" cy="11" r="2.2" {...st} />
          <path d="M6 16.5 a2.8 2.3 0 0 1 5 0 M13.5 9.5 h5 M13.5 13.5 h5" {...st} />
        </>
      ),
    },
    {
      title: "One public Trust Graph",
      sub: "be found, mutually authenticate, and connect: trust before the first message",
      at: 7.1,
      icon: (
        <>
          <circle cx="6" cy="6" r="2.5" {...st} />
          <circle cx="18" cy="6" r="2.5" {...st} />
          <circle cx="12" cy="18" r="2.5" {...st} />
          <path d="M8 7.5 L16 7.5 M7.5 8 L10.8 15.8 M16.5 8 L13.2 15.8" {...st} />
        </>
      ),
    },
  ];
  const ethos = pop(frame, fps, 9.1);
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      <SceneTitle kicker="the answer" title="Verana answers all of this" />
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", gap: 30, justifyContent: "center" }}>
        {CARDS.map((c) => {
          const s = pop(frame, fps, c.at);
          return (
            <div
              key={c.title}
              style={{
                width: 480,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 20,
                boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
                padding: "34px 30px 30px",
                textAlign: "center",
                opacity: s,
                transform: `translateY(${(1 - s) * 50}px)`,
              }}
            >
              <span style={{ display: "inline-flex", width: 84, height: 84, borderRadius: 21, background: "#f5f3ff", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <svg width={46} height={46} viewBox="0 0 24 24" aria-hidden>
                  {c.icon}
                </svg>
              </span>
              <div style={{ fontSize: 30, fontWeight: 800, color: theme.ink }}>{c.title}</div>
              <div style={{ fontSize: 19, color: theme.muted, marginTop: 8, lineHeight: 1.5 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 700, left: 0, right: 0, textAlign: "center", opacity: ethos, transform: `translateY(${(1 - ethos) * 24}px)` }}>
        <span
          style={{
            fontSize: 27,
            fontWeight: 700,
            color: "#6d28d9",
            background: "#f5f3ff",
            border: "1.5px solid #ddd6fe",
            borderRadius: 999,
            padding: "14px 38px",
          }}
        >
          open · neutral · cross-border · owned by no one
        </span>
      </div>
    </AbsoluteFill>
  );
};

/** N-9d: the Verana Foundation (veranafoundation.org): open specs on open
 *  standards, open-source software, non-profit community stewardship, and
 *  the invitation: join free as a contributor, join or create working groups. */
export const FoundationV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const st = { fill: "none", stroke: theme.violet, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const PILLARS = [
    {
      title: "Open specifications",
      sub: "built exclusively on open standards · CC BY-SA 4.0",
      at: 2.2,
      icon: (
        <>
          <path d="M6 3.5 h9 l4 4 V20.5 h-13 Z M15 3.5 v4 h4" {...st} />
          <path d="M9 12 h7 M9 15.5 h7" {...st} />
        </>
      ),
    },
    {
      title: "Open-source software",
      sub: "Apache 2.0 · public repos, copyright with contributors",
      at: 4.6,
      icon: <path d="M9 8 L4.5 12 L9 16 M15 8 L19.5 12 L15 16" {...st} />,
    },
    {
      title: "Non-profit foundation",
      sub: "community managed · steward of the open trust layer",
      at: 6.4,
      icon: (
        <>
          <circle cx="8.5" cy="9" r="3" {...st} />
          <circle cx="15.5" cy="9" r="3" {...st} />
          <path d="M3.5 19.5 a5 4.5 0 0 1 10 0 M10.5 19.5 a5 4.5 0 0 1 10 0" {...st} />
        </>
      ),
    },
  ];
  const WGS = [
    { label: "specifications", at: 16.7 },
    { label: "software", at: 17.0 },
    { label: "business cases", at: 17.3 },
    { label: "your working group", at: 17.7, dashed: true },
  ];
  const useIn = pop(frame, fps, 9.5);
  const joinIn = pop(frame, fps, 13.5);
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      {/* the official foundation logo (veranafoundation.org) beside the title */}
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          opacity: pop(frame, fps, 0.15),
          transform: `translateY(${(1 - (pop(frame, fps, 0.15) as number)) * -16}px)`,
        }}
      >
        <div style={{ fontFamily: theme.mono, fontSize: 16, letterSpacing: 3, color: theme.faint, textTransform: "uppercase" }}>
          built in the open
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 66, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <AssetImg id="standards-logos/foundation" cover={false} />
          </div>
          {/* the site wordmark, exact: Inter 600, tight tracking, Foundation in purple */}
          <div style={{ fontFamily: theme.font, fontSize: 50, fontWeight: 600, letterSpacing: "-0.02em", color: "#111111", whiteSpace: "nowrap" }}>
            Verana<span style={{ color: "#763ef0" }}>Foundation</span>
          </div>
        </div>
        <div style={{ fontFamily: theme.mono, fontSize: 21, color: theme.muted, letterSpacing: 0.5 }}>
          https://veranafoundation.org
        </div>
      </div>
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, display: "flex", gap: 30, justifyContent: "center" }}>
        {PILLARS.map((c) => {
          const s = pop(frame, fps, c.at);
          return (
            <div
              key={c.title}
              style={{
                width: 470,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 20,
                boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
                padding: "28px 28px 24px",
                textAlign: "center",
                opacity: s,
                transform: `translateY(${(1 - s) * 50}px)`,
              }}
            >
              <span style={{ display: "inline-flex", width: 76, height: 76, borderRadius: 19, background: "#f5f3ff", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width={42} height={42} viewBox="0 0 24 24" aria-hidden>
                  {c.icon}
                </svg>
              </span>
              <div style={{ fontSize: 28, fontWeight: 800, color: theme.ink }}>{c.title}</div>
              <div style={{ fontSize: 18, color: theme.muted, marginTop: 6, lineHeight: 1.45 }}>{c.sub}</div>
            </div>
          );
        })}
      </div>
      {/* the double invitation: use it, and contribute */}
      <div style={{ position: "absolute", top: 632, left: 0, right: 0, display: "flex", gap: 26, justifyContent: "center", alignItems: "stretch" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: theme.card,
            border: `2px solid ${theme.violet}`,
            borderRadius: 22,
            padding: "12px 34px",
            textAlign: "center",
            boxShadow: "0 14px 36px rgba(15,23,42,0.10)",
            opacity: useIn,
            transform: `translateY(${(1 - useIn) * 30}px)`,
          }}
        >
          <span style={{ fontSize: 27, fontWeight: 800, color: theme.ink }}>
            Use it all, <span style={{ color: theme.greenDark }}>free</span>
          </span>
          <span style={{ fontSize: 17.5, color: theme.muted, marginTop: 3 }}>
            extend your own products and services with the Foundation's software
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", opacity: joinIn, transform: `translateY(${(1 - joinIn) * 30}px)` }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 16, fontSize: 27, fontWeight: 800, color: "#fff", background: theme.gradient, borderRadius: 999, padding: "16px 36px", boxShadow: "0 18px 44px rgba(118,62,240,0.35)" }}>
            Join the Foundation
            <span style={{ fontSize: 18, fontWeight: 800, color: theme.greenDark, background: "#ecfdf5", border: "2px solid #10b981", borderRadius: 999, padding: "4px 15px" }}>
              free for contributors
            </span>
          </span>
        </div>
      </div>
      <div style={{ position: "absolute", top: 775, left: 0, right: 0, display: "flex", gap: 14, justifyContent: "center", alignItems: "center" }}>
        <span style={{ fontFamily: theme.mono, fontSize: 16, letterSpacing: 1.5, color: theme.faint, textTransform: "uppercase", opacity: interpolate(t, [16.4, 16.8], [0, 1], clamp) }}>
          working groups
        </span>
        {WGS.map((w) => {
          const s = pop(frame, fps, w.at);
          return (
            <span
              key={w.label}
              style={{
                fontFamily: theme.mono,
                fontSize: 18,
                color: "#6d28d9",
                background: "#f5f3ff",
                border: `1.5px ${w.dashed ? "dashed" : "solid"} #ddd6fe`,
                borderRadius: 999,
                padding: "9px 20px",
                opacity: s,
                transform: `scale(${s})`,
              }}
            >
              {w.label}
            </span>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 880, left: 0, right: 0, textAlign: "center", fontFamily: theme.mono, fontSize: 17, color: theme.faint, opacity: interpolate(t, [18.8, 19.2], [0, 1], clamp) }}>
        learn by doing · playground.testnet.verana.network · docs.verana.io
      </div>
    </AbsoluteFill>
  );
};

/** N-9c: the payoff. Your service sits in the Trust Graph; a person and an
 *  AI agent find it, mutually authenticate with credentials (green checks
 *  both ways), and the connection goes live. */
export const ConnectV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const YOU = { x: 1260, y: 520 };
  const MESH = [
    { x: 1030, y: 350 }, { x: 1490, y: 340 }, { x: 1650, y: 560 },
    { x: 1470, y: 740 }, { x: 1090, y: 730 }, { x: 880, y: 520 },
  ];
  const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]];
  const searchers = [
    { kind: "person" as const, x: 350, y: 470, at: 1.3 },
    { kind: "agent" as const, x: 350, y: 700, at: 1.5 },
  ];
  const pathDraw = interpolate(t, [1.9, 2.9], [0, 1], clamp);
  const connected = interpolate(t, [6.3, 6.9], [0, 1], clamp);
  const check = (x: number, y: number, at: number) => (
    <div style={{ position: "absolute", left: x - 15, top: y - 15, transform: `scale(${pop(frame, fps, at)})` }}>
      <svg width={30} height={30} viewBox="0 0 20 20" aria-hidden>
        <circle cx="10" cy="10" r="10" fill={theme.green} />
        <path d="M5.5 10.5 L8.5 13.5 L14.5 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
  // The traveling credential card: person -> you, then you -> person.
  const credPos = (from: { x: number; y: number }, to: { x: number; y: number }, a: number, b: number) => {
    const p = interpolate(t, [a, b], [0.08, 0.9], clamp);
    const vis = t >= a && t <= b + 0.15 ? 1 : 0;
    return { x: from.x + (to.x - from.x) * p, y: from.y + (to.y - from.y) * p, vis };
  };
  const out = credPos({ x: 430, y: 490 }, YOU, 3.3, 4.3);
  const back = credPos(YOU, { x: 430, y: 490 }, 4.5, 5.5);
  const agentLine = { x1: 435, y1: 690, x2: YOU.x - 45, y2: YOU.y + 40 };
  return (
    <AbsoluteFill style={{ background: theme.surface, fontFamily: theme.font }}>
      <SceneTitle kicker="the result" title="Find, authenticate, connect" />
      {/* the trust graph, named */}
      <div
        style={{
          position: "absolute",
          left: 1010,
          top: 258,
          width: 500,
          textAlign: "center",
          fontFamily: theme.mono,
          fontSize: 17,
          letterSpacing: 2.5,
          color: theme.faint,
          textTransform: "uppercase",
          opacity: interpolate(t, [0.9, 1.3], [0, 1], clamp),
        }}
      >
        the Trust Graph
      </div>
      {/* the trust graph */}
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }} aria-hidden>
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={MESH[a].x} y1={MESH[a].y} x2={MESH[b].x} y2={MESH[b].y} stroke="#ddd6fe" strokeWidth={2.5} opacity={interpolate(t, [0.4 + i * 0.08, 0.7 + i * 0.08], [0, 1], clamp)} />
        ))}
        {MESH.map((n, i) => (
          <line key={`s${i}`} x1={n.x} y1={n.y} x2={YOU.x} y2={YOU.y} stroke="#ede9fe" strokeWidth={2} opacity={interpolate(t, [0.9, 1.2], [0, 1], clamp)} />
        ))}
        {/* find paths */}
        <line x1={435} y1={490} x2={YOU.x - 55} y2={YOU.y - 10} stroke={connected ? theme.green : theme.indigo} strokeWidth={3} strokeDasharray={connected > 0.5 ? undefined : "9 8"} opacity={0.9 * pathDraw} />
        <line x1={agentLine.x1} y1={agentLine.y1} x2={agentLine.x2} y2={agentLine.y2} stroke={connected > 0.5 ? theme.green : theme.indigo} strokeWidth={3} strokeDasharray={connected > 0.5 ? undefined : "9 8"} opacity={0.9 * interpolate(t, [2.2, 3.2], [0, 1], clamp)} />
      </svg>
      {MESH.map((n, i) => (
        <div key={i} style={{ position: "absolute", left: n.x - 14, top: n.y - 14, width: 28, height: 28, borderRadius: "50%", background: "#f5f3ff", border: `2px solid ${theme.violet}`, transform: `scale(${pop(frame, fps, 0.4 + i * 0.08)})` }} />
      ))}
      {/* your service, in the graph */}
      <div style={{ position: "absolute", left: YOU.x - 55, top: YOU.y - 55, transform: `scale(${pop(frame, fps, 1.0)})` }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", background: "#ecfdf5", border: `3px solid ${theme.green}`, boxShadow: "0 14px 36px rgba(16,185,129,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <PartyIcon kind="service" size={54} color={theme.greenDark} />
        </div>
        <div style={{ marginTop: 8, textAlign: "center", fontSize: 17, fontWeight: 700, color: theme.greenDark }}>your service</div>
      </div>
      {/* the searchers */}
      {searchers.map((s) => {
        const sc = pop(frame, fps, s.at);
        return (
          <div key={s.kind} style={{ position: "absolute", left: s.x - 52, top: s.y - 52, opacity: sc, transform: `scale(${sc})`, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 104, height: 104, borderRadius: "50%", background: theme.card, border: "2px solid #ddd6fe", boxShadow: "0 10px 26px rgba(15,23,42,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PartyIcon kind={s.kind} size={50} color={theme.violet} />
            </div>
            <span style={{ fontSize: 17, fontWeight: 600, color: theme.muted }}>{s.kind === "person" ? "any person" : "any AI agent"}</span>
          </div>
        );
      })}
      {/* mutual authentication: credentials both ways, checks both ends */}
      {[out, back].map((c, i) =>
        c.vis ? (
          <div key={i} style={{ position: "absolute", left: c.x - 52, top: c.y - 34, width: 104, borderRadius: 10, background: theme.card, border: `2px solid ${theme.violet}`, boxShadow: "0 10px 24px rgba(15,23,42,0.16)", padding: "6px 8px", transform: "rotate(-5deg)" }}>
            <div style={{ height: 6, borderRadius: 3, background: theme.gradient, marginBottom: 5 }} />
            <div style={{ fontFamily: theme.mono, fontSize: 10.5, color: theme.muted }}>credential</div>
          </div>
        ) : null
      )}
      {check(YOU.x - 62, YOU.y - 52, 4.4)}
      {check(452, 452, 5.6)}
      {/* connected */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 944, display: "flex", justifyContent: "center", opacity: connected, transform: `translateY(${(1 - connected) * 18}px)` }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: theme.greenDark, background: "#ecfdf5", border: `2.5px solid ${theme.green}`, borderRadius: 999, padding: "12px 34px" }}>
          mutually authenticated · connected
        </span>
      </div>
    </AbsoluteFill>
  );
};

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
      {/* try it yourself: a real QR to the public playground */}
      <div
        style={{
          position: "absolute",
          right: 110,
          bottom: 96,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: interpolate(frame, [fps * 2.6, fps * 3.2], [0, 1], clamp),
        }}
      >
        <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 40px rgba(15,23,42,0.16)", border: "1.5px solid #e2e8f0" }}>
          <PlaygroundQr px={210} />
        </div>
        <div style={{ fontFamily: theme.font, fontSize: 19, fontWeight: 700, color: theme.ink }}>try it yourself</div>
        <div style={{ fontFamily: theme.mono, fontSize: 14.5, color: theme.muted }}>playground.testnet.verana.network</div>
      </div>
    </AbsoluteFill>
  );
};
