import styled from 'styled-components';

export { default as ArticleTitleSection } from './ArticleTitleSection';
export { default as ArticleWrapper } from './ArticleWrapper';

export const DateWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  color: rgb(153, 153, 153);
  font-size: 12px;
`;

export const TitleLink = styled.a`
  color: #000;
  text-decoration: none;
`;

export const ReadMoreLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  margin: -0.25rem -0.5rem;
  margin-top: 16px;
  border-radius: 7px;
  color: #0070f3;
  background-color: transparent;
  border: none;
  font-size: 16px;
  line-height: 26.4px;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &:hover {
    color: #0070f3;
    background: rgba(0, 118, 255, 0.1);
  }
`;

export const BackToIndexLink = styled.a`
  margin-top: 128px;
  padding: 0 56px;
  height: 45px;
  line-height: 2.8rem;
  border-radius: 7px;
  background-color: #0070f3;
  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  color: white;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  border-radius: 7px;
  border: none;
  font-size: inherit;
  line-height: inherit;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  outline: none;

  &:hover {
    background: rgba(0, 118, 255, 0.9);
    box-shadow: 0 6px 20px rgb(0 118 255 / 23%);
  }

  &:active {
    background: #006ae6;
  }
`;
