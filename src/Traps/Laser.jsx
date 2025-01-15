import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useRef, useState } from "react";

export const Laser = ({
  material,
  geometry,
  startPosition,
  position,
  speed = 1,
}) => {
  const LaserRef = useRef();

  const scale = [3.5, 0.1, 0.1];

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const currentPosition = LaserRef.current.translation();

    LaserRef.current.setNextKinematicTranslation(
      new THREE.Vector3(
        currentPosition.x,
        Math.sin(startPosition + time * speed) * 0.7 + 0.905,
        currentPosition.z
      )
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
