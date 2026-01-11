import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.3'/%3E%3C/svg%3E");
  padding: 5px;
  background-color: #b4fc2e;
`;

const Title = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  white-space: nowrap;
`;

const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  flex-grow: 1;
`;

const SectionHeader = ({ title }) => (
  <Container>
    <Title>{title}</Title>
    <Line />
  </Container>
);

export default SectionHeader;
