export const posts = [
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
    imageUrl: "/1.jpeg"
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
    imageUrl: "/2.jpeg"
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
    imageUrl: "/3.jpeg"
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
    imageUrl: "/4.jpeg"
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
    imageUrl: "/1.jpeg"
  }
];
