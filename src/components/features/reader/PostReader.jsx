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
  // background: ${({ theme }) => theme.colors.surface};
  // border: ${({ theme }) => theme.borders.thick};
  // border-radius: 8px;
  background-color: #b4fc2e;
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
