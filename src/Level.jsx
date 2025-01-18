import { Block } from "./Blocks/Block";
import { boxGeometry, obstacleMaterial } from "./assets";
import { Burger } from "./Burger";
import { Walls } from "./Walls";
import useGame from "./stores/useGame";
import { Spinner } from "./Traps/Spinner";
import { Laser } from "./Traps/Laser";
import { Axe } from "./Traps/Axe";
import { Floor } from "./Traps/Floor";
import { levels } from "./Levels";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { MovingBlock } from "./Traps/MovingBlock";

export const Level = ({ trapCount, selectedLevelID }) => {
  const winBlockPosition = trapCount * 4 + 4;
  // const selectedLevelID = useGame((state) => state.selectedLevelID);
  const selectedLevel = levels[selectedLevelID];

  return (
    <>
      <Walls length={(trapCount + 2) * 4} />
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[2, 0.1, 2]} position={[0, -0.1, 0]} />
        <Block type="start" />
      </RigidBody>
      {selectedLevel.blocks.map((b, i) => (
        <Block type="trap" key={i} position={[0, 0, -(4 + i * 4)]}>
          {b.objects.map((o, i) => {
            switch (o.type) {
              case "spinner":
                return (
                  <Spinner
                    key={i}
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    position={o.position}
                    scale={o.scale}
                    width={o.width}
                  />
                );

              case "laser":
                return (
                  <Laser
                    key={i}
                    geometry={boxGeometry}
                    material={obstacleMaterial}
                    startPosition={o.startPosition}
                    position={o.position}
                    speed={o.speed}
                  />
                );

              case "platform":
                return (
                  <MovingBlock
                    key={i}
                    position={o.position}
                    startPosition={o.startPosition}
                    reverse={o.reverse}
                  />
                );

              case "floor":
                return <Floor key={i} position={o.position} scale={o.scale} />;

              default:
                return null;
            }
          })}
        </Block>
      ))}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider
          args={[2, 0.1, 2]}
          position={[0, 0, -winBlockPosition]}
        />
        <Block type="start" position={[0, 0.1, -winBlockPosition]}>
          <Burger scale={0.2} />
        </Block>
      </RigidBody>
    </>
  );
};
