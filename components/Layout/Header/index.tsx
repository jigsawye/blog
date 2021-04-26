import { FC } from 'react';
import styled from 'styled-components';

import { Container } from '../../common';

import Logo from './Logo';
import Nav from './Nav';

const HeaderWrapper = styled(Container)`
  margin: auto;
  position: relative;
  display: flex;
  flex-direction: row;
`;

const Header: FC = () => (
  <HeaderWrapper>
    <Logo />
    <Nav />
  </HeaderWrapper>
);

export default Header;
