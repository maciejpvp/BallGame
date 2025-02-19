import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Lights() {
  const lightRef = useRef();

  // useHelper(lightRef, THREE.DirectionalLightHelper, 1, "red");

  useFrame((state) => {
    lightRef.current.position.z = state.camera.position.z + 1 - 4;
    lightRef.current.target.position.z = state.camera.position.z - 4;
    lightRef.current.target.updateMatrixWorld();
  });

  return (
    <>
      <directionalLight
        ref={lightRef}
        castShadow
        position={[1, 2.5, 3]}
        intensity={4.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={3.5} />
    </>
  );
}
