import styled from "styled-components";
import { Star } from "./Star";

const StyledStars = styled.div`
  display: flex;
  /* position: absolute; */
  scale: 1.4;
  gap: 20px;
  top: -10px;
`;

export const Stars = ({ stars = 3 }) => {
  return (
    <StyledStars>
      <Star active={stars >= 1} />
      <Star active={stars >= 2} />
      <Star active={stars >= 3} />
    </StyledStars>
  );
};
