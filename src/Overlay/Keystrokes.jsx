import styled from "styled-components";
import { Keystroke } from "./Keystroke";

const StyledKeystrokes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 20px;
  bottom: 10px;
`;

const SecRow = styled.div`
  display: flex;
`;

const SpaceRow = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;

export const Keystrokes = () => {
  return (
    <>
      <StyledKeystrokes>
        <Keystroke char={"W"} subscribeTo="forward" keyCode={87} />
        <SecRow>
          <Keystroke char={"A"} subscribeTo={"leftward"} keyCode={65} />
          <Keystroke char={"S"} subscribeTo={"backward"} keyCode={83} />
          <Keystroke char={"D"} subscribeTo={"rightward"} keyCode={68} />
        </SecRow>
      </StyledKeystrokes>
      <SpaceRow>
        <Keystroke char={"space"} subscribeTo={"jump"} keyCode={32} />
      </SpaceRow>
    </>
  );
};
