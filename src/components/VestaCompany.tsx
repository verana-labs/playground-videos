// S-1a..S-1d: playground Vesta journey §1 "The Company". On screen: the
// section kicker, the subsection title, and the page's imagery and diagrams
// only. The narration is simplified and runs as lower-third voice-over text
// (shot.lines), intro-style. Light marketing register.
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AssetImg, Placeholder, useAsset } from "../lib/assets";
import { theme } from "../theme";

export type CompanyPart = "product-line" | "factory" | "repair-network" | "services";

// ------------------------------------------------- exact playground content
const PRODUCT_LINE = {
  title: "The product line",
  para: "Vesta Appliances has made washing machines and ovens for forty years. Three product lines, one promise: machines that last, and get repaired, not replaced.",
  asset: "vesta/lineup",
  caption: "The Vesta range: washer, oven, dryer - three product lines, one promise.",
};

const FACTORY = {
  title: "The factory",
  para: "Every Vesta machine comes out of the company's own plant - forty years of engineering on one assembly line, designed from the first screw to be serviceable in a customer's kitchen.",
  asset: "vesta/factory",
  caption: "Vesta's assembly line - forty years of machines built to be repaired, not replaced.",
};

const REPAIR = {
  title: "The certified repair network",
  blurb:
    "120 independent repair companies, certified by Vesta through training, yearly audits, and a signed partner contract. Each carries the Vesta Certified Repair Company badge: when a certified technician rings your doorbell, Vesta's forty-year reputation rings with them.",
  badgeLabel: "Vesta Certified",
  badgeFullName: "Vesta Certified Repair Company",
  stats: ["120 partner companies", "40+ countries", "Yearly audits"],
  partners: [
    { name: "Zenith Repairs", city: "Geneva" },
    { name: "Alpine Fix", city: "Zürich" },
    { name: "Nordlicht Repair", city: "Hamburg" },
    { name: "Repair & Sons", city: "Manchester" },
    { name: "Casa Rápida", city: "Madrid" },
    { name: "Domus Service", city: "Milan" },
    { name: "Atelier Volt", city: "Lyon" },
    { name: "Bluewave Service", city: "Lisbon" },
  ],
  closing:
    "The badge is real: training, audits, contracts stand behind it. But it lives on van doors, letterheads, and PDF certificates: online, anyone can print one, and there is no way to tell a certified partner from an impostor.",
};

const SERVICES = {
  title: "Online services",
  intro:
    "Beyond the machines, Vesta is online every day: customers ask for help, employees sign in, partners order parts and file warranty claims. Three services, all owned and operated by the company itself.",
  hubName: "Vesta Appliances",
  hubSub: "owns & operates all three",
  services: [
    {
      icon: "bot" as const,
      name: "Agentic Support",
      desc: "Help with your machine: troubleshooting, warranty, spare parts.",
    },
    {
      icon: "badge" as const,
      name: "Employee badges",
      desc: "Company IDs for Vesta's ~200 staff members.",
    },
    {
      icon: "key" as const,
      name: "Staff & partner portal",
      desc: "Orders, manuals, and warranty claims for staff and repair partners.",
    },
  ],
};

// ---------------------------------------------------------------- icons
const WRENCH_PATH =
  "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z";

const ServiceIcon: React.FC<{ icon: "bot" | "badge" | "key" }> = ({ icon }) => {
  const stroke = { fill: "none", stroke: "#1d4ed8", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (icon === "bot")
    return (
      <svg width={34} height={34} viewBox="0 0 24 24" aria-hidden>
        <path d="M12 8V4H8" {...stroke} />
        <rect width="16" height="12" x="4" y="8" rx="2" {...stroke} />
        <path d="M2 14h2 M20 14h2 M15 13v2 M9 13v2" {...stroke} />
      </svg>
    );
  if (icon === "badge")
    return (
      <svg width={34} height={34} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="9" {...stroke} />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" {...stroke} />
      </svg>
    );
  return (
    <svg width={34} height={34} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
        {...stroke}
      />
      <circle cx="16.5" cy="7.5" r="1.1" fill="#1d4ed8" />
    </svg>
  );
};

// ------------------------------------------------------------- scaffolding
export const ChapterHeader: React.FC<{
  title: string;
  at: number;
  kicker?: string;
  size?: number;
}> = ({ title, at, kicker = "1 · THE COMPANY", size = 74 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - fps * at, fps, config: { damping: 200 } });
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
      <div
        style={{
          fontFamily: theme.mono,
          fontSize: 26,
          letterSpacing: 4,
          color: theme.violet,
          marginBottom: 14,
        }}
      >
        {kicker}
      </div>
      <div
        style={{
          fontFamily: theme.display,
          fontSize: size,
          fontWeight: 700,
          color: theme.ink,
          letterSpacing: "-0.02em",
          lineHeight: 1.12,
        }}
      >
        {title}
      </div>
    </div>
  );
};

export const Para: React.FC<{
  children: React.ReactNode;
  at: number;
  width?: number;
  italic?: boolean;
  size?: number;
}> = ({ children, at, width = 640, italic = false, size = 27 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(frame, [fps * at, fps * (at + 0.5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        marginTop: 26,
        maxWidth: width,
        fontFamily: theme.font,
        fontSize: size,
        lineHeight: 1.6,
        color: "#475569",
        fontStyle: italic ? "italic" : "normal",
        opacity: o,
      }}
    >
      {children}
    </div>
  );
};

const Photo: React.FC<{ asset: string; caption: string; at: number; wide?: boolean }> = ({
  asset,
  caption,
  at,
  wide = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - fps * at, fps, config: { damping: 200 } });
  const src = useAsset(asset);
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * 40}px)` }}>
      <div
        style={{
          width: wide ? 980 : 920,
          height: wide ? 545 : 620,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 30px 80px rgba(15,23,42,0.18)",
          background: theme.card,
        }}
      >
        {src ? <AssetImg id={asset} /> : <Placeholder id={asset} />}
      </div>
      <div
        style={{
          marginTop: 16,
          textAlign: "center",
          fontFamily: theme.font,
          fontSize: 20,
          color: theme.muted,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

/* Product line and factory: header top-left, photograph center stage. */
const FigureChapter: React.FC<{ data: typeof PRODUCT_LINE }> = ({ data }) => (
  <AbsoluteFill style={{ background: theme.surface }}>
    <div style={{ position: "absolute", left: 120, top: 80, width: 900 }}>
      <ChapterHeader title={data.title} at={0.2} />
    </div>
    <div style={{ position: "absolute", left: 960, top: 268, transform: "translateX(-50%)" }}>
      <Photo asset={data.asset} caption={data.caption} at={0.6} wide />
    </div>
  </AbsoluteFill>
);

/* The certified repair network: header, the page's hub-and-spokes diagram
   center stage, the stats and badge chips beneath it. */
const RepairChapter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = useAsset("vesta/emblem");
  const pop = (d: number) =>
    spring({ frame: frame - fps * d, fps, config: { damping: 200 } });
  const cx = 380;
  const cy = 210;
  const Rx = 270;
  const Ry = 140;
  const n = REPAIR.partners.length;
  const badgeW = 112;
  const chipsIn = pop(4.0);
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 1150 }}>
        <ChapterHeader title={REPAIR.title} at={0.2} />
      </div>

      {/* The page's RepairNetworkDiagram, partner by partner */}
      <div style={{ position: "absolute", left: 960, top: 175, transform: "translateX(-50%)" }}>
        <svg width={1000} height={606} viewBox="40 28 680 412" aria-hidden>
          {REPAIR.partners.map((p, i) => {
            const a = (i / n) * 2 * Math.PI - Math.PI / 2;
            const x = cx + Rx * Math.cos(a);
            const y = cy + Ry * Math.sin(a);
            const dx = x - cx;
            const dy = y - cy;
            const len = Math.hypot(dx, dy) || 1;
            const ux = dx / len;
            const uy = dy / len;
            const o = pop(1.0 + i * 0.28);
            return (
              <g key={p.name} opacity={o}>
                <line
                  x1={cx + ux * 62}
                  y1={cy + uy * 62}
                  x2={x - ux * 32}
                  y2={y - uy * 32}
                  stroke="#d1d5db"
                  strokeWidth={1.5}
                />
                <circle cx={x} cy={y} r={31} fill="#eff6ff" opacity={0.7} />
                <circle cx={x} cy={y} r={24} fill="#ffffff" stroke="#2563eb" strokeWidth={1.7} />
                <g transform={`translate(${x - 10}, ${y - 10}) scale(0.83)`}>
                  <path
                    d={WRENCH_PATH}
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <text x={x} y={y + 43} textAnchor="middle" fontSize={12.5} fontWeight={700} fill="#111827" fontFamily={theme.font}>
                  {p.name}
                </text>
                <text x={x} y={y + 57} textAnchor="middle" fontSize={10.5} fill="#6b7280" fontFamily={theme.font}>
                  {p.city}
                </text>
                <rect
                  x={x - badgeW / 2}
                  y={y + 63}
                  width={badgeW}
                  height={17}
                  rx={8.5}
                  fill="#ecfdf5"
                  stroke="#059669"
                  strokeOpacity={0.5}
                />
                <path
                  d={`M ${x - badgeW / 2 + 10} ${y + 71.5} l 2.6 2.6 l 4.6 -5`}
                  stroke="#047857"
                  strokeWidth={1.6}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text x={x + 6} y={y + 75} textAnchor="middle" fontSize={9} fontWeight={600} fill="#047857" fontFamily={theme.font}>
                  {REPAIR.badgeLabel}
                </text>
              </g>
            );
          })}
          {/* Hub: Vesta */}
          <g opacity={pop(0.6)}>
            <circle cx={cx} cy={cy} r={56} fill="#f5f3ff" opacity={0.8} />
            <circle cx={cx} cy={cy} r={48} fill="#ffffff" stroke="#7c3aed" strokeWidth={2} />
            {logo ? (
              <image href={logo} x={cx - 29} y={cy - 29} width={58} height={58} />
            ) : (
              <text x={cx} y={cy + 6} textAnchor="middle" fontSize={16} fontWeight={800} fill="#7c3aed" fontFamily={theme.font}>
                V
              </text>
            )}
            <text x={cx} y={cy + 70} textAnchor="middle" fontSize={13} fontWeight={700} fill="#111827" fontFamily={theme.font}>
              Vesta Appliances
            </text>
          </g>
        </svg>
        <div
          style={{
            marginTop: 6,
            marginLeft: -250,
            width: 1500,
            display: "flex",
            justifyContent: "center",
            gap: 12,
            whiteSpace: "nowrap",
            opacity: chipsIn,
          }}
        >
          {REPAIR.stats.map((st) => (
            <span
              key={st}
              style={{
                fontFamily: theme.font,
                fontSize: 19,
                fontWeight: 600,
                color: theme.muted,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 999,
                padding: "7px 18px",
              }}
            >
              {st}
            </span>
          ))}
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: theme.font,
              fontSize: 19,
              fontWeight: 600,
              color: "#047857",
              background: "#ecfdf5",
              border: "1.5px solid #a7f3d0",
              borderRadius: 999,
              padding: "7px 18px",
            }}
          >
            <svg width={16} height={16} viewBox="0 0 20 20" aria-hidden>
              <path
                d="M4 10.5 L8 14.5 L16 5.5"
                stroke="#047857"
                strokeWidth="2.4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {REPAIR.badgeFullName} badge
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* Online services: header, then the page's ownership chart center stage. */
const ServicesChapter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = useAsset("vesta/emblem");
  const pop = (d: number) =>
    spring({ frame: frame - fps * d, fps, config: { damping: 200 } });
  const hubIn = pop(0.6);
  const centers = [480, 960, 1440];
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 1000 }}>
        <ChapterHeader title={SERVICES.title} at={0.2} />
      </div>
      {/* hub card */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 330,
          transform: `translateX(-50%) scale(${hubIn})`,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: theme.card,
          border: "1.5px solid #e2e8f0",
          borderRadius: 20,
          boxShadow: "0 14px 40px rgba(15,23,42,0.1)",
          padding: "16px 26px",
        }}
      >
        <div style={{ width: 64, height: 64 }}>
          {logo ? <AssetImg id="vesta/emblem" cover={false} /> : <Placeholder id="vesta/emblem" />}
        </div>
        <div style={{ fontFamily: theme.font }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: theme.ink }}>{SERVICES.hubName}</div>
          <div style={{ fontSize: 19, color: theme.muted }}>{SERVICES.hubSub}</div>
        </div>
      </div>
      {/* connectors */}
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <g opacity={pop(0.85)} stroke="#cbd5e1" strokeWidth={2.5}>
          <line x1={960} y1={438} x2={960} y2={488} />
          <line x1={centers[0]} y1={488} x2={centers[2]} y2={488} />
          {centers.map((x) => (
            <line key={x} x1={x} y1={488} x2={x} y2={526} />
          ))}
        </g>
      </svg>
      {/* the three services */}
      {SERVICES.services.map((sv, i) => {
        const s = pop(1.0 + i * 0.25);
        return (
          <div
            key={sv.name}
            style={{
              position: "absolute",
              left: centers[i],
              top: 526,
              width: 430,
              transform: `translateX(-50%) translateY(${(1 - s) * 30}px)`,
              opacity: s,
              background: theme.card,
              border: "1.5px solid #e2e8f0",
              borderRadius: 20,
              boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
              padding: "26px 28px",
              textAlign: "center",
              fontFamily: theme.font,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                width: 60,
                height: 60,
                borderRadius: 16,
                background: "#eff6ff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ServiceIcon icon={sv.icon} />
            </span>
            <div style={{ marginTop: 14, fontSize: 25, fontWeight: 700, color: theme.ink }}>
              {sv.name}
            </div>
            <div style={{ marginTop: 8, fontSize: 20, lineHeight: 1.5, color: theme.muted }}>
              {sv.desc}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

export const VestaCompany: React.FC<{ part: CompanyPart }> = ({ part }) => {
  switch (part) {
    case "product-line":
      return <FigureChapter data={PRODUCT_LINE} />;
    case "factory":
      return <FigureChapter data={FACTORY} />;
    case "repair-network":
      return <RepairChapter />;
    case "services":
      return <ServicesChapter />;
  }
};
