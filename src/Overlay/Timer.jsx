import { useKeyboardControls } from "@react-three/drei";
import { addEffect } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import useGame from "../stores/useGame";

const StyledTimer = styled.div`
  position: absolute;
`;

const StyledH1 = styled.h1`
  margin: 0;
  margin-top: 5px;
  color: #ffffffd3;
`;

export const Timer = () => {
  const time = useRef();

  useEffect(() => {
    const disposeEffect = addEffect(() => {
      let elapsedTime = 0;
      const state = useGame.getState();
      if (state.phase === "playing") {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);
      if (!time.current) return;
      time.current.innerText = elapsedTime;
    });
    return () => {
      disposeEffect();
    };
  }, []);

  return (
    <StyledTimer>
      <StyledH1 ref={time}>123</StyledH1>
    </StyledTimer>
  );
};
