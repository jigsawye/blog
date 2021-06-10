import { FC } from 'react';
import styled from 'styled-components';

import formatDate from '../../lib/formatDate';

const Wrapper = styled.aside`
  width: 100%;
  padding: 3rem 0;
  margin-bottom: 3rem;
  border-bottom: 1px solid rgb(234, 234, 234);
`;

const Title = styled.h1`
  color: #000;
  max-width: 650px;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0px auto;
`;

const Date = styled.div`
  color: rgb(153, 153, 153);
  font-size: 12px;
  text-align: center;
  margin-top: 20px;
`;

interface ArticleTitleSectionProps {
  title: string;
  date: string;
}

const ArticleTitleSection: FC<ArticleTitleSectionProps> = ({ title, date }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Date>{formatDate(date)}</Date>
  </Wrapper>
);

export default ArticleTitleSection;
