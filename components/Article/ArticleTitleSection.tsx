import { FC } from 'react';
import styled from 'styled-components';

import formatDate from '../../lib/formatDate';

const Wrapper = styled.aside`
  width: 100%;
  padding-bottom: 10px;
  margin-top: 35px;
  margin-bottom: 80px;
  border-bottom: 1px solid rgb(234, 234, 234);
`;

const Title = styled.h1`
  color: rgb(0, 0, 0);
  font-weight: 400;
  font-size: 32px;
  max-width: 650px;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 42px;
  margin: 0px auto;
`;

const Date = styled.div`
  color: rgb(153, 153, 153);
  font-size: 12px;
  text-align: center;
  margin: 20px 0px 40px;
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
