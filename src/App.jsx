import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Overlay } from "./Overlay/Overlay";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { useControls } from "leva";

export const App = () => {
  const { showPerf } = useControls({
    showPerf: false,
  });

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      <Canvas
        gl={{
          toneMapping: THREE.CineonToneMapping,
          // outputEncoding: THREE.sRGBEncoding,
        }}
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        {showPerf && <Perf position="top-left" />}
        <Experience />
      </Canvas>
      <Overlay />
    </KeyboardControls>
  );
};
