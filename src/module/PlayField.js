import styled from "styled-components";

export const PlayField = styled.div`
  width: 70%;
  height: 550px;
  text-align: center;
  margin: 0 auto;
  background: url("/images/jungle.png");
  background-position: 50% 100%;
  position: relative;

  div:nth-child(3) {
    div:first-child {
      margin-top: 6%;
    }
  }
`;
