import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.accent};
  animation: ${spin} 0.8s ease-in-out infinite;
`;
