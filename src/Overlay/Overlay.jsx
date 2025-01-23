import styled from "styled-components";
import { Timer } from "./Timer";
import { Keystrokes } from "./Keystrokes";
import { ResetButton } from "./ResetButton";
import useGame from "../stores/useGame";
import { Menu } from "./Menu/Menu";
import { useEffect, useState } from "react";
import { MainMenu } from "./MainMenu/MainMenu";
import { Joystick } from "./Joystick";
import { useThree } from "@react-three/fiber";

function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /mobile|android|iphone|ipod|ipad|windows phone|blackberry|iemobile/.test(
    userAgent,
  );
}

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

const JoyStickDiv = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
`;

export const Overlay = ({ showMainMenu }) => {
  const phase = useGame((state) => state.phase);

  const handlePlayerMovement = (event) => {
    const customEvent = new CustomEvent("joystickMove", {
      detail: { event },
    });
    document.dispatchEvent(customEvent);
  };

  return (
    <StyledOverlay>
      {showMainMenu && <MainMenu />}
      {phase === "ended" && <Menu />}
      {!showMainMenu && (
        <>
          <Timer />
          {isMobileDevice() && (
            <>
              <Keystrokes />
              <JoyStickDiv>
                <Joystick
                  onJoystickMove={handlePlayerMovement}
                  containerColor="rgb(33, 33, 33)"
                  containerOpacity={80}
                  KnobColor="white"
                  KnobOpacity={90}
                />
              </JoyStickDiv>
            </>
          )}
        </>
      )}
    </StyledOverlay>
  );
};
