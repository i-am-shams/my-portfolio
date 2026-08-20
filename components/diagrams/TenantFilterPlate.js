import Plate from "./plate";
import {
  GroupBox,
  CellLabel,
  Anchor,
  Transform,
  Instance,
  Router,
  Store,
  Arrow,
  NodeLabel,
} from "./primitives";

export default function TenantFilterPlate({ title, desc, aphorism }) {
  return (
    <Plate title={title} desc={desc} aphorism={aphorism}>
      <GroupBox x={110} y={215} w={250} h={200} cells={3} />
      <CellLabel x={235} y={254}>
        where clinic_id = ?
      </CellLabel>
      <CellLabel x={235} y={321}>
        where clinic_id = ?
      </CellLabel>
      <CellLabel x={235} y={388} faint>
        where clinic_id = ?
      </CellLabel>
      <Anchor x={235} y={443}>
        every query, by hand
      </Anchor>
      <Transform x1={395} x2={500} y={315} verb="hoist" />
      <Instance cx={585} cy={235} w={80} h={44} />
      <Instance cx={585} cy={320} w={80} h={44} />
      <Instance cx={585} cy={405} w={80} h={44} />
      <Router cx={790} cy={320} half={42} />
      <Store cx={985} top={285} bottom={355} rx={36} ry={12} />
      <Arrow x1={625} y1={235} x2={750} y2={300} />
      <Arrow x1={625} y1={320} x2={746} y2={320} />
      <Arrow x1={625} y1={405} x2={750} y2={340} />
      <Arrow x1={832} y1={320} x2={947} y2={320} />
      <NodeLabel x={585} y={279}>
        appointments
      </NodeLabel>
      <NodeLabel x={585} y={364}>
        billing
      </NodeLabel>
      <NodeLabel x={585} y={449}>
        charting
      </NodeLabel>
      <NodeLabel x={790} y={384}>
        global filter
      </NodeLabel>
      <NodeLabel x={985} y={392}>
        postgres
      </NodeLabel>
    </Plate>
  );
}
