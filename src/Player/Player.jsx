import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import useGame from "../stores/useGame";

let smoothCameraPosition = new THREE.Vector3(0, 3, 20);

export const Player = () => {
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);
  const playerRef = useRef();

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const handleMovement = (delta) => {
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueImpulse = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueImpulse;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueImpulse;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueImpulse;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueImpulse;
    }

    playerRef.current.applyImpulse(impulse);
    playerRef.current.applyTorqueImpulse(torque);
  };

  const handleCamera = (state, delta) => {
    const playerPosition = playerRef.current.translation();
    const camera = state.camera;
    smoothCameraPosition.lerp(playerPosition, 5 * delta);

    camera.position.set(
      smoothCameraPosition.x,
      smoothCameraPosition.y + 0.65,
      smoothCameraPosition.z + 2.25
    );

    camera.lookAt(
      new THREE.Vector3(
        smoothCameraPosition.x,
        smoothCameraPosition.y + 0.25,
        smoothCameraPosition.z
      )
    );
  };

  const handleGameStates = () => {
    const playerPosition = playerRef.current.translation();
    if (playerPosition.z < -(blocksCount * 4 + 2)) {
      end();
    }
    if (playerPosition.y < -4) {
      restart();
    }
    // console.log(playerPosition);
  };

  const handleReset = () => {
    playerRef.current.setTranslation({ x: 0, y: 2, z: 0 });
    playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    playerRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useFrame((state, delta) => {
    handleMovement(delta);
    handleCamera(state, delta);
    handleGameStates();
  });

  const jump = () => {
    const origin = playerRef.current.translation();
    origin.y -= 0.29;
    const direction = new THREE.Vector3(0, -1, 0);
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray);
    if (hit.toi < 0.1)
      playerRef.current.applyImpulse(new THREE.Vector3(0, 0.5, 0));
  };

  useEffect(() => {
    const unsubGame = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        console.log(value);
        value === "ready" && handleReset();
      }
    );

    const unsubJump = subscribeKeys(
      (state) => state.jump,
      (value) => (value ? jump() : null)
    );
    const unsubAny = subscribeKeys(() => {
      start();
    });
    return () => {
      unsubGame();
      unsubJump();
      unsubAny();
    };
  }, []);

  return (
    <>
      <RigidBody
        ref={playerRef}
        colliders="ball"
        position={[0, 2, 0]}
        restitution={0.2}
        friction={1}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="rgb(105, 105, 105)" />
        </mesh>
      </RigidBody>
    </>
  );
};
