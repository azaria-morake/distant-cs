import React, { useState } from 'react';
import styled from 'styled-components';
import { Copy, Check } from 'lucide-react';

const Block = styled.div`
  background: ${({ theme }) => theme.colors.codeBackground};
  border-radius: 8px;
  overflow: hidden;
  margin: 32px 0;
  border: 2px solid #000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #000;
  border-bottom: 1px solid #333;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 1px solid rgba(0,0,0,0.5);
`;

const CopyBtn = styled.button`
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 8px;
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const Code = styled.pre`
  padding: 20px;
  overflow-x: auto;
  color: #fff;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  margin: 0;
  line-height: 1.7;
`;

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    let text = "";
    if (typeof children === 'string') {
      text = children;
    } else if (children.props && children.props.children) {
      text = children.props.children;
    }
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Block>
      <Header>
        <Dots>
          <Dot color="#ff5f56" />
          <Dot color="#ffbd2e" />
          <Dot color="#27c93f" />
        </Dots>
        <CopyBtn onClick={handleCopy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'COPIED' : 'COPY CODE'}
        </CopyBtn>
      </Header>
      <Code>
        {children}
      </Code>
    </Block>
  );
};

export default CodeBlock;
