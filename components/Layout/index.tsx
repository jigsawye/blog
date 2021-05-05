import { FC } from 'react';

import GlobalStyle from '../styles/GlobalStyle';

import Footer from './Footer';
import Head from './Head';
import Header from './Header';
import HeadLine from './HeadLine';

const Layout: FC = ({ children }) => (
  <>
    <GlobalStyle />
    <HeadLine />
    <Head />
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
