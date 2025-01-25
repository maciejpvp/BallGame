import { KeyboardControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Overlay } from "./Overlay/Overlay";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import * as THREE from "three";
import { button, Leva, useControls } from "leva";
import useGame from "./stores/useGame";

function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /mobile|android|iphone|ipod|ipad|windows phone|blackberry|iemobile/.test(
    userAgent,
  );
}

export const App = () => {
  const selectedLevelID = useGame((state) => state.selectedLevelID);
  const isDebugMode = window.location.hash.includes("#debug");
  const nextLevel = useGame((state) => state.nextLevel);
  const phase = useGame((state) => state.phase);

  const { showPerf } = useControls(
    "World",
    {
      showPerf: false,
      nextLevel: button(nextLevel),
    },
    { collapsed: true },
  );

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
      <Leva collapsed hidden={!isDebugMode} />
      <Canvas
        gl={
          {
            // toneMapping: THREE.ACESFilmicToneMapping,
            // outputEncoding: THREE.sRGBEncoding,
          }
        }
        shadows
        camera={{
          fov: isMobileDevice() ? 35 : 45,
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
