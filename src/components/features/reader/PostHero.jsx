import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.compact ? '80px' : '100%'}; /* Smaller in Reader Header */
  height: ${props => props.compact ? '80px' : 'auto'};
  aspect-ratio: 1/1;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  //background-color: ${props => props.color}; // should be image
  // border-radius: 4px;
  flex-shrink: 0;
  //border: ${({ theme }) => theme.borders.thin};
`;

const PostHero = ({ src, compact }) => (
  <Container src={src} compact={compact} />
);


export default PostHero;
