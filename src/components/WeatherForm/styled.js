import styled from "styled-components";

export const SearchContainer = styled.form`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.inputBg};
  border-radius: 15px;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.glassBorder};
  transition: all 0.3s ease;
  margin-bottom: 20px;

  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  width: 100%;
  margin-left: 10px;
  
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.6;
  }
`;
