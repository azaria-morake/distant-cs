import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { BlogProvider, useBlogStore } from './hooks/useBlogStore';

import Navbar from './components/layout/Navbar';
import Main from './components/layout/Main';
import RecentPostsSection from './components/features/recent-posts/RecentPostsSection';
import AllPostsSection from './components/features/all-posts/AllPostsSection';
import PostReader from './components/features/reader/PostReader'; //

const BlogContent = () => {
  const { activePost } = useBlogStore();
  
  return (
    <>
      <Navbar />
      <Main>
        <RecentPostsSection />
        <AllPostsSection />
      </Main>
      
      <AnimatePresence>
        {activePost && <PostReader />}
      </AnimatePresence>
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BlogProvider>
        <BlogContent />
      </BlogProvider>
    </ThemeProvider>
  );
}

export default App;
