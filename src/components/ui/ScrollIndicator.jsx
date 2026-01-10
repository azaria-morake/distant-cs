import styled from 'styled-components';
import { motion, useScroll } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  height: 100px;
  width: 4px;
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
  z-index: 200;
  /* Only show on mobile if intended, or keep global */
  @media (min-width: 800px) { right: 20px; }
`;

const Bar = styled(motion.div)`
  width: 100%;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
  transform-origin: top;
`;

export default function ScrollIndicator({ targetRef }) {
  const { scrollYProgress } = useScroll({ container: targetRef });

  return (
    <Container>
      <Bar style={{ scaleY: scrollYProgress }} />
    </Container>
  );
}
