import styled, { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Navbar from './components/layout/Navbar';
import RecentPostsSection from './components/features/recent-posts/RecentPostsSection';
import AllPostsSection from './components/features/all-posts/AllPostsSection';
import PostReader from './components/features/reader/PostReader';

const AppContainer = styled.div`
  min-height: 100vh;
  padding-bottom: 80px;
  max-width: 800px; 
  margin: 0 auto;
  position: relative;
`;

// Larger spacer
const Spacer = styled.div` height: 80px; `;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Navbar />
        
        <div style={{ padding: '20px 0' }}>
          <RecentPostsSection />
        </div>
        
        <Spacer />
        
        <AllPostsSection />

        <PostReader />
        
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
