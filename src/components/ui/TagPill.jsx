import styled from 'styled-components';

const Pill = styled.span`
  display: inline-block;
  background-color: #F3F3F3;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-weight: 500;
`;

const TagPill = ({ label }) => {
  return <Pill>#{label}</Pill>;
};

export default TagPill;
