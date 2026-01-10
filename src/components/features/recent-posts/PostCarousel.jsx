import styled from 'styled-components';
import RecentPostCard from './RecentPostCard';

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export default function PostCarousel({ posts }) {
  return (
    <CarouselContainer>
      {posts.map(post => (
        <RecentPostCard key={post.id} post={post} />
      ))}
    </CarouselContainer>
  );
}
