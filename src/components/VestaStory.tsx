// S-2..S-6: the Vesta story between "The Company" and the captures, with
// the playground page's exact content, simplified per the video spec:
//   S-2 vesta-problems : "The problems, and what they cost the brand",
//                        titles only + the van + the root cause.
//   S-4 vesta-needs    : "What Marc needs", the five-item checklist.
//   S-5 vesta-join     : the two ecosystems Vesta joins (VO carries the why).
//   S-6 vesta-build-eco: the ecosystem Vesta builds (Vesta Repair Network).
import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AssetImg, Placeholder, useAsset } from "../lib/assets";
import { theme } from "../theme";
import { ChapterHeader } from "./VestaCompany";

const pop = (frame: number, fps: number, d: number) =>
  spring({ frame: frame - fps * d, fps, config: { damping: 200 } });

// ---------------------------------------------------------------- icons
const Stroke = {
  fill: "none",
  strokeWidth: 1.9,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ProblemIcon: React.FC<{ icon: "phone" | "lock" | "files" | "van"; color?: string }> = ({
  icon,
  color = "#dc2626",
}) => {
  const s = { ...Stroke, stroke: color } as const;
  if (icon === "phone")
    return (
      <svg width={36} height={36} viewBox="0 0 24 24" aria-hidden>
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
          {...s}
        />
      </svg>
    );
  if (icon === "lock")
    return (
      <svg width={36} height={36} viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="11" width="18" height="11" rx="2" {...s} />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" {...s} />
      </svg>
    );
  if (icon === "files")
    return (
      <svg width={36} height={36} viewBox="0 0 24 24" aria-hidden>
        <path d="M15 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" {...s} />
        <path d="M15 2v6h6 M3 7v13a2 2 0 0 0 2 2" {...s} />
      </svg>
    );
  return (
    <svg width={36} height={36} viewBox="0 0 24 24" aria-hidden>
      <path d="M2 17V7a1 1 0 0 1 1-1h11v11" {...s} />
      <path d="M14 9h4l4 4v4h-2" {...s} />
      <circle cx="6.5" cy="17.5" r="2" {...s} />
      <circle cx="17.5" cy="17.5" r="2" {...s} />
      <path d="M8.5 17.5h7 M2 17h2.5" {...s} />
    </svg>
  );
};

// ------------------------------------------------- S-2 · the problems
const PROBLEMS = {
  title: "The problems, and what they cost the brand",
  online: [
    { icon: "phone" as const, title: "Fake support lines" },
    { icon: "lock" as const, title: "Password pain" },
    { icon: "files" as const, title: "Paperwork, again and again" },
  ],
  onsite: { icon: "van" as const, title: "Fake “authorized” repairers" },
  rootCause:
    "Online or at the front door, Vesta's word looks exactly like the scammers' word. Nothing can be proven.",
};

export const VestaProblems: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const van = useAsset("vesta/fake-van");
  const rows = [...PROBLEMS.online.map((p) => ({ ...p, tag: "ONLINE" })), { ...PROBLEMS.onsite, tag: "ON SITE" }];
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 860 }}>
        <ChapterHeader title={PROBLEMS.title} at={0.2} size={62} />
        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 18 }}>
          {rows.map((p, i) => {
            const s = pop(frame, fps, 0.7 + i * 0.3);
            return (
              <div
                key={p.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  background: theme.card,
                  border: "1.5px solid #fecaca",
                  borderRadius: 18,
                  padding: "18px 24px",
                  opacity: s,
                  transform: `translateX(${(1 - s) * -40}px)`,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    width: 62,
                    height: 62,
                    borderRadius: 16,
                    background: "#fef2f2",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ProblemIcon icon={p.icon} />
                </span>
                <span style={{ fontFamily: theme.font, fontSize: 28, fontWeight: 700, color: theme.ink }}>
                  {p.title}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: theme.mono,
                    fontSize: 15,
                    letterSpacing: 2,
                    color: "#dc2626",
                  }}
                >
                  {p.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* the impostor van */}
      <div
        style={{
          position: "absolute",
          left: 990,
          top: 220,
          opacity: pop(frame, fps, 1.9),
          transform: `translateY(${(1 - pop(frame, fps, 1.9)) * 40}px)`,
        }}
      >
        <div
          style={{
            width: 810,
            height: 560,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(15,23,42,0.18)",
            background: theme.card,
          }}
        >
          {van ? <AssetImg id="vesta/fake-van" /> : <Placeholder id="vesta/fake-van" />}
        </div>
        <div style={{ marginTop: 14, textAlign: "center", fontFamily: theme.font, fontSize: 20, color: "#dc2626", fontWeight: 600 }}>
          A van Vesta has never heard of, with a printed Vesta panel on the door.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ------------------------------------------------- S-4 · what Marc needs
const NEEDS = {
  title: "What Marc needs",
  intro: "To make every organization and every service verifiable, Marc's list is short:",
  items: [
    { n: 1, tag: "ECS-Organization", title: "Verifiable identities for organizations" },
    { n: 2, tag: "ECS-Service", title: "Verifiable identities for services" },
    { n: 3, tag: "ECS-Badge", title: "Credentials people can hold" },
    { n: 4, tag: "ISO 9001", title: "Certifications as proof, not PDFs" },
    { n: 5, tag: "Vesta Repair Network", title: "Vesta's own rules for its network" },
  ],
};

const MarcIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 0.5);
  const src = useAsset("vesta/cto");
  return (
    <div
      style={{
        marginTop: 22,
        display: "flex",
        alignItems: "center",
        gap: 18,
        opacity: s,
        transform: `translateY(${(1 - s) * 20}px)`,
      }}
    >
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 46,
          overflow: "hidden",
          border: "3px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(15,23,42,0.15)",
          flexShrink: 0,
          background: theme.card,
        }}
      >
        {src ? <AssetImg id="vesta/cto" /> : <Placeholder id="vesta/cto" />}
      </div>
      <div style={{ fontFamily: theme.font, fontSize: 28, color: "#475569" }}>
        <b style={{ color: theme.ink }}>Marc, CTO of Vesta</b>, will make the company
        verifiable.
      </div>
    </div>
  );
};

export const VestaNeeds: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 1400 }}>
        <ChapterHeader title={NEEDS.title} at={0.2} kicker="2 · THE SOLUTION" />
        <MarcIntro />
      </div>
      <div
        style={{
          position: "absolute",
          left: 260,
          right: 260,
          top: 420,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {NEEDS.items.map((it, i) => {
          const s = pop(frame, fps, 1.0 + i * 0.55);
          return (
            <div
              key={it.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 20,
                padding: "20px 30px",
                boxShadow: "0 12px 34px rgba(15,23,42,0.07)",
                opacity: s,
                transform: `translateX(${(1 - s) * -50}px)`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 28,
                  background: theme.gradient,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: theme.display,
                  fontSize: 27,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {it.n}
              </div>
              <div style={{ fontFamily: theme.font, fontSize: 30, fontWeight: 700, color: theme.ink }}>
                {it.title}
              </div>
              <span
                style={{
                  marginLeft: "auto",
                  fontFamily: theme.mono,
                  fontSize: 19,
                  color: theme.violet,
                  background: "#f5f3ff",
                  border: "1.5px solid #ddd6fe",
                  borderRadius: 999,
                  padding: "7px 18px",
                  whiteSpace: "nowrap",
                }}
              >
                {it.tag}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------- S-5 / S-6 · ecosystems: join and build
const LandmarkIcon: React.FC<{ color: string }> = ({ color }) => {
  const s = { ...Stroke, stroke: color } as const;
  return (
    <svg width={44} height={44} viewBox="0 0 24 24" aria-hidden>
      <path d="M3 22h18 M6 18v-7 M10 18v-7 M14 18v-7 M18 18v-7 M12 2 3 7h18z" {...s} />
    </svg>
  );
};

const AwardIcon: React.FC<{ color: string }> = ({ color }) => {
  const s = { ...Stroke, stroke: color } as const;
  return (
    <svg width={44} height={44} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="9" r="6" {...s} />
      <path d="M9 14 L7.5 21 L12 18.5 L16.5 21 L15 14" {...s} />
    </svg>
  );
};

const RoleChip: React.FC<{ children: React.ReactNode; color: string; bg: string; bd: string }> = ({
  children,
  color,
  bg,
  bd,
}) => (
  <span
    style={{
      fontFamily: theme.mono,
      fontSize: 17,
      letterSpacing: 2,
      color,
      background: bg,
      border: `1.5px solid ${bd}`,
      borderRadius: 999,
      padding: "6px 16px",
    }}
  >
    {children}
  </span>
);

export const VestaJoin: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const iso = useAsset("vesta/iso-9001");
  const cards = [
    {
      at: 1.0,
      icon: <LandmarkIcon color={theme.violet} />,
      iconBg: "#f5f3ff",
      name: "Verana ECS Ecosystem",
      label: "the identity card",
      points: ["Recognized KYB, done once", "ECS-Organization · ECS-Service · ECS-Badge"],
    },
    {
      at: 1.5,
      icon: iso ? (
        <div style={{ width: 64, height: 64 }}>
          <AssetImg id="vesta/iso-9001" cover={false} />
        </div>
      ) : (
        <AwardIcon color="#b45309" />
      ),
      iconBg: "#fffbeb",
      name: "ISO Certification Ecosystem",
      label: "(demo) · the certificate becomes proof",
      points: ["The ISO 9001 PDF becomes a credential", "Visible on every Vesta service"],
    },
  ];
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 1150 }}>
        <ChapterHeader title="The ecosystems Vesta wants to join" at={0.2} kicker="3 · THE ECOSYSTEMS" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          right: 120,
          top: 370,
          display: "flex",
          gap: 48,
          justifyContent: "center",
        }}
      >
        {cards.map((c) => {
          const s = pop(frame, fps, c.at);
          return (
            <div
              key={c.name}
              style={{
                width: 780,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 24,
                boxShadow: "0 20px 60px rgba(15,23,42,0.1)",
                padding: "34px 38px",
                opacity: s,
                transform: `translateY(${(1 - s) * 40}px)`,
                fontFamily: theme.font,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <span
                  style={{
                    display: "inline-flex",
                    width: 84,
                    height: 84,
                    borderRadius: 22,
                    background: c.iconBg,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {c.icon}
                </span>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: theme.ink }}>{c.name}</div>
                  <div style={{ fontSize: 21, color: theme.muted }}>{c.label}</div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <RoleChip color="#047857" bg="#ecfdf5" bd="#a7f3d0">
                    HOLDER
                  </RoleChip>
                </div>
              </div>
              <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 14 }}>
                {c.points.map((pt) => (
                  <div key={pt} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <svg width={22} height={22} viewBox="0 0 20 20" aria-hidden>
                      <circle cx="10" cy="10" r="10" fill={theme.green} />
                      <path
                        d="M5.5 10.5 L8.5 13.5 L14.5 7"
                        stroke="#fff"
                        strokeWidth="2.2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ fontSize: 24, color: "#475569" }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const VestaBuildEco: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const logo = useAsset("vesta/emblem");
  const cardIn = pop(frame, fps, 1.2);
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 1400 }}>
        <ChapterHeader title="The ecosystems Vesta wants to build" at={0.2} kicker="3 · THE ECOSYSTEMS" />
      </div>
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 400,
          transform: `translateX(-50%) translateY(${(1 - cardIn) * 40}px)`,
          opacity: cardIn,
          width: 1080,
          background: theme.card,
          border: "1.5px solid #e2e8f0",
          borderRadius: 26,
          boxShadow: "0 24px 70px rgba(15,23,42,0.12)",
          padding: "36px 44px",
          fontFamily: theme.font,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div style={{ width: 84, height: 84, flexShrink: 0 }}>
            {logo ? <AssetImg id="vesta/emblem" cover={false} /> : <Placeholder id="vesta/emblem" />}
          </div>
          <div>
            <div style={{ fontSize: 34, fontWeight: 700, color: theme.ink }}>Vesta Repair Network</div>
            <div style={{ fontSize: 22, color: theme.muted }}>the Authorized Repairer credential</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <RoleChip color={theme.violet} bg="#f5f3ff" bd="#ddd6fe">
              ECOSYSTEM
            </RoleChip>
          </div>
        </div>
        <div style={{ marginTop: 30, display: "flex", gap: 24 }}>
          {[
            {
              at: 2.0,
              title: "Issuance: governed",
              sub: "only Vesta and its subsidiaries issue",
              color: theme.violet,
              bg: "#f5f3ff",
              bd: "#ddd6fe",
            },
            {
              at: 2.35,
              title: "Verification: open",
              sub: "anyone checks, no permission needed",
              color: "#047857",
              bg: "#ecfdf5",
              bd: "#a7f3d0",
            },
            {
              at: 2.7,
              title: "Revocable",
              sub: "a partner that goes rogue is revoked",
              color: "#b45309",
              bg: "#fffbeb",
              bd: "#fde68a",
            },
          ].map((b) => {
            const s = pop(frame, fps, b.at);
            return (
              <div
                key={b.title}
                style={{
                  flex: 1,
                  background: b.bg,
                  border: `1.5px solid ${b.bd}`,
                  borderRadius: 18,
                  padding: "20px 24px",
                  opacity: s,
                  transform: `translateY(${(1 - s) * 24}px)`,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: b.color }}>{b.title}</div>
                <div style={{ marginTop: 6, fontSize: 20, lineHeight: 1.45, color: "#475569" }}>
                  {b.sub}
                </div>
              </div>
            );
          })}
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 23,
            fontStyle: "italic",
            color: "#475569",
            opacity: pop(frame, fps, 3.2),
          }}
        >
          The paper Vesta Certified Repair Company badge from Section 1 becomes verifiable,
          revocable proof.
        </div>
      </div>
    </AbsoluteFill>
  );
};
