import styled from 'styled-components';
import PostListItem from './PostListItem';

const Card = styled.div`
  /* Transparent background, just structure */
  min-width: 320px;
  max-width: 320px;
  margin-right: ${({ theme }) => theme.spacing.lg};
  
  /* Left border only */
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  padding-left: ${({ theme }) => theme.spacing.md};
`;

const MonthTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.colors.accent};
  }
`;

export default function MonthCard({ monthLabel, posts }) {
  return (
    <Card>
      <MonthTitle>{monthLabel}</MonthTitle>
      <div>
        {posts.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </div>
    </Card>
  );
}
