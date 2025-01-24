import { useRef } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
// import vertexShader from "../public/shaders/water/vertex.glsl?raw";
// import fragmentShader from "../public/shaders/water/fragment.glsl?raw";
import vertexShader from "./shaders/water/vertex.glsl?raw";
import fragmentShader from "./shaders/water/fragment.glsl?raw";

const LavaShaderMaterial = shaderMaterial(
  {
    uBigWavesElevation: 0.18,
    uTime: 0,
    uOffsetSpeed: 0.2,
    uBigWavesFrequency: new THREE.Vector2(1, 1),
    uDepthColor: new THREE.Color(0x167900),
    uSurfaceColor: new THREE.Color(0x27be05),
    uColorOffset: 0.17,
    uColorMultiplier: 2.4,
    uSmallWavesElevation: 0.25,
    uSmallWavesFrequency: 0.7,
    uSmallWavesSpeed: 0.18,
    uSmallInterations: 3.0,
  },
  vertexShader,
  fragmentShader,
);

extend({ LavaShaderMaterial });

const Lava = ({ length }) => {
  const lavaRef = useRef();

  const controls = useControls("Lava Shader", {
    uBigWavesElevation: { value: 0.18, min: 0, max: 1, step: 0.01 },
    uOffsetSpeed: { value: 0.2, min: 0, max: 0.2, step: 0.001 },
    uBigWavesFrequencyX: { value: 0.5, min: 0, max: 10, step: 0.1 },
    uBigWavesFrequencyY: { value: 0.4, min: 0, max: 10, step: 0.1 },
    uDepthColor: { value: "#167900" },
    uSurfaceColor: { value: "#27be05" },
    uColorOffset: { value: 0.17, min: 0, max: 1, step: 0.01 },
    uColorMultiplier: { value: 2.4, min: 1, max: 5, step: 0.1 },
    uSmallWavesElevation: { value: 0.25, min: 0, max: 1, step: 0.01 },
    uSmallWavesFrequency: { value: 0.7, min: 0, max: 10, step: 0.1 },
    uSmallWavesSpeed: { value: 0.18, min: 0, max: 1, step: 0.01 },
    uSmallInterations: { value: 3.0, min: 1, max: 5, step: 1 },
  });

  useFrame((state) => {
    if (lavaRef.current) {
      const time = state.clock.getElapsedTime();
      lavaRef.current.uTime = time;
      lavaRef.current.uBigWavesElevation = controls.uBigWavesElevation;
      lavaRef.current.uOffsetSpeed = controls.uOffsetSpeed;
      lavaRef.current.uBigWavesFrequency.set(
        controls.uBigWavesFrequencyX,
        controls.uBigWavesFrequencyY,
      );
      lavaRef.current.uDepthColor.set(controls.uDepthColor);
      lavaRef.current.uSurfaceColor.set(controls.uSurfaceColor);
      lavaRef.current.uColorOffset = controls.uColorOffset;
      lavaRef.current.uColorMultiplier = controls.uColorMultiplier;
      lavaRef.current.uSmallWavesElevation = controls.uSmallWavesElevation;
      lavaRef.current.uSmallWavesFrequency = controls.uSmallWavesFrequency;
      lavaRef.current.uSmallWavesSpeed = controls.uSmallWavesSpeed;
      lavaRef.current.uSmallInterations = controls.uSmallInterations;
    }
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position-y={-0.2} position-z={-length / 2}>
      <planeGeometry args={[4, length, 128, 128]} />
      <lavaShaderMaterial ref={lavaRef} />
    </mesh>
  );
};

export default Lava;
