import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useRef, useState } from "react";

export const Limbo = ({ material, geometry }) => {
  const limboRef = useRef();

  const [speed] = useState(
    () => (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1)
  );
  const [startPosition] = useState(() => Math.random() * 3.14);
  const scale = [3, 0.4, 0.4];

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const currentPosition = limboRef.current.translation();
    // console.log(currentPosition);

    limboRef.current.setNextKinematicTranslation(
      new THREE.Vector3(
        currentPosition.x,
        Math.sin(startPosition + time * speed) * 0.7 + 0.905,
        currentPosition.z
      )
    );
  });

  return (
    <RigidBody
      ref={limboRef}
      type="kinematicPosition"
      position-y={scale[1] / 2}
      restitution={0.2}
      friction={0}
    >
      <mesh material={material} geometry={geometry} scale={scale} castShadow />
    </RigidBody>
  );
};
