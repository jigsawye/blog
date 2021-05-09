import { css } from 'styled-components';

export default css`
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
      'Helvetica Neue', sans-serif;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.65;
  }

  ::selection {
    background-color: #0070f3;
    color: #fff;
  }

  code,
  pre {
    font-family: Menlo, Monaco, Consolas, 'Courier New', 'Roboto Mono',
      monospace !important;
  }
`;
