import Plate from "./plate";
import {
  GroupBox,
  Queue,
  Instance,
  Arrow,
  NodeLabel,
  Anchor,
  Transform,
  Router,
  Store,
} from "./primitives";

export default function FanoutPlate({ title, desc, aphorism }) {
  return (
    <Plate title={title} desc={desc} aphorism={aphorism}>
      <GroupBox x={110} y={205} w={230} h={210} />
      <Queue cx={170} cy={310} w={54} h={34} />
      <Instance cx={275} cy={268} w={62} h={44} />
      <Instance cx={275} cy={352} w={62} h={44} />
      <Arrow x1={197} y1={310} x2={244} y2={270} label="½" labelDy={-6} />
      <Arrow x1={197} y1={310} x2={244} y2={350} label="½" labelDy={14} />
      <NodeLabel x={170} y={366}>
        queue
      </NodeLabel>
      <Anchor x={225} y={443}>
        round-robin
      </Anchor>
      <Transform x1={375} x2={554} y={320} verb="fan out" />
      <Router cx={600} cy={320} half={38} />
      <Instance cx={790} cy={240} w={68} h={46} />
      <Instance cx={790} cy={400} w={68} h={46} />
      <Store cx={985} top={212} bottom={268} />
      <Store cx={985} top={372} bottom={428} />
      <Arrow x1={627} y1={297} x2={756} y2={240} />
      <Arrow x1={627} y1={343} x2={756} y2={400} />
      <Arrow x1={824} y1={240} x2={951} y2={240} />
      <Arrow x1={824} y1={400} x2={951} y2={400} />
      <NodeLabel x={600} y={380}>
        exchange
      </NodeLabel>
      <NodeLabel x={790} y={285}>
        api
      </NodeLabel>
      <NodeLabel x={790} y={445}>
        notifications
      </NodeLabel>
      <NodeLabel x={985} y={292}>
        postgres
      </NodeLabel>
      <NodeLabel x={985} y={452}>
        mongo
      </NodeLabel>
    </Plate>
  );
}
