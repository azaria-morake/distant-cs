import styled from 'styled-components';

const Container = styled.footer`
  padding: 48px 24px;
  text-align: center;
  //border-top: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 800px;
  margin: 0 auto;
  margin-top: auto;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='2.15'/%3E%3C/svg%3E");

`;

const Text = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Footer = () => (
  <Container>
    <Text>© {new Date().getFullYear()} Distant CS. All rights reserved.</Text>
  </Container>
);

export default Footer;
