import styled from 'styled-components';

const MainWrapper = styled.main`
  flex: 1;
`;

export default function Main({ children }) {
  return <MainWrapper>{children}</MainWrapper>;
}
