import styled from 'styled-components';

const NavWrapper = styled.nav`
  background: ${({ theme }) => theme.colors.background};
  // border-bottom: ${({ theme }) => theme.borders.thick};
  position: relative; /* Changed from sticky to relative so it scrolls away */
  z-index: 40;
  /* Texture */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='2.15'/%3E%3C/svg%3E");
`;

const NavContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.03em;
`;

const Tagline = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 6px;
  display: block;
`;

const Navbar = () => (
  <NavWrapper>
    <NavContent>
      <Logo>Distant CS</Logo>
      <Tagline>Unrestricted Thoughts on CS/SE</Tagline>
    </NavContent>
  </NavWrapper>
);

export default Navbar;
