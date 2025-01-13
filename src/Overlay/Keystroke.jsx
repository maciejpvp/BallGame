import { useKeyboardControls } from "@react-three/drei";
import { useState } from "react";
import { useEffect } from "react";
import styled, { css } from "styled-components";

const StyledKeystroke = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2vw;
  background-color: #1f1f1f;
  transition: background-color 100ms ease-in-out, scale 100ms linear,
    margin 100ms ease-in-out;
  color: #ffffff;
  scale: ${({ $isActive }) => ($isActive ? 1.1 : 1)};
  opacity: 0.8;
  width: ${({ $isSpace }) => ($isSpace ? "180px" : "60px")};
  height: ${({ $isSpace }) => ($isSpace ? "40px" : "60px")};
  margin: 4px;
  border-radius: ${({ $isSpace }) => ($isSpace ? "15px" : "30%")};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: ${({ $isSpace }) => ($isSpace ? "180px" : "75px")};
    height: ${({ $isSpace }) => ($isSpace ? "180px" : "75px")};
    background-color: #ffffffa6;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 150ms ease, opacity 100ms ease;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
  }

  ${({ $isSpace }) =>
    $isSpace &&
    css`
      &::after {
        content: "";
        position: absolute;
        background-color: #ffffff;
        width: 120px;
        height: 2px;
      }
    `}

  ${({ $isActive }) =>
    $isActive &&
    `
    &::before {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  `}
`;

export const Keystroke = ({ char, subscribeTo = "forward" }) => {
  const [isActive, setIsActive] = useState(false);
  const [subscribeKeys] = useKeyboardControls();
  const isSpace = char === "space";
  char = isSpace ? "" : char;

  const animateCharacter = (value) => {
    value ? setIsActive(true) : setIsActive(false);
  };

  useEffect(() => {
    const unsubChar = subscribeKeys(
      (state) => state[subscribeTo],
      (value) => animateCharacter(value)
    );
    return () => {
      unsubChar();
    };
  }, []);

  return (
    <StyledKeystroke $isActive={isActive} $isSpace={isSpace}>
      {char}
    </StyledKeystroke>
  );
};
