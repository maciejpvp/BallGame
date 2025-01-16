import styled from "styled-components";

const StyledStar = styled.div`
  width: 300px;
  aspect-ratio: 1;
  background: ${({ $active }) => ($active ? "#f8ca00" : "#6d6d6d")};
  clip-path: polygon(50% 0, 79% 90%, 2% 35%, 98% 35%, 21% 90%);
`;

export const Star = ({ active }) => {
  return <StyledStar $active={active}></StyledStar>;
};
