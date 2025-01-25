import { RigidBody } from "@react-three/rapier";
import { boxGeometry, movingBlockMaterial } from "../assets";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useGame from "../stores/useGame";

export const MovingBlock = ({
  speed = 0.5,
  position,
  startPosition,
  reverse,
  round,
}) => {
  const blockRef = useRef();
  let lastBlockPosition = new THREE.Vector3(0, 0, 0);
  const [playerOnPlatform, setPlayerOnPlatform] = useState(false);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (!blockRef.current) return;
    const currentPosition = blockRef.current.translation();
    let newXPos = Math.sin((elapsedTime + startPosition) * speed) * 1.5;
    let newZPos = round
      ? position[2] + Math.cos((elapsedTime + startPosition) * speed) * 1.5
      : currentPosition.z;
    if (reverse) newXPos *= -1;
    blockRef.current.setNextKinematicTranslation(
      new THREE.Vector3(newXPos, currentPosition.y, newZPos),
    );
  });

  const handleCollisionEnter = () => {
    setPlayerOnPlatform(true);
  };
  const handleCollisionExit = () => {
    setPlayerOnPlatform(false);
  };

  return (
    <RigidBody
      ref={blockRef}
      type="kinematicPosition"
      position={[position[0] + startPosition, position[1], position[2]]}
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={handleCollisionExit}
      friction={10}
      restitution={0}
    >
      <mesh
        material={movingBlockMaterial}
        geometry={boxGeometry}
        scale={[1, 0.1, 1]}
      />
    </RigidBody>
  );
};
