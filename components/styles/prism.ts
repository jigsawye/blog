import { css } from 'styled-components';

const githubColors = {
  blue: '#005cc5',
  green: '#22863a',
  orange: '#d73a49',
  purple: '#6f42c1',
  black: '#24292e',
  darkBlue: '#032f62',
  gray: '#6a737d',
  greenLight: '#e6ffed',
  redLight: '#ffdce0',
};

const prismColors = {
  char: githubColors.green,
  comment: githubColors.gray,
  keyword: githubColors.orange,
  lineHighlight: '#ddd',
  primitive: githubColors.blue,
  string: githubColors.darkBlue,
  variable: githubColors.blue,
  boolean: githubColors.blue,
  punctuation: githubColors.black,
  tag: githubColors.orange,
  function: githubColors.blue,
  className: githubColors.purple,
  method: githubColors.blue,
  operator: githubColors.orange,
};

export default css`
  .remark-highlight {
    font-size: 13px;
    background-color: #fff;
    color: #000;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(234, 234, 234);
    margin: 40px 0px;
    padding: 20px;
    overflow: auto;
  }

  .remark-highlight code[class*='language-'],
  .remark-highlight pre[class*='language-'],
  .remark-highlight pre.prism-code {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }

  .remark-highlight + .remark-highlight {
    margin-top: 20;
  }

  .remark-highlight-code-line {
    background-color: ${prismColors.lineHighlight};
    display: block;
    margin: -0.125rem calc(-1rem - 15px);
    padding: 0.125rem calc(1rem + 15px);
  }

  .token.attr-name {
    color: ${prismColors.keyword};
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${prismColors.comment};
  }

  .token.property,
  .token.number,
  .token.function-name,
  .token.constant,
  .token.symbol {
    color: ${prismColors.primitive};
  }

  .token.deleted {
    background-color: ${githubColors.redLight};
  }

  .token.boolean {
    color: ${prismColors.boolean};
  }

  .token.tag {
    color: ${prismColors.tag};
  }

  .token.string {
    color: ${prismColors.string};
  }

  .token.punctuation {
    color: ${prismColors.punctuation};
  }

  .token.selector,
  .token.char,
  .token.builtin {
    color: ${prismColors.char};
  }

  .token.inserted {
    background-color: ${githubColors.greenLight};
  }

  .token.function {
    color: ${prismColors.function};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .token.variable {
    color: ${prismColors.variable};
  }

  .token.attr-value {
    color: ${prismColors.string};
  }

  .token.keyword {
    color: ${prismColors.keyword};
  }

  .token.atrule,
  .token.class-name {
    color: ${prismColors.className};
  }

  .token.important {
    font-weight: 400;
  }

  .token.bold {
    font-weight: 700;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .namespace {
    opacity: 0.7;
  }
`;
