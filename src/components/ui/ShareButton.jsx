import styled from 'styled-components';
import { Share2 } from 'lucide-react';

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ShareButton = ({ onClick }) => (
  <Btn onClick={onClick}>
    <Share2 size={18} />
  </Btn>
);

export default ShareButton;
