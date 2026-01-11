import styled from 'styled-components';
import PostListItem from './PostListItem';

const Card = styled.div`
  width: 100%;
  max-width: 360px;
  flex-shrink: 0;
  scroll-snap-align: center;
  padding: 0 12px;
`;

const Inner = styled.div`
  //background: ${({ theme }) => theme.colors.surface};
  padding: 24px;
  background-color: #fc8b0a;
  //border-radius: 12px;
  // border: ${({ theme }) => theme.borders.thin}; /* Thick outline always visible */
  height: 100%;
`;

const MonthTitle = styled.h3`
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 12px;
  background-color: #c5fa06;
  // background: ${({ theme }) => theme.colors.background};
  // border: ${({ theme }) => theme.borders.thin};
  // border-radius: 6px;
  margin-bottom: 20px;
  display: inline-block;
`;

const MonthCard = ({ label, posts }) => {
  return (
    <Card>
      <Inner>
        <MonthTitle>{label}</MonthTitle>
        <div>
          {posts.map(post => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </Inner>
    </Card>
  );
};

export default MonthCard;
