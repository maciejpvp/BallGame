import { RigidBody } from "@react-three/rapier";
import { boxGeometry, floor1Material } from "../assets";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useGame from "../stores/useGame";

export const Floor = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  const blockRef = useRef();

  return (
    <RigidBody
      ref={blockRef}
      type="fixed"
      position={[position[0], position[1], position[2]]}
      friction={10}
      restitution={0}
    >
      <mesh material={floor1Material} geometry={boxGeometry} scale={scale} />
    </RigidBody>
  );
};
