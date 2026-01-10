import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* RESET EVERYTHING */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    /* FORCE BLACK BACKGROUND */
    background-color: #050505 !important; 
    color: #E0E0E0;
    overflow-x: hidden;
  }

  body {
    font-family: 'Inter', sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }

  h1, h2, h3, h4 {
    font-weight: 600;
    letter-spacing: -0.04em;
    text-transform: uppercase;
    color: #E0E0E0;
  }
  
  /* FORCE LINK COLORS */
  a { color: #00F0FF; }
`;
