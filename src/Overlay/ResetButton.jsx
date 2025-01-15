import styled from "styled-components";
import useGame from "../stores/useGame";

const StyledButton = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120px;
  background-color: #e4e4e4a6;
  width: 100vw;
  height: 200px;
  top: calc(50% - 100px);
  cursor: pointer;
  pointer-events: all;
`;

export const ResetButton = () => {
  const restart = useGame((state) => state.restart);

  return <StyledButton onClick={restart}>Reset</StyledButton>;
};
