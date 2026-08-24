// §3 Marc's journey: one shot per page subsection. The section title stays
// put across the section's steps; each step shows its title, the exact scene
// graph at its stage with the targeted selection ringed, and the selected
// node's Proof of Trust. The narration is simplified lower-third voice-over
// text (shot.lines); the selection moves mid-shot, aligned with the VO.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { VESTA_SCENES } from "../journey/scenes";
import type { JourneyStepVisual } from "../shots/types";
import { theme } from "../theme";
import { ChapterHeader } from "./VestaCompany";
import { JourneyDiagram } from "./JourneyDiagram";
import { JourneyTrustPanel, PanelOverride } from "./JourneyTrustPanel";

// The special Umbra card of step 3.8-umbra, authored on the page rather than
// derived from the graph (content.ts → trustCard).
const UMBRA_OVERRIDE: PanelOverride = {
  name: "Umbra Repairs (demo)",
  did: "did:webvh:umbra...:umbra-repairs.playground.testnet.verana.network",
  serviceType: "Repair service (demo)",
  service: { issuedBy: "Self-issued (accredited)", ecosystem: "Verana ECS Ecosystem" },
  organization: {
    orgName: "Umbra Repairs (demo)",
    issuedBy: "Helvetia Trust Services (demo)",
    ecosystem: "Verana ECS Ecosystem",
  },
  trusted: true,
  impostor: true,
  note: "It does not present the required Authorized Repairer credential - only the Vesta Repair Network issues it, and it never accredited Umbra. Certified organization, wrong network: its badges are refused at the Vesta portal, and no Vesta seal appears at the door.",
};

export const VestaJourney: React.FC<{ data: JourneyStepVisual }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const graph = VESTA_SCENES;
  // Active selection: the last select whose time has come.
  const active = [...data.selects].reverse().find((s) => t >= s.at) ?? data.selects[0];
  const umbraDid = graph.nodes.find((n) => n.id === "umbra")?.did;
  const override = data.umbraOverride
    ? { ...UMBRA_OVERRIDE, did: umbraDid ?? UMBRA_OVERRIDE.did }
    : undefined;
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      {/* section (persistent) + step, top-left, large */}
      <div style={{ position: "absolute", left: 110, top: 78, width: 920 }}>
        <ChapterHeader title={data.sectionTitle} at={0.15} kicker={data.sectionKicker} size={64} />
        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: theme.mono,
              fontSize: 22,
              color: theme.violet,
              background: "#f5f3ff",
              border: "1.5px solid #ddd6fe",
              borderRadius: 8,
              padding: "6px 14px",
              flexShrink: 0,
            }}
          >
            {data.stepId}
          </span>
          <span style={{ fontFamily: theme.font, fontSize: 38, fontWeight: 700, color: theme.ink, lineHeight: 1.2 }}>
            {data.stepTitle}
          </span>
        </div>
      </div>

      {data.noDiagram ? (
        <div
          style={{
            position: "absolute",
            left: 1160,
            top: 0,
            height: 1080,
            display: "flex",
            alignItems: "center",
          }}
        >
          <JourneyTrustPanel
            graph={graph}
            stage={data.stage}
            nodeId={active.node}
            at={active.at}
            width={620}
            override={override}
          />
        </div>
      ) : (
        <>
          {/* the diagram, page-exact, center stage */}
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 350,
              width: 1330,
              height: 540,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <JourneyDiagram
              graph={graph}
              stage={data.stage}
              selected={active.node}
              width={900}
              maxHeight={560}
            />
          </div>
          {/* the selected node's Proof of Trust */}
          <div
            style={{
              position: "absolute",
              left: 1410,
              top: 0,
              height: 1010,
              display: "flex",
              alignItems: "center",
            }}
          >
            <JourneyTrustPanel
              key={`${active.node}-${active.at}`}
              graph={graph}
              stage={data.stage}
              nodeId={active.node}
              at={active.at}
            />
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
