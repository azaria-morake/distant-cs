import styled from 'styled-components';

const Pill = styled.span`
  background-color: ${({ theme }) => theme.colors.codeBackground};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.75rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
`;

export default function TagPill({ label }) {
  return <Pill>#{label}</Pill>;
}
