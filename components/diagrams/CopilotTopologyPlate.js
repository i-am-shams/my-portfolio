import Plate from "./plate";
import {
  GroupBox,
  Actor,
  Instance,
  Queue,
  Router,
  Store,
  External,
  Arrow,
  Anchor,
  NodeLabel,
} from "./primitives";

export default function CopilotTopologyPlate({ title, desc, aphorism }) {
  return (
    <Plate title={title} desc={desc} aphorism={aphorism}>
      <GroupBox x={170} y={140} w={800} h={320} />
      <Actor cx={110} cy={180} r={24} />
      <Instance cx={258} cy={180} w={92} h={36} />
      <Instance cx={258} cy={290} w={92} h={38} />
      <Instance cx={400} cy={290} w={78} h={38} />
      <Queue cx={524} cy={290} w={56} h={32} />
      <Instance cx={650} cy={290} w={84} h={38} />
      <Store cx={800} top={266} bottom={314} rx={30} ry={10} />
      <Router cx={650} cy={400} half={30} />
      <Instance cx={470} cy={400} w={104} h={38} />
      <Instance cx={860} cy={400} w={70} h={38} />
      <External cx={1075} cy={180} w={90} h={38} />
      <Store cx={470} top={478} bottom={512} rx={30} ry={10} />
      <External cx={860} cy={496} w={90} h={38} />
      <Arrow x1={134} y1={180} x2={212} y2={180} label="https" />
      <Arrow x1={258} y1={198} x2={258} y2={271} />
      <Arrow x1={304} y1={290} x2={361} y2={290} />
      <Arrow x1={439} y1={290} x2={496} y2={290} label="publish" />
      <Arrow x1={552} y1={290} x2={608} y2={290} label="consume" />
      <Arrow x1={692} y1={290} x2={770} y2={290} label="ef core" />
      <Arrow x1={680} y1={271} x2={1030} y2={192} label="scores the match" labelDx={-40} labelDy={-12} />
      <Arrow x1={650} y1={309} x2={650} y2={370} label="publish once" labelDx={62} labelDy={22} />
      <Arrow x1={620} y1={400} x2={522} y2={400} label="own queue" labelDy={-14} />
      <Arrow x1={470} y1={419} x2={470} y2={468} label="write doc" labelDx={-56} labelDy={26} />
      <Arrow x1={860} y1={419} x2={860} y2={477} label="metrics + logs" labelDx={-92} labelDy={-16} />
      <Arrow x1={361} y1={280} x2={140} y2={200} dashed label="signalr push" labelDx={90} labelDy={16} />
      <Anchor x={570} y={130}>
        one VPS, docker compose
      </Anchor>
      <NodeLabel x={110} y={226}>
        browser
      </NodeLabel>
      <NodeLabel x={258} y={220}>
        nginx · shared
      </NodeLabel>
      <NodeLabel x={258} y={331}>
        frontend
      </NodeLabel>
      <NodeLabel x={400} y={331}>
        api
      </NodeLabel>
      <NodeLabel x={524} y={328}>
        match-requests
      </NodeLabel>
      <NodeLabel x={650} y={331}>
        worker
      </NodeLabel>
      <NodeLabel x={800} y={346}>
        postgres
      </NodeLabel>
      <NodeLabel x={650} y={452}>
        fanout exchange
      </NodeLabel>
      <NodeLabel x={470} y={441}>
        notifications
      </NodeLabel>
      <NodeLabel x={860} y={441}>
        alloy
      </NodeLabel>
      <NodeLabel x={1075} y={221}>
        gemini
      </NodeLabel>
      <NodeLabel x={470} y={536}>
        mongo atlas
      </NodeLabel>
      <NodeLabel x={860} y={537}>
        grafana cloud
      </NodeLabel>
    </Plate>
  );
}
