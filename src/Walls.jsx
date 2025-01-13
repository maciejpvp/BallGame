import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { boxGeometry, wallMaterial } from "./assets";

export const Walls = ({ length }) => {
  const sideWallsPositionZ = -(length / 2) + 2;
  const wallHeight = 3;

  return (
    <>
      {/* Right Wall */}
      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh
          castShadow
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[1, wallHeight, length]}
          position-z={sideWallsPositionZ}
          position-y={1.5}
          position-x={2.5}
        />
        {/* Left Wall */}
        <mesh
          receiveShadow
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[1, wallHeight, length]}
          position-z={sideWallsPositionZ}
          position-y={1.5}
          position-x={-2.5}
        />
        {/* Front Wall */}
        <mesh
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, wallHeight, 1]}
          position-z={-length + wallHeight / 2}
          position-y={1.5}
        />
      </RigidBody>
      {/* Floor */}
      <CuboidCollider
        args={[2, 0.2, length / 2]}
        position={[0, -0.2, sideWallsPositionZ]}
        restitution={0.2}
        friction={1}
      />
    </>
  );
};
