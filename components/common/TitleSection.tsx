import { FC } from 'react';
import styled from 'styled-components';

const Wrapper = styled.aside`
  padding: 30px 0 50px;
  border-bottom: 1px solid rgb(234, 234, 234);
`;

const Title = styled.h1`
  color: #000;
  font-weight: 400;
  font-size: 32px;
  text-align: center;
`;

const TitleSection: FC = ({ children }) => (
  <Wrapper>
    <Title>{children}</Title>
  </Wrapper>
);

export default TitleSection;
