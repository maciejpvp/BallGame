import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useRef, useState } from "react";

export const Spinner = ({ material, geometry }) => {
  const spinnerRef = useRef();

  const [speed] = useState(
    () => (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1)
  );
  const [startPosition] = useState(() => Math.random() * 3.14);
  const scale = [3, 0.4, 0.4];

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const rotation = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, (startPosition + time) * speed, 0)
    );

    spinnerRef.current.setNextKinematicRotation(rotation);
  });

  return (
    <RigidBody
      ref={spinnerRef}
      type="kinematicPosition"
      position-y={scale[1] / 2}
      restitution={0.2}
      friction={0}
    >
      <mesh material={material} geometry={geometry} scale={scale} castShadow />
    </RigidBody>
  );
};
