import styled from 'styled-components';

const Header = styled.h2`
  font-size: 1.5rem; /* Increased from 1.125rem */
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  font-weight: 700;
  letter-spacing: -0.5px;
`;

export default function SectionHeader({ title }) {
  return <Header>{title}</Header>;
}
