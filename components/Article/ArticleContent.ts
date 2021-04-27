import styled from 'styled-components';

const ArticleContent = styled.div`
  font-weight: 400;
  font-size: 14px;
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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    font-size: 18px;
    margin-top: 40px;
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
    list-style-type: none;
    margin-left: 15px;
    padding: 0px;

    li {
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 10px;

      ul {
        margin-top: 10px;
      }

      :before {
        content: '-';
        display: inline-block;
        color: rgb(153, 153, 153);
        position: absolute;
        margin-left: -15px;
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
    color: rgb(189, 16, 224);
    font-size: 0.9em;
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
