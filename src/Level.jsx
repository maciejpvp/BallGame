import { Block } from "./Blocks/Block";
import { boxGeometry, obstacleMaterial } from "./assets";
import { Burger } from "./Burger";
import { TrapBlocks } from "./Utils/generateRandomBlocks";
import { Walls } from "./Walls";
import useGame from "./stores/useGame";

export const Level = ({ trapCount }) => {
  const winBlockPosition = trapCount * 4 + 4;

  return (
    <>
      <Walls length={(trapCount + 2) * 4} />
      <Block type="start" />
      <TrapBlocks
        blockCount={trapCount}
        boxGeometry={boxGeometry}
        obstacleMaterial={obstacleMaterial}
      />

      <Block type="start" position={[0, 0.1, -winBlockPosition]}>
        <Burger scale={0.2} />
      </Block>
    </>
  );
};
