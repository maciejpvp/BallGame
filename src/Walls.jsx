import { CuboidCollider, RigidBody } from "@react-three/rapier";
import {
  boxGeometry,
  floor1Material,
  floor2Material,
  wallMaterial,
} from "./assets";

export const Walls = ({ length }) => {
  const sideWallsPositionZ = -(length / 2) + 2;
  const wallHeight = 5;

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
        position={[0, -1.2, sideWallsPositionZ]}
        restitution={0.2}
        friction={1}
      />
      <mesh
        position={[0, -0.7, sideWallsPositionZ]}
        receiveShadow
        geometry={boxGeometry}
        material={floor2Material}
        scale={[4, 1, length]}
      />
      {/* Backwall */}
      <CuboidCollider
        args={[2, 7, 0.5]}
        position={[0, 0, 1.5]}
        restitution={0.2}
        friction={1}
      />
      {/* Roof */}
      <mesh
        geometry={boxGeometry}
        material={floor1Material}
        scale={[4, 1, length]}
        position-z={sideWallsPositionZ}
        position-y={wallHeight - 1}
      />
    </>
  );
};
