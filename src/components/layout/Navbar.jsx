import styled from 'styled-components';

const NavContainer = styled.nav`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
`;

const Tagline = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.05em;
  
  &::before {
    content: 'STATUS: ';
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export default function Navbar() {
  return (
    <NavContainer>
      <Title>DISTANT CS</Title>
      <Tagline>ONLINE</Tagline>
    </NavContainer>
  );
}
