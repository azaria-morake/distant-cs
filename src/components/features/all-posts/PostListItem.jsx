import styled from 'styled-components';
import { useBlogStore } from '../../../hooks/useBlogStore';

const Item = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  
  &:hover h4 { color: ${({ theme }) => theme.colors.accent}; }
  &:last-child { border-bottom: none; }
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  text-transform: none; /* Keep titles readable */
  transition: color 0.2s;
`;

const Meta = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export default function PostListItem({ post }) {
  const openPost = useBlogStore(state => state.openPost);
  return (
    <Item onClick={() => openPost(post.id)}>
      <Title>{post.title} -- </Title>
      <Meta>READ_TIME: {post.readingTime}M</Meta>
    </Item>
  );
}
