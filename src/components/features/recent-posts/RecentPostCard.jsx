import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';
import { ArrowUpRight } from 'lucide-react';

const Card = styled(motion.div)`
  min-width: 300px;
  max-width: 300px;
  margin-right: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  
  /* Outline Style */
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  position: relative;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Image = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  filter: grayscale(100%); /* Mono until hover? */
  transition: filter 0.3s ease;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${Card}:hover & {
    filter: grayscale(0%);
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Meta = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const Summary = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  font-family: ${({ theme }) => theme.fonts.mono}; /* Tech feel for body */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  color: ${({ theme }) => theme.colors.accent};
  transition: opacity 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

export default function RecentPostCard({ post }) {
  const openPost = useBlogStore(state => state.openPost);

  return (
    <Card onClick={() => openPost(post.id)}>
      <IconWrapper><ArrowUpRight size={20} /></IconWrapper>
      <Image $src={post.featuredImage} />
      <Meta>Create_Date: {new Date(post.publishedAt).toLocaleDateString()}</Meta>
      <Title>{post.title}</Title>
      <Summary>{post.summary}</Summary>
    </Card>
  );
}
