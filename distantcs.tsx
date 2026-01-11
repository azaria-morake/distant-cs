import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowLeft, ArrowRight, Share2, Copy, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA SCHEMA & MOCK CONTENT ---

const MOCK_POSTS = [
  {
    id: "post_001",
    title: "Abstraction Without Understanding Is Dangerous",
    summary: "High-level tools make us productive, but they can also make us blind to the machinery that actually runs the world.",
    content: `
      <p>We build on top of mountains of sand. We call them "frameworks" and "platforms," but functionally, they are black boxes that we have ceased to open.</p>
      <p>The modern developer is often a generic consumer of APIs rather than an architect of computation. This isn't inherently bad—specialization allows for speed. But when things break, and they always break, the inability to descend the ladder of abstraction becomes a critical failure mode.</p>
      <h3>The Cost of the Black Box</h3>
      <p>Consider the humble HTTP request. In 1995, you likely crafted the socket connection manually. Today, you call <code>fetch()</code>. Tomorrow, an AI agent will do it for you. What is lost is the intuition of latency, the tangible weight of a TCP handshake.</p>
      <pre><code>// The illusion of simplicity
const data = await fetch('/api/truth');
// What actually happens here is a miracle of engineering
// that we treat as mundane.</code></pre>
      <p>We must return to the practice of "opening the box." Not for every project, and not for every line of code, but as a discipline of the mind.</p>
    `,
    publishedAt: "2026-01-07T09:30:00Z",
    readingTime: 6,
    conceptDensity: "heavy",
    tags: ["ComputerScience", "Philosophy"],
    monthKey: "2026-01",
    imageColor: "bg-orange-900" 
  },
  {
    id: "post_002",
    title: "The Unreasonable Effectiveness of Plain Text",
    summary: "Why plain text remains the only format that truly endures across decades of software rot.",
    content: "<p>Binary formats rot. Proprietary databases fade. But a .txt file from 1970 is still readable today.</p>",
    publishedAt: "2026-01-14T10:00:00Z",
    readingTime: 4,
    conceptDensity: "light",
    tags: ["SoftwareEng", "Archival"],
    monthKey: "2026-01",
    imageColor: "bg-stone-800"
  },
  {
    id: "post_003",
    title: "State Machines for UI Logic",
    summary: "Stop using booleans to manage your interface. It is time to embrace the finite state machine.",
    content: "<p>Boolean flags are the source of all evil in UI development. <code>isLoading</code>, <code>isError</code>, <code>isSuccess</code>... inevitably, you will end up with <code>isLoading && isError</code>.</p>",
    publishedAt: "2025-12-28T14:15:00Z",
    readingTime: 8,
    conceptDensity: "medium",
    tags: ["WebDev", "Patterns"],
    monthKey: "2025-12",
    imageColor: "bg-teal-900"
  },
  {
    id: "post_004",
    title: "On The Fragility of NPM",
    summary: "The house of cards we built on top of semantic versioning.",
    content: "<p>One deleted package left-pad broke the internet. Have we learned anything since then?</p>",
    publishedAt: "2025-12-10T11:00:00Z",
    readingTime: 5,
    conceptDensity: "medium",
    tags: ["Infra", "Rant"],
    monthKey: "2025-12",
    imageColor: "bg-red-900"
  },
  {
    id: "post_005",
    title: "Recursive Thinking",
    summary: "Solving problems by solving smaller versions of the same problem.",
    content: "<p>Recursion is not just a coding technique; it is a way of viewing the universe.</p>",
    publishedAt: "2025-11-05T08:00:00Z",
    readingTime: 7,
    conceptDensity: "heavy",
    tags: ["Algo", "Math"],
    monthKey: "2025-11",
    imageColor: "bg-indigo-900"
  }
];

// --- UTILS ---

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
};

// Group posts by month for the "All Posts" section
const getPostsByMonth = (posts) => {
  const groups = {};
  posts.forEach(post => {
    if (!groups[post.monthKey]) {
      const date = new Date(post.publishedAt);
      groups[post.monthKey] = {
        label: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date),
        posts: []
      };
    }
    groups[post.monthKey].posts.push(post);
  });
  return Object.values(groups);
};

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="w-full pt-12 pb-6 px-6 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold tracking-tight text-[#1E1E1E]">Distant CS</h1>
    <p className="text-sm text-gray-500 mt-1 font-medium">Unrestricted Thoughts on Software</p>
  </nav>
);

const TagPill = ({ label }) => (
  <span className="inline-block bg-gray-100 text-gray-600 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md mr-2">
    #{label}
  </span>
);

const RecentPostCard = ({ post, onClick }) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={() => onClick(post)}
    className="flex-shrink-0 w-64 mr-4 cursor-pointer snap-start"
  >
    <div className={`w-full aspect-square ${post.imageColor} rounded-sm mb-3 relative overflow-hidden group`}>
       <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
    </div>
    <h3 className="text-sm font-semibold text-[#1E1E1E] leading-tight mb-1 line-clamp-2">
      {post.title}
    </h3>
    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
      {post.summary}
    </p>
  </motion.div>
);

const PostListItem = ({ post, onClick }) => (
  <motion.div 
    whileTap={{ x: 4 }}
    onClick={() => onClick(post)}
    className="py-4 border-b border-gray-100 last:border-0 cursor-pointer group"
  >
    <div className="flex justify-between items-baseline">
      <h4 className="text-base font-medium text-[#1E1E1E] group-hover:text-orange-800 transition-colors duration-200">
        {post.title}
      </h4>
    </div>
    <div className="flex items-center mt-2">
      {post.tags.slice(0, 2).map(tag => <TagPill key={tag} label={tag} />)}
      <span className="text-xs text-gray-400 ml-auto">{post.readingTime} min read</span>
    </div>
  </motion.div>
);

const MonthCard = ({ monthData, onPostClick }) => (
  <div className="w-full max-w-md flex-shrink-0 snap-center px-2">
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">
        {monthData.label}
      </h3>
      <div className="flex flex-col">
        {monthData.posts.map(post => (
          <PostListItem key={post.id} post={post} onClick={onPostClick} />
        ))}
      </div>
    </div>
  </div>
);

const DensityIndicator = ({ level }) => {
  const config = {
    light: { label: 'Light', color: 'bg-green-100 text-green-700' },
    medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
    heavy: { label: 'Heavy', color: 'bg-orange-100 text-orange-800' },
  };
  const { label, color } = config[level] || config.medium;
  
  return (
    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${color}`}>
      {label} Density
    </span>
  );
};

const PostReader = ({ post, onClose, onNext, onPrev }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const progress = scrollTop / (scrollHeight - clientHeight);
      setScrollProgress(progress);
    }
  };

  if (!post) return null;

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-[#FAF9F7] flex flex-col"
    >
      {/* Scroll Progress Bar */}
      <div className="absolute right-1 top-20 bottom-20 w-1 bg-gray-200 rounded-full z-50 hidden md:block">
        <div 
          className="w-full bg-orange-700 rounded-full transition-all duration-100"
          style={{ height: `${Math.min(scrollProgress * 100, 100)}%` }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50 bg-[#FAF9F7]/95 backdrop-blur-sm shrink-0">
        <button 
          onClick={onClose} 
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} className="text-[#1E1E1E]" />
        </button>
        <div className="flex gap-4">
           <Share2 size={18} className="text-gray-400 hover:text-[#1E1E1E] transition-colors cursor-pointer" />
        </div>
      </div>

      {/* Content Area */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="max-w-2xl mx-auto px-6 pb-24 pt-4">
          
          {/* Hero */}
          <div className="flex flex-col md:flex-row gap-6 mb-10 items-start">
            <div className={`w-24 h-24 md:w-32 md:h-32 shrink-0 ${post.imageColor} rounded-sm shadow-sm`} />
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>{formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{post.readingTime} min read</span>
                <span>•</span>
                <DensityIndicator level={post.conceptDensity} />
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="prose prose-stone prose-lg max-w-none text-[#1E1E1E]">
            {/* Rendering mock HTML content safely */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            {/* Example Code Block Visualization */}
            <div className="my-8 bg-[#2d2d2d] rounded-md overflow-hidden text-gray-200 text-sm font-mono border border-gray-800 shadow-sm">
              <div className="flex justify-between items-center px-4 py-2 bg-[#1e1e1e] border-b border-gray-800">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <Copy size={14} className="text-gray-500 hover:text-white cursor-pointer" />
              </div>
              <div className="p-4 overflow-x-auto">
                <pre><code>{`// A Distant CS thought pattern
function understand(system) {
  if (isBlackBox(system)) {
    return open(system);
  }
  return simplify(system);
}`}</code></pre>
              </div>
            </div>

            <p>
              This is filler text to demonstrate the typography and reading experience. 
              The goal is a calm, focused environment. No popups, no newsletters, 
              just the transmission of ideas.
            </p>
          </div>

          {/* Footer Nav */}
          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between text-sm font-medium text-gray-500">
            <button 
              onClick={onPrev}
              disabled={!onPrev}
              className={`flex items-center gap-2 ${!onPrev ? 'opacity-30 cursor-not-allowed' : 'hover:text-[#1E1E1E]'}`}
            >
              <ArrowLeft size={16} /> Previous
            </button>
            <button 
              onClick={onNext}
              disabled={!onNext}
              className={`flex items-center gap-2 ${!onNext ? 'opacity-30 cursor-not-allowed' : 'hover:text-[#1E1E1E]'}`}
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

export default function DistantCS() {
  const [activePost, setActivePost] = useState(null);
  const postsByMonth = getPostsByMonth(MOCK_POSTS);

  // Navigation Logic
  const handleNextPost = () => {
    const currentIndex = MOCK_POSTS.findIndex(p => p.id === activePost.id);
    if (currentIndex < MOCK_POSTS.length - 1) {
      setActivePost(MOCK_POSTS[currentIndex + 1]);
    }
  };

  const handlePrevPost = () => {
    const currentIndex = MOCK_POSTS.findIndex(p => p.id === activePost.id);
    if (currentIndex > 0) {
      setActivePost(MOCK_POSTS[currentIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans selection:bg-orange-100 selection:text-orange-900 pb-20">
      <Navbar />

      <main className="max-w-2xl mx-auto space-y-12">
        
        {/* Recent Posts Section */}
        <section className="pl-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Recent Posts</h2>
            <div className="h-px bg-gray-200 flex-grow mr-6" />
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar pr-6">
            {MOCK_POSTS.slice(0, 5).map(post => (
              <RecentPostCard 
                key={post.id} 
                post={post} 
                onClick={setActivePost} 
              />
            ))}
          </div>
        </section>

        {/* All Posts Section */}
        <section className="px-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Archive</h2>
            <div className="h-px bg-gray-200 flex-grow" />
          </div>

          {/* Month Carousel */}
          <div className="flex overflow-x-auto pb-6 -mx-6 px-4 snap-x snap-mandatory no-scrollbar">
            {postsByMonth.map((monthData, idx) => (
              <MonthCard 
                key={idx} 
                monthData={monthData} 
                onPostClick={setActivePost} 
              />
            ))}
          </div>
        </section>

      </main>

      {/* Reader Modal */}
      <AnimatePresence>
        {activePost && (
          <PostReader 
            post={activePost} 
            onClose={() => setActivePost(null)} 
            onNext={MOCK_POSTS.indexOf(activePost) < MOCK_POSTS.length - 1 ? handleNextPost : null}
            onPrev={MOCK_POSTS.indexOf(activePost) > 0 ? handlePrevPost : null}
          />
        )}
      </AnimatePresence>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
