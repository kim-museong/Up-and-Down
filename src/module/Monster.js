import styled, { css, keyframes } from "styled-components";

const blinkAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const NormalMonster = styled.img`
  width: 240px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 75%;
  left: 48%;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease-in-out;
  -webkit-user-drag: none;
  ${({ blink }) =>
    blink &&
    css`
      animation: ${blinkAnimation} 0.5s infinite;
    `}
`;

export const BossMonster = styled.img`
  max-width: 250px;
  min-width: 240px;
  width: auto;
  margin-top: 10px;
  object-fit: cover;
  cursor: url("/images/attack.png"), auto;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-user-drag: none;
  ${({ blink }) =>
    blink &&
    css`
      animation: ${blinkAnimation} 0.5s infinite;
    `}
`;
