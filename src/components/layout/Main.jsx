import styled from 'styled-components';
import Footer from './Footer';

const MainContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;
  padding-top: 48px; /* Clean margin between Navbar and first section */
  display: flex;
  flex-direction: column;
  gap: 56px; /* Increased gap between sections */
`;

const Main = ({ children }) => (
  <>
    <MainContainer>{children}</MainContainer>
    <Footer />
  </>
);

export default Main;
