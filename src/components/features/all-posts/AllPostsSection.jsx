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
