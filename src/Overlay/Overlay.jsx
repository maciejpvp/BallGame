import styled from "styled-components";
import { Timer } from "./Timer";
import { Keystrokes } from "./Keystrokes";
import { ResetButton } from "./ResetButton";
import useGame from "../stores/useGame";
import { Menu } from "./Menu/Menu";
import { useEffect, useState } from "react";

const StyledOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  font-family: "Montserrat", cursive;
`;

export const Overlay = () => {
  const phase = useGame((state) => state.phase);

  return (
    <StyledOverlay>
      {phase === "ended" && <Menu />}
      <Timer />
      <Keystrokes />
    </StyledOverlay>
  );
};
