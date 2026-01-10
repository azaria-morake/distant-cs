import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import CodeBlock from '../../ui/CodeBlock';

const Wrapper = styled.div`
  font-size: 1.125rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4rem;

  h1, h2, h3 { margin-top: 2.5rem; margin-bottom: 1rem; }
  p { margin-bottom: 1.5rem; }
  
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
`;

export default function PostContent({ content }) {
  return (
    <Wrapper>
      <ReactMarkdown
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline ? (
              <CodeBlock className={className}>
                {String(children).replace(/\n$/, '')}
              </CodeBlock>
            ) : (
              <code style={{ 
                background: '#F2F0ED', 
                padding: '2px 6px', 
                borderRadius: '4px',
                fontSize: '0.9em' 
              }} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Wrapper>
  );
}
