#!/bin/bash

echo "Applying Final Polish: Scrolling Nav, Compact Reader Header, Copy Button..."

# --- 1. NAVBAR (Scrolls away / Static) ---

cat << 'EOF' > src/components/layout/Navbar.jsx
import styled from 'styled-components';

const NavWrapper = styled.nav`
  background: ${({ theme }) => theme.colors.background};
  border-bottom: ${({ theme }) => theme.borders.thick};
  position: relative; /* Changed from sticky to relative so it scrolls away */
  z-index: 40;
  /* Texture */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
`;

const NavContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.03em;
`;

const Tagline = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 6px;
  display: block;
`;

const Navbar = () => (
  <NavWrapper>
    <NavContent>
      <Logo>Distant CS</Logo>
      <Tagline>Unrestricted Thoughts on Software</Tagline>
    </NavContent>
  </NavWrapper>
);

export default Navbar;
EOF

# --- 2. READER HEADER (Compact Box Container) ---

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
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
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
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 24px 120px 24px;
`;

/* Container for the Header items */
const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px; /* Tighter gap */
  padding: 16px;
  margin-bottom: 40px;
  
  /* The "Container inside parent" look */
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.borders.thick};
  border-radius: 8px;
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
          <HeaderBox>
            {/* Image Left (Compact) */}
            <PostHero color={activePost.imageColor} compact={true} />
            {/* Meta Right (Compact) */}
            <PostMeta 
              title={activePost.title}
              publishedAt={activePost.publishedAt}
              readingTime={activePost.readingTime}
              compact={true}
            />
          </HeaderBox>

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

# --- 3. POST HERO (Compact Size Logic) ---

cat << 'EOF' > src/components/features/reader/PostHero.jsx
import styled from 'styled-components';

const Container = styled.div`
  width: ${props => props.compact ? '80px' : '100%'}; /* Smaller in Reader Header */
  height: ${props => props.compact ? '80px' : 'auto'};
  aspect-ratio: 1/1;
  background-color: ${props => props.color};
  border-radius: 4px;
  flex-shrink: 0;
  border: ${({ theme }) => theme.borders.thin};
`;

const PostHero = ({ color, compact }) => (
  <Container color={color} compact={compact} />
);

export default PostHero;
EOF

# --- 4. POST META (Compact Typography) ---

cat << 'EOF' > src/components/features/reader/PostMeta.jsx
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: ${props => props.compact ? '18px' : '24px'};
  line-height: 1.3;
  font-weight: 800;
  
  @media (min-width: 768px) {
    font-size: ${props => props.compact ? '22px' : '32px'};
  }
`;

const MetaText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
`;

const PostMeta = ({ title, publishedAt, readingTime, compact }) => (
  <Container>
    <MetaText>
      {new Date(publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}
      <span>•</span>
      {readingTime} min read
    </MetaText>
    <Title compact={compact}>{title}</Title>
  </Container>
);

export default PostMeta;
EOF

# --- 5. CODE BLOCK (Explicit Copy Button) ---

cat << 'EOF' > src/components/ui/CodeBlock.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Copy, Check } from 'lucide-react';

const Block = styled.div`
  background: ${({ theme }) => theme.colors.codeBackground};
  border-radius: 8px;
  overflow: hidden;
  margin: 32px 0;
  border: 2px solid #000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #000;
  border-bottom: 1px solid #333;
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
  border: 1px solid rgba(0,0,0,0.5);
`;

const CopyBtn = styled.button`
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const Code = styled.pre`
  padding: 20px;
  overflow-x: auto;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  margin: 0;
  line-height: 1.7;
`;

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let text = "";
    if (typeof children === 'string') {
      text = children;
    } else if (children.props && children.props.children) {
      text = children.props.children;
    }
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Block>
      <Header>
        <Dots>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
        </Dots>
        <CopyBtn onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'COPIED' : 'COPY CODE'}
        </CopyBtn>
      </Header>
      <Code>
        {children}
      </Code>
    </Block>
  );
};

export default CodeBlock;
EOF

echo "Final refinements applied."
EOF
