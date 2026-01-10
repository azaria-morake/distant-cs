import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';
import { posts } from '../../../data/posts';

// Import our new breakdown components
import ReaderHeader from './ReaderHeader';
import PostHero from './PostHero';
import PostMeta from './PostMeta';
import PostContent from './PostContent';
import ShareActions from './ShareActions';
import PostNavigation from './PostNavigation';
import ScrollIndicator from '../../ui/ScrollIndicator';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 100;
  overflow-y: auto;
  padding-bottom: 80px;

/* Add a border on the left if on desktop to make it feel like a drawer */
  @media (min-width: 800px) {
    border-left: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const ContentContainer = styled.article`
  max-width: 680px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export default function PostReader() {
  const { activePostId } = useBlogStore();
  const post = posts.find(p => p.id === activePostId);
  const scrollRef = useRef(null);

  // Disable body scroll on parent when reader is open
  useEffect(() => {
    if (activePostId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [activePostId]);

  return (
    <AnimatePresence>
      {post && (
        <Overlay
          ref={scrollRef}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <ScrollIndicator targetRef={scrollRef} />
          <ReaderHeader />

          <ContentContainer>
            <PostHero src={post.featuredImage} />
            <PostMeta post={post} />
            <ShareActions title={post.title} />
            <PostContent content={post.content} />
            <PostNavigation currentPostId={post.id} />
          </ContentContainer>

        </Overlay>
      )}
    </AnimatePresence>
  );
}
