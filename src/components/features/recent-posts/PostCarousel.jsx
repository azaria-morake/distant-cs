import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 24px;
  padding-right: 24px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PostCarousel = ({ children }) => (
  <Container>{children}</Container>
);

export default PostCarousel;
