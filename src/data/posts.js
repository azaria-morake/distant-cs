export const posts = [
  {
    id: "post_001",
    title: "Abstraction Without Understanding",
    summary: "High-level tools make us productive, but they can also make us blind to the underlying reality.",
    content: `
# The Trap of Abstraction

We often celebrate abstraction as the ultimate goal of software engineering. We hide complexity behind clean interfaces.

## The Cost

But what happens when the abstraction leaks? When the tool breaks?

\`\`\`javascript
// The classic example
const magic = () => {
  return "It just works... until it doesn't";
}
\`\`\`

We must remain capable of diving deep.
    `,
    featuredImage: "https://placehold.co/600x600/e0e0e0/1e1e1e?text=Abs",
    publishedAt: "2026-01-08T09:30:00Z",
    readingTime: 5,
    conceptDensity: "heavy",
    tags: ["ComputerScience", "Philosophy"],
    monthKey: "2026-01"
  },
  {
    id: "post_002",
    title: "The Mobile Web is Broken",
    summary: "Why native apps keep winning and what the web platform is getting wrong.",
    content: "# It is time to rethink...",
    featuredImage: "https://placehold.co/600x600/cd5d36/ffffff?text=Web",
    publishedAt: "2026-01-02T14:00:00Z",
    readingTime: 4,
    conceptDensity: "medium",
    tags: ["Web", "Mobile"],
    monthKey: "2026-01"
  },
  {
    id: "post_003",
    title: "Reflections on 2025",
    summary: "A look back at the shifting landscape of AI and development.",
    content: "# A Year of Change...",
    featuredImage: "https://placehold.co/600x600/333/fff?text=2025",
    publishedAt: "2025-12-28T10:00:00Z",
    readingTime: 7,
    conceptDensity: "light",
    tags: ["Career", "AI"],
    monthKey: "2025-12"
  }
];
