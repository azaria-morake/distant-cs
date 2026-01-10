import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useBlogStore } from '../../../hooks/useBlogStore';
import { posts } from '../../../data/posts';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const NavButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  &:hover { color: ${({ theme }) => theme.colors.accent}; }
  &:disabled { opacity: 0.3; cursor: not-allowed; }
`;

export default function PostNavigation({ currentPostId }) {
  const openPost = useBlogStore(state => state.openPost);
  
  const currentIndex = posts.findIndex(p => p.id === currentPostId);
  const prevPost = posts[currentIndex + 1]; // Reverse chronological: next in array is older
  const nextPost = posts[currentIndex - 1]; // Previous in array is newer

  return (
    <Container>
      <NavButton onClick={() => prevPost && openPost(prevPost.id)} disabled={!prevPost}>
        <ArrowLeft size={16} /> Previous
      </NavButton>
      <NavButton onClick={() => nextPost && openPost(nextPost.id)} disabled={!nextPost}>
        Next <ArrowRight size={16} />
      </NavButton>
    </Container>
  );
}
