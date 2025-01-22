import styled from "styled-components";
import useGame from "../../stores/useGame";

const StyledMap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4b4b4b;
  background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  transition: all 400ms cubic-bezier(0.47, 1.64, 0.41, 0.8);
  pointer-events: all;

  width: 150px;
  height: 150px;

  @media (min-width: 850px) {
    width: 250px;
    height: 250px;
  }

  @keyframes tilt {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(0.5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-0.5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  &:hover {
    scale: 1.1;
    animation: tilt 1s infinite linear;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
  &:active {
    scale: 1.08;
    box-shadow: 0 0 30px rgba(255, 255, 255, 1); /* Stronger glow when active */
  }
`;

const StyledTitle = styled.p`
  /* position: absolute; */
  text-align: center;
  font-weight: 500;
  color: #c2c2c2;
  z-index: 1;

  font-size: 30px;
  @media (min-width: 850px) {
    font-size: 50px;
  }
`;

export const Map = ({ title = "Coming soon", levelID }) => {
  const selectLevel = useGame((state) => state.selectLevel);

  const handleStartMap = () => {
    if (levelID === undefined) return;
    selectLevel(levelID);
  };

  return (
    <StyledMap
      onClick={handleStartMap}
      $backgroundImage={levelID !== undefined ? `level-${levelID}.png` : "none"}
    >
      <StyledTitle>{title}</StyledTitle>
    </StyledMap>
  );
};
