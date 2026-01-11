import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${props => props.compact ? '18px' : '24px'};
  line-height: 1.3;
  font-weight: 800;
  
  @media (min-width: 768px) {
    font-size: ${props => props.compact ? '22px' : '32px'};
  }
`;

const MetaText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
`;

const PostMeta = ({ title, publishedAt, readingTime, compact }) => (
  <Container>
    <MetaText>
      {new Date(publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
      <span>•</span>
      {readingTime} min read
    </MetaText>
    <Title compact={compact}>{title}</Title>
  </Container>
);

export default PostMeta;
