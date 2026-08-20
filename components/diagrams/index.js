import FanoutPlate from "./FanoutPlate";
import TenantFilterPlate from "./TenantFilterPlate";
import ServerPricePlate from "./ServerPricePlate";
import CopilotTopologyPlate from "./CopilotTopologyPlate";

const plates = {
  fanout: FanoutPlate,
  "tenant-filter": TenantFilterPlate,
  "server-price": ServerPricePlate,
  "copilot-topology": CopilotTopologyPlate,
};

/**
 * Resolves a project's `diagram.plate` key to its figure. Throws rather than
 * rendering nothing, so a typo'd key fails `next build` instead of silently
 * leaving a project card with no architecture figure on it.
 */
export default function PlateFigure({ diagram }) {
  const Component = plates[diagram.plate];

  if (!Component) {
    throw new Error(
      `Unknown plate "${diagram.plate}" - register it in components/diagrams/index.js`
    );
  }

  return (
    <Component title={diagram.title} desc={diagram.desc} aphorism={diagram.aphorism} />
  );
}
