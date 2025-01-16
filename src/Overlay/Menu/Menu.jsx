import styled from "styled-components";
import { Stars } from "./Starts";
import useGame from "../../stores/useGame";

const StyledMenu = styled.div`
  background-color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  opacity: 99%;
  border-radius: 50px;
  width: 50vw;
  height: 45vh;
`;

const PlayAgainButton = styled.button`
  background-color: #eeeeee;
  position: absolute;
  bottom: 70px;
  width: 200px;
  height: 50px;
  font-size: 25px;
  border: 0;
  border-radius: 15px;
  pointer-events: all;
  cursor: pointer;
  font-family: "Montserrat", cursive;
  transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
  &:hover {
    background-color: #e0e0e0;
    scale: 1.05;
  }
  &:active {
    background-color: #cccccc;
    scale: 1.03;
  }
`;

export const Menu = () => {
  const restart = useGame((state) => state.restart);

  const handleReset = () => {
    restart();
  };
  return (
    <StyledMenu>
      <Stars />
      <PlayAgainButton onClick={handleReset}>Play Again</PlayAgainButton>
    </StyledMenu>
  );
};
