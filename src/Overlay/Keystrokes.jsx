import styled from "styled-components";
import { Keystroke } from "./Keystroke";

const StyledKeystrokes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const SecRow = styled.div`
  display: flex;
`;

export const Keystrokes = () => {
  return (
    <StyledKeystrokes>
      <Keystroke char={"W"} />
      <SecRow>
        <Keystroke char={"A"} subscribeTo={"leftward"} />
        <Keystroke char={"S"} subscribeTo={"backward"} />
        <Keystroke char={"D"} subscribeTo={"rightward"} />
      </SecRow>
      <Keystroke char={"space"} subscribeTo={"jump"} />
    </StyledKeystrokes>
  );
};
