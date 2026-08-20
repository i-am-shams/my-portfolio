import Plate from "./plate";
import {
  GroupBox,
  Actor,
  Instance,
  Arrow,
  NodeLabel,
  Anchor,
  Transform,
  Store,
  Cross,
} from "./primitives";

export default function ServerPricePlate({ title, desc, aphorism }) {
  return (
    <Plate title={title} desc={desc} aphorism={aphorism}>
      <GroupBox x={100} y={225} w={290} h={180} />
      <Actor cx={165} cy={315} />
      <Instance cx={322} cy={315} w={68} h={46} />
      <Arrow x1={191} y1={315} x2={288} y2={315} label="total: 499" />
      <NodeLabel x={322} y={360}>
        checkout
      </NodeLabel>
      <Anchor x={245} y={433}>
        client-posted total
      </Anchor>
      <Transform x1={425} x2={530} y={315} verb="recompute" />
      <Actor cx={610} cy={315} />
      <Instance cx={790} cy={315} w={76} h={48} />
      <Store cx={990} top={285} bottom={345} />
      <Arrow x1={636} y1={315} x2={694} y2={315} head={false} label="total: 499" labelDx={-6} labelDy={-14} />
      <Cross cx={706} cy={315} />
      <Arrow x1={954} y1={315} x2={832} y2={315} />
      <NodeLabel x={610} y={366}>
        client
      </NodeLabel>
      <NodeLabel x={790} y={361}>
        checkout
      </NodeLabel>
      <NodeLabel x={790} y={385}>
        total: 449
      </NodeLabel>
      <NodeLabel x={990} y={369}>
        pricing
      </NodeLabel>
    </Plate>
  );
}
