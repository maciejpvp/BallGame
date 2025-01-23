import { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${({ $background }) => $background};
  opacity: ${({ $opacity }) => `${$opacity}%`};
  scale: ${({ $scale }) => $scale};
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  touch-action: none;
  pointer-events: all;
`;

const Knob = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => `${$opacity}%`};
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  touch-action: none;
`;

export const Joystick = ({
  onJoystickMove,
  setJoystickPosition,
  toFixed = 3,
  scale = 1,
  flipY = false,
  containerColor = "blue",
  KnobColor = "red",
  containerOpacity = 100,
  KnobOpacity = 100,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const isMouseDown = useRef(false);

  const handleMove = (clientX, clientY) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let x = (clientX - rect.left - centerX) / centerX;
    let y = (clientY - rect.top - centerY) / centerY;
    const distance = Math.sqrt(x * x + y * y);
    const maxRadius = 1;

    if (distance > maxRadius) {
      const angle = Math.atan2(y, x);
      x = Math.cos(angle) * maxRadius;
      y = Math.sin(angle) * maxRadius;
    }

    x = parseFloat(x.toFixed(toFixed));
    y = parseFloat(y.toFixed(toFixed));

    setPosition({ x, y });
    if (setJoystickPosition) {
      setJoystickPosition({ x, y: flipY ? -y : y });
    }
    if (onJoystickMove) {
      onJoystickMove({ x, y: flipY ? -y : y });
    }
  };

  const handleMouseMove = (e) =>
    isMouseDown.current && handleMove(e.clientX, e.clientY);
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleEnd = () => {
    isMouseDown.current = false;
    setPosition({ x: 0, y: 0 });
    if (setJoystickPosition) {
      setJoystickPosition({ x: 0, y: 0 });
    }
    if (onJoystickMove) {
      onJoystickMove({ x: 0, y: 0 });
    }
  };

  const handleStart = (e) => {
    isMouseDown.current = true;
    const clientX = e.clientX || e.touches?.[0]?.clientX;
    const clientY = e.clientY || e.touches?.[0]?.clientY;
    if (clientX && clientY) handleMove(clientX, clientY);
  };

  return (
    <Container
      ref={containerRef}
      onMouseDown={handleStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      $background={containerColor}
      $opacity={containerOpacity}
      $scale={scale}
    >
      <Knob
        $color={KnobColor}
        $opacity={KnobOpacity}
        style={{
          left: `${position.x * 75 + 75}px`,
          top: `${position.y * 75 + 75}px`,
        }}
      />
    </Container>
  );
};
