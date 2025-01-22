import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import * as THREE from "three";
import useGame from "../stores/useGame";

let smoothCameraPosition = new THREE.Vector3(0, 3, 20);

export const Player = () => {
  const start = useGame((state) => state.start);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);
  const blocksCount = useGame((state) => state.blocksCount);
  const setPlayer = useGame((state) => state.setPlayer);
  const phase = useGame((state) => state.phase);
  const playerRef = useRef();
  const joyStickValues = useRef({ x: 0, y: 0 });

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { infJump, godMode, speedHack } = useControls({
    infJump: false,
    godMode: false,
    speedHack: { value: 1, min: 1, max: 5, step: 0.001 },
  });

  const handleMovement = (delta) => {
    if (phase === "ended") return;
    const { forward, backward, leftward, rightward, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.01 * delta * speedHack;
    const torqueImpulse = 0.002 * delta * speedHack;
    impulse.x = impulseStrength * joyStickValues.current.x * 2;
    impulse.z = impulseStrength * joyStickValues.current.y * 2;

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

    if (infJump && jump) {
      playerRef.current.applyImpulse(new THREE.Vector3(0, 0.001, 0));
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
      smoothCameraPosition.y + 0.35,
      smoothCameraPosition.z + 1.25,
    );

    camera.lookAt(
      new THREE.Vector3(
        smoothCameraPosition.x,
        smoothCameraPosition.y + 0.25,
        smoothCameraPosition.z,
      ),
    );
  };

  const handleGameStates = () => {
    const playerPosition = playerRef.current.translation();
    if (playerPosition.z < -(blocksCount * 4 + 2.5)) {
      end();
    }
    if (playerPosition.y < -0.9) {
      if (godMode) return;
      restart();
    }
  };

  const handleReset = () => {
    playerRef.current.setTranslation({ x: 0, y: 2, z: 0 });
    playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    playerRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  const handleEnd = () => {
    playerRef.current.setLinvel({ x: 0, y: 0, z: 0 });
    playerRef.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useFrame((state, delta) => {
    handleMovement(delta);
    handleCamera(state, delta);
    handleGameStates();
  });

  const jump = () => {
    if (phase === "ended") return;

    if (infJump) {
      playerRef.current.applyImpulse(new THREE.Vector3(0, 0.015, 0));
      return;
    }
    const origin = playerRef.current.translation();
    origin.y -= 0.001;
    const direction = new THREE.Vector3(0, -1, 0);
    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray);
    if (hit.toi < 0.1) {
      playerRef.current.applyImpulse(new THREE.Vector3(0, 0.015, 0));
    }
  };

  useEffect(() => {
    setPlayer(playerRef.current);
    const unsubGame = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        value === "ready" && handleReset();
        value === "ended" && handleEnd();
      },
    );

    const unsubJump = subscribeKeys(
      (state) => state.jump,
      (value) => (value ? jump() : null),
    );
    const unsubAny = subscribeKeys(() => {
      start();
    });
    const onJoystickMove = (event) => {
      start();
      joyStickValues.current = event.detail.event;
    };
    document.addEventListener("joystickMove", onJoystickMove);
    return () => {
      unsubGame();
      unsubJump();
      unsubAny();
      document.removeEventListener("joystickMove", onJoystickMove);
    };
  }, [infJump, phase]);

  const handleCollision = (value) => {
    if (value.rigidBodyObject.userData === 1 && !godMode) {
      restart();
    }
  };

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
        onCollisionEnter={(value) => handleCollision(value)}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.1, 1]} />
          <meshStandardMaterial flatShading color="rgb(105, 105, 105)" />
        </mesh>
      </RigidBody>
    </>
  );
};
