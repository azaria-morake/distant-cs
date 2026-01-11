import styled from 'styled-components';

const Track = styled.div`
  position: absolute;
  right: 4px;
  top: 80px;
  bottom: 80px;
  width: 4px;
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
  z-index: 60;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Thumb = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
  transition: height 0.1s linear;
`;

const ScrollIndicator = ({ progress }) => {
  return (
    <Track>
      <Thumb style={{ height: `${Math.min(progress * 100, 100)}%` }} />
    </Track>
  );
};

export default ScrollIndicator;
