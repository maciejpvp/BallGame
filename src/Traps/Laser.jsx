import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useRef } from "react";

export const Laser = ({
  material,
  geometry,
  startPosition,
  position,
  moving = true,
  speed = 1,
  width = 3.9,
  range = 0.7,
}) => {
  const LaserRef = useRef();

  const scale = [width, 0.1, 0.1];

  useFrame((state, delta) => {
    const time = moving ? state.clock.getElapsedTime() : 1;

    const currentPosition = LaserRef.current.translation();

    LaserRef.current.setNextKinematicTranslation(
      new THREE.Vector3(
        currentPosition.x,
        position[1] +
          Math.sin(startPosition + time * speed) * range +
          (range + 0.1),
        currentPosition.z,
      ),
    );
  });

  return (
    <RigidBody
      ref={LaserRef}
      type="kinematicPosition"
      position={position}
      position-y={scale[1] / 2}
      restitution={0.2}
      friction={0}
      //userData set to 1 means object kill player if touches
      userData={1}
    >
      <mesh material={material} geometry={geometry} scale={scale} castShadow />
    </RigidBody>
  );
};
