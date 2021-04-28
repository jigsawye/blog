import styled from 'styled-components';

const ArticleContent = styled.div`
  font-weight: 400;
  font-size: 1em;
  line-height: 1.8;

  p {
    margin-bottom: 20px;
  }

  a {
    color: #0074de;
    font-size: inherit;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #68b5fb;
    }
  }

  h2 {
    margin-top: 2.5rem;
  }

  h3 {
    margin-top: 2rem;
  }

  strong {
    font-weight: 600;
  }

  blockquote {
    border-left: 5px solid;
    margin: 0;
    padding-left: 10px;
  }

  ul {
    list-style: none;
    margin-bottom: 32px;

    li {
      font-size: 1em;
      line-height: 24px;
      margin-bottom: 8px;

      ul {
        margin-top: 10px;
      }

      :before {
        content: '-';
        display: block;
        color: #6d6d6d;
        position: absolute;
        margin-left: -25px;
      }
    }
  }

  img {
    width: 100%;
    display: block;
    text-align: center;
    margin: 40px 0px;
  }

  code[class*='language-text'],
  code:not([class*='language-']) {
    color: rgb(212, 0, 255);
    font-size: 14px;
    white-space: pre-wrap;

    :before {
      content: '\`';
    }

    :after {
      content: '\`';
    }
  }
`;

export default ArticleContent;
