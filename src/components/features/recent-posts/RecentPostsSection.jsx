import SectionHeader from '../../ui/SectionHeader';
import PostCarousel from './PostCarousel';
import { posts } from '../../../data/posts';

export default function RecentPostsSection() {
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 10);

  return (
    <section>
      <SectionHeader title="Recent Posts" />
      <PostCarousel posts={recentPosts} />
    </section>
  );
}
