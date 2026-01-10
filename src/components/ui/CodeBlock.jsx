import { useState } from 'react';
import styled from 'styled-components';
import { Copy, Check } from 'lucide-react';

const Container = styled.div`
  position: relative;
  margin: 2rem 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
  background: #EAE8E4; /* Slightly darker than code bg */
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  &:hover { color: ${({ theme }) => theme.colors.text}; }
`;

const Pre = styled.pre`
  background: ${({ theme }) => theme.colors.codeBackground};
  padding: 16px;
  overflow-x: auto;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.9rem;
  line-height: 1.6;
  
  code {
    background: none;
    padding: 0;
  }
`;

export default function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const codeText = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <CopyButton onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </CopyButton>
      </Header>
      <Pre className={className}>
        <code>{children}</code>
      </Pre>
    </Container>
  );
}
