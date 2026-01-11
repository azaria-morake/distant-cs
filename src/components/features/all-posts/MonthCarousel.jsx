import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 24px;
  margin: 0 -24px;
  padding-left: 16px;
  padding-right: 16px;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const MonthCarousel = ({ children }) => (
  <Container>{children}</Container>
);

export default MonthCarousel;
