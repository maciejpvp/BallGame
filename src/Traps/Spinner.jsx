import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useRef, useState } from "react";

export const Spinner = ({
  material,
  geometry,
  startPosition = 0,
  position = [0, 0, 0],
  width = 2,
  scale = [width, 0.1, 0.1],
}) => {
  const spinnerRef = useRef();

  const [speed] = useState(
    () => (Math.random() + 1) * (Math.random() > 0.5 ? 1 : -1)
  );
  // const scale = [3.5, 0.1, 0.1];

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
