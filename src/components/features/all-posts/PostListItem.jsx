import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';
import TagPill from '../../ui/TagPill';

const ItemContainer = styled(motion.div)`
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  background-color: #b4fc2e;
  padding: 10px;
  margin-bottom: 10px;

  &:last-child {
    border-bottom: 1px solid;
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
  color: #303030;
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
