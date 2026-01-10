import SectionHeader from '../../ui/SectionHeader';
import MonthCarousel from './MonthCarousel';
import { posts } from '../../../data/posts';
import { format, parseISO } from 'date-fns';

export default function AllPostsSection() {
  const grouped = posts.reduce((acc, post) => {
    if (!acc[post.monthKey]) acc[post.monthKey] = [];
    acc[post.monthKey].push(post);
    return acc;
  }, {});

  const sortedKeys = Object.keys(grouped).sort().reverse();

  const formatLabel = (key) => {
    const date = parseISO(`${key}-01`); 
    return format(date, 'MMMM yyyy');
  }

  return (
    <section>
      <SectionHeader title="All Posts" />
      <MonthCarousel 
        groupedPosts={grouped} 
        sortedKeys={sortedKeys} 
        formatLabel={formatLabel} 
      />
    </section>
  );
}
