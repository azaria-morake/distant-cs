import styled from 'styled-components';
import { X } from 'lucide-react';
import ShareActions from './ShareActions';

const Container = styled.div`
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(190, 139, 36, 0.95);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const CloseBtn = styled.button`
  padding: 8px;
  margin-left: -8px;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    background: rgba(0,0,0,0.05);
    border-radius: 50%;
  }
`;

const ReaderHeader = ({ onClose }) => (
  <Container>
    <CloseBtn onClick={onClose}>
      <X size={24} />
    </CloseBtn>
    <ShareActions />
  </Container>
);

export default ReaderHeader;
