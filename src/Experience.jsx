import { Physics, Debug } from "@react-three/rapier";
import Lights from "./Lights.jsx";
import { Level } from "./Level.jsx";
import { Player } from "./Player/Player.jsx";
import useGame from "./stores/useGame.js";
import { Effects } from "./Effects.jsx";

export default function Experience() {
  const blocksCount = useGame((state) => {
    return state.blocksCount;
  });

  return (
    <>
      <color attach="background" args={["rgb(53, 37, 37)"]} />
      <Physics>
        <Lights />
        <Level trapCount={blocksCount} />
        <Player />
        <Effects />
      </Physics>
    </>
  );
}
