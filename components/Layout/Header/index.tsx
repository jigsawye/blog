import { FC } from 'react';
import styled from 'styled-components';

import { Container } from '../../common';

import Logo from './Logo';
import Nav from './Nav';

const HeaderWrapper = styled.header`
  > div {
    margin: auto;
    position: relative;
    display: flex;
  }

  border-bottom: 1px solid rgb(234, 234, 234);
`;

const Header: FC = () => (
  <HeaderWrapper>
    <Container>
      <Logo />
      <Nav />
    </Container>
  </HeaderWrapper>
);

export default Header;
