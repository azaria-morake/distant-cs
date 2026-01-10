import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

export default function Footer() {
  return (
    <FooterContainer>
      &copy; {new Date().getFullYear()} Distant CS. Honest computation.
    </FooterContainer>
  );
}
