// The playground TrustCard, as the journey's per-node detail panel: derived
// from the scene graph exactly like the page's NodeDetail (credentials,
// accreditations, notes, verified state at the current stage).
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { shortDid } from "../journey/did";
import {
  nodeLabelAt,
  stageIndex,
  visibleAt,
  type SceneGraph,
} from "../journey/scene-graph";
import { theme } from "../theme";
import { TONE } from "./JourneyDiagram";

const Tick: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="11" fill="none" stroke="#10b981" strokeWidth="2" />
    <path d="M7 12.5 L10.5 16 L17 8.5" stroke="#10b981" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VeranaTile: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
    <defs>
      <linearGradient id="jtp-tile" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#763EF0" />
        <stop offset="100%" stopColor="#9F7AEA" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="10" fill="url(#jtp-tile)" />
    <path d="M14 15 L24 33 L34 15 L29.5 15 L24 25.5 L18.5 15 Z" fill="#fff" />
  </svg>
);

export type PanelOverride = {
  name: string;
  did: string;
  serviceType: string;
  service: { issuedBy: string; ecosystem: string };
  organization: { orgName: string; issuedBy: string; ecosystem: string };
  trusted: boolean;
  impostor: boolean;
  note: string;
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: 1.5,
      textTransform: "uppercase",
      color: theme.muted,
    }}
  >
    {children}
  </div>
);

export const JourneyTrustPanel: React.FC<{
  graph: SceneGraph;
  stage: string;
  nodeId: string;
  /** Seconds into the shot when this panel (re)appears. */
  at: number;
  width?: number;
  override?: PanelOverride;
}> = ({ graph, stage, nodeId, at, width = 470, override }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - fps * at, fps, config: { damping: 200 } });
  const idx = stageIndex(graph, stage);
  const node = graph.nodes.find((n) => n.id === nodeId);
  if (!node && !override) return null;

  let data: {
    name: string;
    did?: string;
    serviceType?: string;
    service?: { issuedBy: string; ecosystem?: string };
    organization?: { orgName: string; issuedBy: string; ecosystem?: string; inherited?: boolean };
    trusted: boolean;
    impostor: boolean;
    others: { name: string; issuedBy: string; ecosystem?: string }[];
    holds: { name: string; issuedBy: string; ecosystem?: string }[];
    accreditations: { role: string; schema: string; context: string }[];
    note?: string;
    resolvedNote?: string;
  };

  if (override) {
    data = {
      name: override.name,
      did: override.did,
      serviceType: override.serviceType,
      service: override.service,
      organization: override.organization,
      trusted: override.trusted,
      impostor: override.impostor,
      others: [],
      holds: [],
      accreditations: [],
      note: override.note,
    };
  } else {
    const n = node!;
    const { label } = nodeLabelAt(graph, n, stage);
    const creds = (graph.credentials[nodeId] ?? []).filter((cr) => visibleAt(graph, cr, stage));
    const svc = creds.find((c) => c.name === "ECS-Service");
    const org = creds.find((c) => c.name === "ECS-Organization");
    const others = creds.filter((c) => c.name !== "ECS-Service" && c.name !== "ECS-Organization");
    const isPerson = n.person === true;
    const verified = !!n.verifiedAt && stageIndex(graph, n.verifiedAt) <= idx;
    data = {
      name: label ?? nodeId,
      did: verified || svc || org ? n.did : undefined,
      serviceType: n.serviceType,
      service: svc ? { issuedBy: svc.issuedBy, ecosystem: svc.ecosystem } : undefined,
      organization: org
        ? { orgName: n.operator ?? label ?? nodeId, issuedBy: org.issuedBy, ecosystem: org.ecosystem, inherited: org.inherited }
        : undefined,
      trusted: verified && !!svc && !!org,
      impostor: n.dashed === true,
      others: isPerson ? [] : others,
      holds: isPerson ? creds : [],
      accreditations: (graph.accreditations[nodeId] ?? [])
        .filter((a) => stageIndex(graph, a.appears) <= idx)
        .map(({ role, schema, context }) => ({ role, schema, context })),
      note:
        graph.nodeNotes[nodeId] && (creds.length === 0 || n.noteAlways)
          ? graph.nodeNotes[nodeId]
          : undefined,
      resolvedNote: verified && n.did ? graph.verifiedNote : undefined,
    };
  }

  return (
    <div
      style={{
        width,
        background: theme.card,
        borderRadius: 18,
        border: "1.5px solid #e2e8f0",
        boxShadow: "0 24px 60px rgba(15,23,42,0.14)",
        padding: "22px 26px",
        fontFamily: theme.font,
        opacity: s,
        transform: `translateY(${(1 - s) * 30}px)`,
      }}
    >
      {/* header: name + DID */}
      <div style={{ fontSize: 24, fontWeight: 700, color: theme.ink }}>{data.name}</div>
      {data.did ? (
        <div
          style={{
            marginTop: 8,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: theme.mono,
            fontSize: 13.5,
            color: theme.muted,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "#10b981", flexShrink: 0 }} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {shortDid(data.did)}
          </span>
        </div>
      ) : null}

      {data.service || data.serviceType ? (
        <div style={{ marginTop: 16 }}>
          <Label>Service</Label>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <Tick />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: theme.ink }}>
                {data.serviceType ?? "Service"}
              </div>
              {data.service ? (
                <div style={{ fontSize: 15.5, color: theme.muted }}>
                  ECS-Service · {data.service.issuedBy}
                  {data.service.ecosystem ? ` · ${data.service.ecosystem}` : ""}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {data.organization ? (
        <div style={{ marginTop: 14 }}>
          <Label>Operated by</Label>
          <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
            <Tick />
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: theme.ink }}>
                {data.organization.orgName}
              </div>
              <div style={{ fontSize: 15.5, color: theme.muted }}>
                ECS-Organization · {data.organization.issuedBy}
                {data.organization.ecosystem ? ` · ${data.organization.ecosystem}` : ""}
                {data.organization.inherited ? " · inherited from the anchor" : ""}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {data.trusted ? (
        <div style={{ marginTop: 16 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "2px solid #10b981",
              background: "#ecfdf5",
              borderRadius: 999,
              padding: "7px 16px",
            }}
          >
            <VeranaTile />
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: 2, color: "#047857" }}>
              TRUSTED
            </span>
          </span>
          {data.resolvedNote ? (
            <div style={{ marginTop: 8, fontSize: 14.5, color: theme.muted }}>{data.resolvedNote}</div>
          ) : null}
        </div>
      ) : null}

      {data.others.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <Label>Also presents</Label>
          {data.others.map((c) => (
            <div key={c.name} style={{ marginTop: 6, fontSize: 16, color: "#475569" }}>
              <b style={{ color: "#b45309" }}>{c.name}</b> · {c.issuedBy}
              {c.ecosystem ? ` · ${c.ecosystem}` : ""}
            </div>
          ))}
        </div>
      ) : null}

      {data.holds.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <Label>Holds</Label>
          {data.holds.map((c) => (
            <div key={c.name} style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 8, fontSize: 16, color: "#475569" }}>
              <Tick size={20} />
              <span>
                <b style={{ color: theme.ink }}>{c.name}</b> · {c.issuedBy}
                {c.ecosystem ? ` · ${c.ecosystem}` : ""}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {data.accreditations.length > 0 ? (
        <div style={{ marginTop: 14 }}>
          <Label>Accreditations</Label>
          {data.accreditations.map((a) => (
            <div key={`${a.role}-${a.schema}`} style={{ marginTop: 7, display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  fontFamily: theme.mono,
                  fontSize: 12.5,
                  letterSpacing: 1,
                  color: a.role === "ISSUER" ? TONE.violet.pillText : TONE.blue.pillText,
                  background: a.role === "ISSUER" ? TONE.violet.pill : TONE.blue.pill,
                  border: `1.5px solid ${a.role === "ISSUER" ? "#ddd6fe" : "#bfdbfe"}`,
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                {a.role}
              </span>
              <span style={{ fontSize: 16, color: "#475569" }}>
                <b style={{ color: theme.ink }}>{a.schema}</b> · {a.context}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {data.note ? (
        <div
          style={{
            marginTop: 14,
            fontSize: 15.5,
            lineHeight: 1.5,
            color: data.impostor ? "#b91c1c" : theme.muted,
            background: data.impostor ? "#fef2f2" : "#f8fafc",
            border: `1.5px solid ${data.impostor ? "#fecaca" : "#e2e8f0"}`,
            borderRadius: 12,
            padding: "12px 16px",
          }}
        >
          {data.note}
        </div>
      ) : null}
    </div>
  );
};
