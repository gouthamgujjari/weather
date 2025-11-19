import styled from "styled-components";
import { motion } from "framer-motion";

export const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: background-image 1s ease-in-out;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 0;
  }
`;

export const GlassCard = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 900px;
  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.glassBorder};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadow};
  color: ${({ theme }) => theme.text};
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) { padding: 20px; }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ToggleButton = styled.button`
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;

  &:hover { background: rgba(255,255,255,0.3); transform: scale(1.1); }
`;

export const ErrorText = styled.div`
  color: #ff6b6b;
  text-align: center;
  font-size: 1.1rem;
`;