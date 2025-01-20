import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Overlay } from "./Overlay/Overlay";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { button, useControls } from "leva";
import useGame from "./stores/useGame";

export const App = () => {
  const selectedLevelID = useGame((state) => state.selectedLevelID);
  const nextLevel = useGame((state) => state.nextLevel);
  const phase = useGame((state) => state.phase);

  const { showPerf } = useControls({
    showPerf: false,
    nextLevel: button(nextLevel),
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
        gl={
          {
            // toneMapping: THREE.ACESFilmicToneMapping,
            // outputEncoding: THREE.sRGBEncoding,
          }
        }
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [2.5, 4, 6],
        }}
      >
        {showPerf && <Perf position="top-left" />}
        {phase !== "mainmenu" && (
          <Experience selectedLevelID={selectedLevelID} />
        )}
      </Canvas>

      <Overlay showMainMenu={phase === "mainmenu"} />
    </KeyboardControls>
  );
};
