import { FC } from 'react';

import GlobalStyle from '../styles/GlobalStyle';

import Footer from './Footer';
import Head from './Head';
import Header from './Header';

const Layout: FC = ({ children }) => (
  <>
    <GlobalStyle />
    <Head />
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
