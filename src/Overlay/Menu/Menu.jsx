import styled from "styled-components";
import { Stars } from "./Starts";
import useGame from "../../stores/useGame";
import { levels } from "../../Levels/levels";

const StyledMenu = styled.div`
  background-color: #0a0a0a;
  display: flex;
  gap: 40px;
  flex-direction: column;
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

const PlayNextButton = styled.button`
  background-color: #eeeeee;
  /* position: absolute; */
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

const StyledTimerMessage = styled.p`
  color: #d6d6d6;
  font-size: 25px;
  font-weight: 600;
`;

const ButtonsDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 35px;
  /* margin-bottom: -50px; */
`;

const StarsDiv = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  width: 50%;
`;

export const Menu = () => {
  const selectedLevelID = useGame((state) => state.selectedLevelID);
  const selectedLevel = levels[selectedLevelID];
  const restart = useGame((state) => state.restart);
  const startTime = useGame((state) => state.startTime);
  const endTime = useGame((state) => state.endTime);
  const nextLevel = useGame((state) => state.nextLevel);

  let timerValue = endTime - startTime;
  timerValue /= 1000;
  timerValue = timerValue.toFixed(2);

  const howGoodPlayed = () => {
    if (timerValue < selectedLevel.times.hackerTime) return 4;
    if (timerValue < selectedLevel.times.forThreeStars) return 3;
    if (timerValue < selectedLevel.times.forTwoStars) return 2;
    return 1;
  };

  let timerMessage;
  switch (howGoodPlayed()) {
    case 4:
      timerMessage = "That fast? Are you cheating?";
      break;
    case 3:
      timerMessage = "Awesome you played it perfectly!";
      break;
    case 2:
      timerMessage = "You almost got it, try again!";
      break;
    default:
      timerMessage = "Maybe next time :/";
  }

  const handleReset = () => {
    restart();
  };
  return (
    <StyledMenu>
      <StarsDiv>
        <Stars stars={howGoodPlayed()} />
        <StyledTimerMessage>{timerMessage}</StyledTimerMessage>
      </StarsDiv>
      <ButtonsDiv>
        <PlayAgainButton onClick={handleReset}>Play Again</PlayAgainButton>
        <PlayNextButton onClick={nextLevel}>Next</PlayNextButton>
      </ButtonsDiv>
    </StyledMenu>
  );
};
