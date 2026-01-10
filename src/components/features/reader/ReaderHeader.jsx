import styled from 'styled-components';
import { X } from 'lucide-react';
import { useBlogStore } from '../../../hooks/useBlogStore';

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: flex-end;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  z-index: 101;
  opacity: 0.95;
`;

const CloseButton = styled.button`
  padding: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.codeBackground};
  display: flex;
  align-items: center; justify-content: center;
`;

export default function ReaderHeader() {
  const closePost = useBlogStore(state => state.closePost);
  return (
    <Header>
      <CloseButton onClick={closePost}>
        <X size={24} color="#1E1E1E" />
      </CloseButton>
    </Header>
  );
}
