import { Block } from "../Blocks/Block";
import { Limbo } from "../Traps/Limbo";
import { Axe } from "../Traps/Axe";
import { Spinner } from "../Traps/Spinner";
import { Burger } from "../Burger";

const traps = [
  {
    type: "Spinner",
    Component: ({ geometry, material }) => (
      <Spinner geometry={geometry} material={material} />
    ),
  },
  {
    type: "Limbo",
    Component: ({ geometry, material }) => (
      <Limbo geometry={geometry} material={material} />
    ),
  },
  {
    type: "Axe",
    Component: ({ geometry, material }) => (
      <Axe geometry={geometry} material={material} />
    ),
  },
];

const generateRandomBlocks = (blockCount, boxGeometry, obstacleMaterial) => {
  const randomTraps = Array.from({ length: blockCount }, () => {
    const randomIndex = Math.floor(Math.random() * traps.length);
    return traps[randomIndex];
  });
  return randomTraps.map((trap, index) => (
    <Block
      key={index}
      type="trap"
      position={[0, 0, -(index + 1) * 4]} // Ustawienie pozycji
    >
      <trap.Component geometry={boxGeometry} material={obstacleMaterial} />
    </Block>
  ));
};

export const TrapBlocks = ({ blockCount, boxGeometry, obstacleMaterial }) => {
  const blocks = generateRandomBlocks(
    blockCount,
    boxGeometry,
    obstacleMaterial
  );
  return <>{blocks}</>;
};
