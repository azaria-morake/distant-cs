#!/bin/bash

echo "Populating missing granular components..."

# --- 1. UI COMPONENTS ---

cat << 'EOF' > src/components/ui/CodeBlock.jsx
import styled from 'styled-components';
import { Copy } from 'lucide-react';

const Block = styled.div`
  background: ${({ theme }) => theme.colors.codeBackground};
  border-radius: 4px;
  overflow: hidden;
  margin: 24px 0;
  border: 1px solid rgba(255,255,255,0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: rgba(0,0,0,0.2);
  border-bottom: 1px solid rgba(255,255,255,0.05);
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0.5;
`;

const Code = styled.pre`
  padding: 16px;
  overflow-x: auto;
  color: #e0e0e0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  margin: 0;
`;

const CodeBlock = ({ children }) => (
  <Block>
    <Header>
      <Dots>
        <Dot color="#ff5f56" />
        <Dot color="#ffbd2e" />
        <Dot color="#27c93f" />
      </Dots>
      <Copy size={14} color="#666" style={{ cursor: 'pointer' }} />
    </Header>
    <Code>
      <code>{children}</code>
    </Code>
  </Block>
);

export default CodeBlock;
EOF

cat << 'EOF' > src/components/ui/ScrollIndicator.jsx
import styled from 'styled-components';

const Track = styled.div`
  position: absolute;
  right: 4px;
  top: 80px;
  bottom: 80px;
  width: 4px;
  background: rgba(0,0,0,0.05);
  border-radius: 2px;
  z-index: 60;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Thumb = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.accent};
  border-radius: 2px;
  transition: height 0.1s linear;
`;

const ScrollIndicator = ({ progress }) => {
  return (
    <Track>
      <Thumb style={{ height: `${Math.min(progress * 100, 100)}%` }} />
    </Track>
  );
};

export default ScrollIndicator;
EOF

cat << 'EOF' > src/components/ui/ShareButton.jsx
import styled from 'styled-components';
import { Share2 } from 'lucide-react';

const Btn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const ShareButton = ({ onClick }) => (
  <Btn onClick={onClick}>
    <Share2 size={18} />
  </Btn>
);

export default ShareButton;
EOF

# --- 2. LAYOUT ---

cat << 'EOF' > src/components/layout/Footer.jsx
import styled from 'styled-components';

const Container = styled.footer`
  padding: 48px 24px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 800px;
  margin: 0 auto;
  margin-top: auto;
`;

const Text = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Footer = () => (
  <Container>
    <Text>© {new Date().getFullYear()} Distant CS. All rights reserved.</Text>
  </Container>
);

export default Footer;
EOF

# --- 3. READER COMPONENTS (Granular) ---

cat << 'EOF' > src/components/features/reader/ShareActions.jsx
import React from 'react';
import ShareButton from '../../ui/ShareButton';

const ShareActions = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  return <ShareButton onClick={handleShare} />;
};

export default ShareActions;
EOF

cat << 'EOF' > src/components/features/reader/ReaderHeader.jsx
import styled from 'styled-components';
import { X } from 'lucide-react';
import ShareActions from './ShareActions';

const Container = styled.div`
  flex-shrink: 0;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(250, 249, 247, 0.95);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 10;
`;

const CloseBtn = styled.button`
  padding: 8px;
  margin-left: -8px;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    background: rgba(0,0,0,0.05);
    border-radius: 50%;
  }
`;

const ReaderHeader = ({ onClose }) => (
  <Container>
    <CloseBtn onClick={onClose}>
      <X size={24} />
    </CloseBtn>
    <ShareActions />
  </Container>
);

export default ReaderHeader;
EOF

cat << 'EOF' > src/components/features/reader/PostHero.jsx
import styled from 'styled-components';

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${props => props.color};
  border-radius: 2px;
  flex-shrink: 0;
`;

const PostHero = ({ color }) => (
  <Container color={color} />
);

export default PostHero;
EOF

cat << 'EOF' > src/components/features/reader/PostMeta.jsx
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
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
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const PostMeta = ({ title, publishedAt, readingTime }) => (
  <Container>
    <Title>{title}</Title>
    <MetaText>
      {new Date(publishedAt).toLocaleDateString()}
      <span>•</span>
      {readingTime} min read
    </MetaText>
  </Container>
);

export default PostMeta;
EOF

cat << 'EOF' > src/components/features/reader/PostContent.jsx
import styled from 'styled-components';

const Body = styled.div`
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 40px;
  
  h3 {
    margin-top: 32px;
    margin-bottom: 16px;
    font-size: 22px;
  }

  p {
    margin-bottom: 24px;
  }

  /* Basic styling for when content is injected */
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
  
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: rgba(0,0,0,0.05);
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 0.9em;
  }
  
  pre code {
    background: transparent;
    padding: 0;
  }
`;

const PostContent = ({ htmlContent }) => (
  <Body dangerouslySetInnerHTML={{ __html: htmlContent }} />
);

export default PostContent;
EOF

cat << 'EOF' > src/components/features/reader/PostNavigation.jsx
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Container = styled.div`
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

const PostNavigation = ({ onNext, onPrev, hasNext, hasPrev }) => (
  <Container>
    <NavBtn onClick={onPrev} disabled={!hasPrev}>
      <ArrowLeft size={16} /> Previous
    </NavBtn>
    <NavBtn onClick={onNext} disabled={!hasNext}>
      Next <ArrowRight size={16} />
    </NavBtn>
  </Container>
);

export default PostNavigation;
EOF

# --- 4. REFACTORING PARENTS TO USE GRANULAR COMPONENTS ---

# Refactor PostReader to use the components created above
cat << 'EOF' > src/components/features/reader/PostReader.jsx
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';
import { posts } from '../../../data/posts';

import ReaderHeader from './ReaderHeader';
import PostHero from './PostHero';
import PostMeta from './PostMeta';
import PostContent from './PostContent';
import PostNavigation from './PostNavigation';
import ScrollIndicator from '../../ui/ScrollIndicator';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const ScrollContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
`;

const ContentWrapper = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 24px;
  padding-bottom: 80px;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const PostReader = () => {
  const { activePost, setActivePost } = useBlogStore();
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  if (!activePost) return null;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);
    }
  };

  const idx = posts.findIndex(p => p.id === activePost.id);
  const hasNext = idx < posts.length - 1;
  const hasPrev = idx > 0;

  const handleNext = () => { if (hasNext) setActivePost(posts[idx + 1]); };
  const handlePrev = () => { if (hasPrev) setActivePost(posts[idx - 1]); };

  return (
    <Overlay
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      <ReaderHeader onClose={() => setActivePost(null)} />
      <ScrollIndicator progress={scrollProgress} />
      
      <ScrollContent ref={scrollRef} onScroll={handleScroll}>
        <ContentWrapper>
          <HeaderSection>
            <PostHero color={activePost.imageColor} />
            <PostMeta 
              title={activePost.title}
              publishedAt={activePost.publishedAt}
              readingTime={activePost.readingTime}
            />
          </HeaderSection>

          <PostContent htmlContent={activePost.content} />

          <PostNavigation 
            onNext={handleNext} 
            onPrev={handlePrev} 
            hasNext={hasNext} 
            hasPrev={hasPrev} 
          />
        </ContentWrapper>
      </ScrollContent>
    </Overlay>
  );
};

export default PostReader;
EOF

# --- 5. CAROUSELS ---

cat << 'EOF' > src/components/features/recent-posts/PostCarousel.jsx
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 24px;
  padding-right: 24px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const PostCarousel = ({ children }) => (
  <Container>{children}</Container>
);

export default PostCarousel;
EOF

cat << 'EOF' > src/components/features/all-posts/MonthCarousel.jsx
import styled from 'styled-components';

const Container = styled.div`
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

const MonthCarousel = ({ children }) => (
  <Container>{children}</Container>
);

export default MonthCarousel;
EOF

# Update RecentPostsSection to use PostCarousel
cat << 'EOF' > src/components/features/recent-posts/RecentPostsSection.jsx
import React from 'react';
import SectionHeader from '../../ui/SectionHeader';
import RecentPostCard from './RecentPostCard';
import PostCarousel from './PostCarousel';
import { posts } from '../../../data/posts';

const RecentPostsSection = () => {
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5);

  return (
    <section style={{ paddingLeft: '24px' }}>
      <SectionHeader title="Recent Posts" />
      <PostCarousel>
        {recentPosts.map(post => (
          <RecentPostCard key={post.id} post={post} />
        ))}
      </PostCarousel>
    </section>
  );
};

export default RecentPostsSection;
EOF

# Update AllPostsSection to use MonthCarousel
cat << 'EOF' > src/components/features/all-posts/AllPostsSection.jsx
import React from 'react';
import styled from 'styled-components';
import SectionHeader from '../../ui/SectionHeader';
import MonthCard from './MonthCard';
import MonthCarousel from './MonthCarousel';
import { posts } from '../../../data/posts';

const Container = styled.section`
  padding: 0 24px;
`;

const AllPostsSection = () => {
  const grouped = posts.reduce((acc, post) => {
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
     return b.label.localeCompare(a.label); 
  });

  return (
    <Container>
      <SectionHeader title="Archive" />
      <MonthCarousel>
        {months.map((month, idx) => (
          <MonthCard key={idx} label={month.label} posts={month.posts} />
        ))}
      </MonthCarousel>
    </Container>
  );
};

export default AllPostsSection;
EOF

# --- 6. DATA MOCK & FOOTER ---

cat << 'EOF' > src/data/mock-content.js
// Fallback content if needed, though posts.js is primary
export const placeholderText = "Lorem ipsum dolor sit amet...";
EOF

# Update Main.jsx to include Footer
cat << 'EOF' > src/components/layout/Main.jsx
import styled from 'styled-components';
import Footer from './Footer';

const MainContainer = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const Main = ({ children }) => (
  <>
    <MainContainer>{children}</MainContainer>
    <Footer />
  </>
);

export default Main;
EOF

echo "Granular components populated."
EOF
