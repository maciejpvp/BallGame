import styled from "styled-components";
import { Map } from "./Map";

function isMobileDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  return /mobile|android|iphone|ipod|ipad|windows phone|blackberry|iemobile/.test(
    userAgent,
  );
}

const StyledMainMenu = styled.div`
  /* background-color: #ff0000; */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70vw;
  height: 100vh;
`;

const StyledText = styled.p`
  position: absolute;
  top: 5%;
  color: #d6d6d6;
  text-align: center;
  font-size: 6vh;
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
  gap: 50px;
  width: auto;
  height: auto;

  flex-direction: column;
  @media (min-width: 550px) {
    flex-direction: row;
  }
`;

export const MainMenu = () => {
  return (
    <StyledMainMenu>
      {!isMobileDevice() && <StyledText>Choice Map</StyledText>}
      <MapSelector>
        <Map title="easy" levelID={0} />
        <Map title="medium" levelID={1} />
        <Map />
      </MapSelector>
    </StyledMainMenu>
  );
};
