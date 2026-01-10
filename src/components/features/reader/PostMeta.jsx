import styled from 'styled-components';
import TagPill from '../../ui/TagPill';

const Container = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const MetaText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
`;

export default function PostMeta({ post }) {
  return (
    <Container>
      <Title>{post.title}</Title>
      <MetaText>
        {new Date(post.publishedAt).toLocaleDateString()} • {post.readingTime} min read
      </MetaText>
      <TagsRow>
        {post.tags.map(tag => <TagPill key={tag} label={tag} />)}
      </TagsRow>
    </Container>
  );
}
