import styled from 'styled-components';

const Body = styled.div`
  font-size: 18px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 40px;
  
  h3 {
    margin-top: 32px;
    margin-bottom: 16px;
    font-size: 22px;
  }

  p {
    margin-bottom: 24px;
  }

  /* Basic styling for when content is injected */
  pre {
    background: ${({ theme }) => theme.colors.codeBackground};
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin-bottom: 24px;
    color: #e0e0e0;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 14px;
  }
  
  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: rgba(0,0,0,0.05);
    padding: 2px 4px;
    border-radius: 2px;
    font-size: 0.9em;
  }
  
  pre code {
    background: transparent;
    padding: 0;
  }
`;

const PostContent = ({ htmlContent }) => (
  <Body dangerouslySetInnerHTML={{ __html: htmlContent }} />
);

export default PostContent;
