import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.compact ? '80px' : '100%'}; /* Smaller in Reader Header */
  height: ${props => props.compact ? '80px' : 'auto'};
  aspect-ratio: 1/1;
  background-color: ${props => props.color}; // should be image
  // border-radius: 4px;
  flex-shrink: 0;
  //border: ${({ theme }) => theme.borders.thin};
`;

const PostHero = ({ color, compact }) => (
  <Container color={color} compact={compact} />
);

export default PostHero;
