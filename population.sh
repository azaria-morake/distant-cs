#!/bin/bash

echo "Populating files for Distant CS..."

# --- 1. STYLES & THEME ---

cat << 'EOF' > src/styles/theme.js
export const theme = {
  colors: {
    background: '#FAF9F7', // Warm off-white
    text: '#1E1E1E',       // Deep charcoal
    textSecondary: '#757575',
    border: '#E0E0E0',
    accent: '#C2410C',     // Burnt Orange
    codeBackground: '#2d2d2d',
    surface: '#FFFFFF',
  },
  fonts: {
    heading: '"Space Grotesk", "Inter", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"IBM Plex Mono", monospace',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
  }
};
EOF

cat << 'EOF' > src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Hide scrollbar for clean horizontal scrolling */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
EOF

# --- 2. DATA ---

cat << 'EOF' > src/data/posts.js
export const posts = [
  {
    id: "post_001",
    title: "Abstraction Without Understanding Is Dangerous",
    summary: "High-level tools make us productive, but they can also make us blind to the machinery that actually runs the world.",
    content: `
      <p>We build on top of mountains of sand. We call them "frameworks" and "platforms," but functionally, they are black boxes that we have ceased to open.</p>
      <p>The modern developer is often a generic consumer of APIs rather than an architect of computation. This isn't inherently bad—specialization allows for speed. But when things break, and they always break, the inability to descend the ladder of abstraction becomes a critical failure mode.</p>
      <h3>The Cost of the Black Box</h3>
      <p>Consider the humble HTTP request. In 1995, you likely crafted the socket connection manually. Today, you call <code>fetch()</code>. Tomorrow, an AI agent will do it for you. What is lost is the intuition of latency, the tangible weight of a TCP handshake.</p>
      <pre><code>// The illusion of simplicity
const data = await fetch('/api/truth');
// What actually happens here is a miracle of engineering
// that we treat as mundane.</code></pre>
      <p>We must return to the practice of "opening the box." Not for every project, and not for every line of code, but as a discipline of the mind.</p>
    `,
    publishedAt: "2026-01-07T09:30:00Z",
    readingTime: 6,
    conceptDensity: "heavy",
    tags: ["ComputerScience", "Philosophy"],
    imageColor: "#7c2d12" // specific hex for logic
  },
  {
    id: "post_002",
    title: "The Unreasonable Effectiveness of Plain Text",
    summary: "Why plain text remains the only format that truly endures across decades of software rot.",
    content: "<p>Binary formats rot. Proprietary databases fade. But a .txt file from 1970 is still readable today.</p>",
    publishedAt: "2026-01-14T10:00:00Z",
    readingTime: 4,
    conceptDensity: "light",
    tags: ["SoftwareEng", "Archival"],
    imageColor: "#44403c"
  },
  {
    id: "post_003",
    title: "State Machines for UI Logic",
    summary: "Stop using booleans to manage your interface. It is time to embrace the finite state machine.",
    content: "<p>Boolean flags are the source of all evil in UI development. <code>isLoading</code>, <code>isError</code>, <code>isSuccess</code>... inevitably, you will end up with <code>isLoading && isError</code>.</p>",
    publishedAt: "2025-12-28T14:15:00Z",
    readingTime: 8,
    conceptDensity: "medium",
    tags: ["WebDev", "Patterns"],
    imageColor: "#134e4a"
  },
  {
    id: "post_004",
    title: "On The Fragility of NPM",
    summary: "The house of cards we built on top of semantic versioning.",
    content: "<p>One deleted package left-pad broke the internet. Have we learned anything since then?</p>",
    publishedAt: "2025-12-10T11:00:00Z",
    readingTime: 5,
    conceptDensity: "medium",
    tags: ["Infra", "Rant"],
    imageColor: "#7f1d1d"
  },
  {
    id: "post_005",
    title: "Recursive Thinking",
    summary: "Solving problems by solving smaller versions of the same problem.",
    content: "<p>Recursion is not just a coding technique; it is a way of viewing the universe.</p>",
    publishedAt: "2025-11-05T08:00:00Z",
    readingTime: 7,
    conceptDensity: "heavy",
    tags: ["Algo", "Math"],
    imageColor: "#312e81"
  }
];
EOF

# --- 3. STATE MANAGEMENT ---

cat << 'EOF' > src/hooks/useBlogStore.js
import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [activePost, setActivePost] = useState(null);

  return (
    <BlogContext.Provider value={{ activePost, setActivePost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogStore = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogStore must be used within a BlogProvider');
  }
  return context;
};
EOF

# --- 4. UI COMPONENTS ---

cat << 'EOF' > src/components/ui/TagPill.jsx
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
EOF

cat << 'EOF' > src/components/ui/SectionHeader.jsx
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  white-space: nowrap;
`;

const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  flex-grow: 1;
`;

const SectionHeader = ({ title }) => (
  <Container>
    <Title>{title}</Title>
    <Line />
  </Container>
);

export default SectionHeader;
EOF

# --- 5. RECENT POSTS COMPONENTS ---

cat << 'EOF' > src/components/features/recent-posts/RecentPostCard.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';

const Card = styled(motion.div)`
  width: 260px;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  scroll-snap-align: start;
`;

const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${props => props.color || '#ccc'};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-radius: 2px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.1);
    transition: background 0.3s ease;
  }
  
  ${Card}:hover &::after {
    background: transparent;
  }
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Summary = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecentPostCard = ({ post }) => {
  const { setActivePost } = useBlogStore();
  
  return (
    <Card 
      whileTap={{ scale: 0.98 }}
      onClick={() => setActivePost(post)}
    >
      <ImageBox color={post.imageColor} />
      <Title>{post.title}</Title>
      <Summary>{post.summary}</Summary>
    </Card>
  );
};

export default RecentPostCard;
EOF

cat << 'EOF' > src/components/features/recent-posts/RecentPostsSection.jsx
import styled from 'styled-components';
import SectionHeader from '../../ui/SectionHeader';
import RecentPostCard from './RecentPostCard';
import { posts } from '../../../data/posts';

const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 24px;
  padding-right: 24px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  /* Hide Scrollbar */
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const RecentPostsSection = () => {
  // Sort by date desc and take top 5
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5);

  return (
    <section style={{ paddingLeft: '24px' }}>
      <SectionHeader title="Recent Posts" />
      <ScrollContainer>
        {recentPosts.map(post => (
          <RecentPostCard key={post.id} post={post} />
        ))}
      </ScrollContainer>
    </section>
  );
};

export default RecentPostsSection;
EOF

# --- 6. ALL POSTS COMPONENTS ---

cat << 'EOF' > src/components/features/all-posts/PostListItem.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';
import TagPill from '../../ui/TagPill';

const ItemContainer = styled(motion.div)`
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
  transition: color 0.2s ease;

  ${ItemContainer}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReadTime = styled.span`
  font-size: 12px;
  color: #999;
`;

const PostListItem = ({ post }) => {
  const { setActivePost } = useBlogStore();

  return (
    <ItemContainer 
      onClick={() => setActivePost(post)}
      whileTap={{ x: 4 }}
    >
      <Title>{post.title}</Title>
      <MetaRow>
        <div>
          {post.tags.slice(0, 2).map(tag => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
        <ReadTime>{post.readingTime} min read</ReadTime>
      </MetaRow>
    </ItemContainer>
  );
};

export default PostListItem;
EOF

cat << 'EOF' > src/components/features/all-posts/MonthCard.jsx
import styled from 'styled-components';
import PostListItem from './PostListItem';

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  flex-shrink: 0;
  scroll-snap-align: center;
  padding: 0 8px;
`;

const Inner = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const MonthTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const MonthCard = ({ label, posts }) => {
  return (
    <Card>
      <Inner>
        <MonthTitle>{label}</MonthTitle>
        <div>
          {posts.map(post => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      </Inner>
    </Card>
  );
};

export default MonthCard;
EOF

cat << 'EOF' > src/components/features/all-posts/AllPostsSection.jsx
import styled from 'styled-components';
import SectionHeader from '../../ui/SectionHeader';
import MonthCard from './MonthCard';
import { posts } from '../../../data/posts';

const Container = styled.section`
  padding: 0 24px;
`;

const Carousel = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 24px;
  margin: 0 -24px;
  padding-left: 16px;
  padding-right: 16px;
  scroll-snap-type: x mandatory;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AllPostsSection = () => {
  // Group posts by MonthKey (YYYY-MM)
  const grouped = posts.reduce((acc, post) => {
    // Assuming monthKey is added to post or derived
    const date = new Date(post.publishedAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!acc[key]) {
      acc[key] = { label, posts: [] };
    }
    acc[key].posts.push(post);
    return acc;
  }, {});

  const months = Object.values(grouped).sort((a, b) => {
     // Simple check, in real app stick to date sorting
     return b.label.localeCompare(a.label); 
  });

  return (
    <Container>
      <SectionHeader title="Archive" />
      <Carousel>
        {months.map((month, idx) => (
          <MonthCard key={idx} label={month.label} posts={month.posts} />
        ))}
      </Carousel>
    </Container>
  );
};

export default AllPostsSection;
EOF

# --- 7. READER COMPONENTS ---

cat << 'EOF' > src/components/features/reader/PostReader.jsx
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useBlogStore } from '../../../hooks/useBlogStore';
import { posts } from '../../../data/posts';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(250, 249, 247, 0.95);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 24px;
  padding-bottom: 80px;
`;

const ContentWrapper = styled.div`
  max-width: 680px;
  margin: 0 auto;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const HeroImage = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color};
  border-radius: 2px;
  flex-shrink: 0;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
  line-height: 1.2;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const MetaText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Body = styled.div`
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  
  h3 {
    margin-top: 32px;
    margin-bottom: 16px;
    font-size: 22px;
  }

  p {
    margin-bottom: 24px;
  }

  pre {
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 24px;
    color: #e0e0e0;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 14px;
  }
`;

const FooterNav = styled.div`
  margin-top: 64px;
  padding-top: 32px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
`;

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: ${props => props.disabled ? 0.3 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover {
    color: ${props => !props.disabled && props.theme.colors.text};
  }
`;

const PostReader = () => {
  const { activePost, setActivePost } = useBlogStore();
  
  if (!activePost) return null;

  const handleNext = () => {
    const idx = posts.findIndex(p => p.id === activePost.id);
    if (idx < posts.length - 1) setActivePost(posts[idx + 1]);
  };

  const handlePrev = () => {
    const idx = posts.findIndex(p => p.id === activePost.id);
    if (idx > 0) setActivePost(posts[idx - 1]);
  };

  const idx = posts.findIndex(p => p.id === activePost.id);
  const hasNext = idx < posts.length - 1;
  const hasPrev = idx > 0;

  return (
    <Overlay
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <Header>
        <button onClick={() => setActivePost(null)}>
          <X size={24} />
        </button>
      </Header>
      
      <ScrollContent>
        <ContentWrapper>
          <Hero>
            <HeroImage color={activePost.imageColor} />
            <Meta>
              <Title>{activePost.title}</Title>
              <MetaText>
                {new Date(activePost.publishedAt).toLocaleDateString()}
                <span>•</span>
                {activePost.readingTime} min read
              </MetaText>
            </Meta>
          </Hero>

          <Body dangerouslySetInnerHTML={{ __html: activePost.content }} />

          <FooterNav>
            <NavBtn onClick={handlePrev} disabled={!hasPrev}>
              <ArrowLeft size={16} /> Previous
            </NavBtn>
            <NavBtn onClick={handleNext} disabled={!hasNext}>
              Next <ArrowRight size={16} />
            </NavBtn>
          </FooterNav>
        </ContentWrapper>
      </ScrollContent>
    </Overlay>
  );
};

export default PostReader;
EOF

# --- 8. LAYOUT & APP ENTRY ---

cat << 'EOF' > src/components/layout/Navbar.jsx
import styled from 'styled-components';

const Nav = styled.nav`
  padding: 48px 24px 24px 24px;
  max-width: 800px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

const Tagline = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;

const Navbar = () => (
  <Nav>
    <Logo>Distant CS</Logo>
    <Tagline>Unrestricted Thoughts on Software</Tagline>
  </Nav>
);

export default Navbar;
EOF

cat << 'EOF' > src/components/layout/Main.jsx
import styled from 'styled-components';

const MainContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Main = ({ children }) => (
  <MainContainer>{children}</MainContainer>
);

export default Main;
EOF

cat << 'EOF' > src/App.jsx
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
import PostReader from './components/features/reader/PostReader';

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
EOF

# Update main.jsx to ensure clean entry
cat << 'EOF' > src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
EOF

echo "All files populated successfully."
echo "Run 'npm run dev' to start the application."
EOF
