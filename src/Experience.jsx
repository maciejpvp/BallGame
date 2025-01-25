import { Physics, Debug } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import { Player } from "./Player/Player.jsx";
import { OrbitControls } from "@react-three/drei";
import useGame from "./stores/useGame.js";
import { Effects } from "./Effects.jsx";
import { useControls } from "leva";

export default function Experience({ selectedLevelID }) {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  const { showCollisions, noClip } = useControls("World", {
    showCollisions: false,
    noClip: false,
  });

  return (
    <>
      {noClip && <OrbitControls />}
      <color attach="background" args={["rgb(0, 0, 0)"]} />
      <Physics key={selectedLevelID}>
        {showCollisions && <Debug />}
        <Lights />
        <Level trapCount={blocksCount} selectedLevelID={selectedLevelID} />
        {!noClip && <Player />}
        <Effects />
      </Physics>
    </>
  );
}
