import styled from "styled-components";
import { motion } from "framer-motion";

export const InfoContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TempDisplay = styled.div`
  h1 {
    font-size: 52px;
    margin: 5px 0;
  }

  p {
    opacity: 0.85;
  }
`;

export const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 115px;
    height: 115px;
  }
`;

/* STAT CARDS — 3 in row, vertical content */
export const GridContainer = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 22px;
  border-radius: 16px;
  text-align: center;

  display: flex;
  flex-direction: column;     /* vertical */
  align-items: center;        /* center horizontally */
  justify-content: center;    /* center vertically */
  gap: 6px;

  svg {
    width: 34px;
    height: 34px;
  }

  span {
    font-size: 14px;
    opacity: 0.75;
  }

  strong {
    font-size: 20px;
  }
`;

export const TodayWrapper = styled.div`
  background: ${({ theme }) => theme.cardBg};
  padding: 15px;
  border-radius: 12px;

  .hourList {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    padding-bottom: 6px;
    margin-top: 10px;
  }
`;

export const HourCard = styled.div`
  min-width: 60px;
  text-align: center;

  .hour {
    font-size: 12px;
    opacity: 0.7;
  }

  .temp {
    font-size: 16px;
    margin-top: 4px;
    font-weight: bold;
  }
`;

/* IMPORTANT — react-icons inside */
export const HourIconImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 28px !important;
    height: 28px !important;
  }
`;
