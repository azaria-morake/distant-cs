import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useBlogStore } from '../../../hooks/useBlogStore';

const Card = styled(motion.div)`
  width: 260px;
  flex-shrink: 0;
  margin-right: 24px;
  cursor: pointer;
  scroll-snap-align: start;
  
  background-color: #b4fc2e;
  // background: ${({ theme }) => theme.colors.surface};
  //border: ${({ theme }) => theme.borders.thin};
  // border-radius: 12px;
  // border-bottom: 1px solid black;
  overflow: hidden;
  
  display: flex; 
  flex-direction: column; /* Reverted to Column */
`;

const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1/1; /* Square */
  background-color: ${props => props.color || '#ccc'};
  // border-bottom: ${({ theme }) => theme.borders.thick};
`;

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DensityPill = styled.div`
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 800;
  padding: 2px 6px;
  // border-radius: 4px;
  //border: 1px solid #000;
  background-color: ${props => {
    if (props.level === 'light') return props.theme.colors.densityLight;
    if (props.level === 'medium') return props.theme.colors.densityMedium;
    return props.theme.colors.densityHeavy;
  }};
  color: #000;
`;

const DateText = styled.span`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 3;
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
      <Content>
        <HeaderRow>
           <DateText>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric'})}</DateText>
           <DensityPill level={post.conceptDensity}>{post.conceptDensity}</DensityPill>
        </HeaderRow>
        <Title>{post.title}</Title>
      </Content>
    </Card>
  );
};

export default RecentPostCard;
