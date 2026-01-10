import styled from 'styled-components';
import MonthCard from './MonthCard';

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

export default function MonthCarousel({ groupedPosts, sortedKeys, formatLabel }) {
  return (
    <CarouselContainer>
      {sortedKeys.map(key => {
        const label = formatLabel(key);
        return (
           <MonthCard 
             key={key} 
             monthLabel={label} 
             posts={groupedPosts[key]} 
           />
        );
      })}
    </CarouselContainer>
  );
}
