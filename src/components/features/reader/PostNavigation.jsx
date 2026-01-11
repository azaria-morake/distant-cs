import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Container = styled.div`
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: ${props => props.disabled ? 0.3 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${props => !props.disabled && props.theme.colors.text};
  }
`;

const PostNavigation = ({ onNext, onPrev, hasNext, hasPrev }) => (
  <Container>
    <NavBtn onClick={onPrev} disabled={!hasPrev}>
      <ArrowLeft size={16} /> Previous
    </NavBtn>
    <NavBtn onClick={onNext} disabled={!hasNext}>
      Next <ArrowRight size={16} />
    </NavBtn>
  </Container>
);

export default PostNavigation;
