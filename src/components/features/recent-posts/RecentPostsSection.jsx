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
