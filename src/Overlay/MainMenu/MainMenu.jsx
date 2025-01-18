import styled from "styled-components";
import { Map } from "./Map";

const StyledMainMenu = styled.div`
  /* background-color: #ff0000; */
  position: absolute;
  width: 70vw;
  height: 100vh;
`;

const StyledText = styled.p`
  color: #d6d6d6;
  text-align: center;
  font-size: 100px;
  font-weight: 500;
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
  animation: tilt 1s infinite linear;
`;

const MapSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  /* background-color: blue; */
  width: 100%;
  height: 45%;
`;

export const MainMenu = () => {
  return (
    <StyledMainMenu>
      <StyledText>Choice Map</StyledText>
      <MapSelector>
        <Map title="easy" levelID={0} />
        <Map title="medium" levelID={1} />
        <Map />
      </MapSelector>
    </StyledMainMenu>
  );
};
