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
  const lastJump = useRef(Date.now());

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const [subscribeKeys, getKeys] = useKeyboardControls();

  const { infJump, godMode, speedHack } = useControls({
    infJump: false,
    godMode: false,
    speedHack: { value: 1, min: 1, max: 5, step: 0.001 },
  });

  const isInAir = () => {
    const player = playerRef.current;
    if (!player) return;

    const origin = player.translation();
    const ray = new rapier.Ray(
      new THREE.Vector3(origin.x, origin.y - 0.001, origin.z),
      new THREE.Vector3(0, -1, 0),
    );
    const hit = rapierWorld.castRay(ray);

    return hit && hit.toi > 0.1;
    if (hit && hit.toi < 0.1) {
      return "not on ground";
    }
  };

  const handleJump = () => {
    const player = playerRef.current;
    if (phase === "ended" && !player) return;

    if (infJump) {
      player.applyImpulse(new THREE.Vector3(0, 0.002, 0));
      return;
    }

    if (!isInAir()) {
      const now = Date.now();
      if (lastJump.current + 50 > now) {
        return;
      }
      player.applyImpulse(new THREE.Vector3(0, 0.015, 0));
      playerRef.current.setAngvel({ x: 0, y: 0, z: 0 });
      lastJump.current = now;
    }
  };
  const handleMovement = (delta) => {
    if (phase === "ended") return;

    const { forward, backward, leftward, rightward, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.01 * delta * speedHack;
    const torqueImpulse = 0.002 * delta * speedHack;

    impulse.x = impulseStrength * joyStickValues.current.x;
    impulse.z = impulseStrength * joyStickValues.current.y;

    if (!isInAir()) {
      torque.z = -torqueImpulse * joyStickValues.current.x;
      torque.x = torqueImpulse * joyStickValues.current.y;
    }

    if (forward) {
      impulse.z -= impulseStrength;
      if (!isInAir()) torque.x -= torqueImpulse;
    }
    if (backward) {
      impulse.z += impulseStrength;
      if (!isInAir()) torque.x += torqueImpulse;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      if (!isInAir()) torque.z -= torqueImpulse;
    }
    if (leftward) {
      impulse.x -= impulseStrength;
      if (!isInAir()) torque.z += torqueImpulse;
    }

    if (jump) {
      handleJump();
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
      smoothCameraPosition.y + 0.7,
      smoothCameraPosition.z + 2.4,
    );

    camera.lookAt(
      new THREE.Vector3(
        smoothCameraPosition.x,
        smoothCameraPosition.y,
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
      (value) => (value ? null : null),
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
