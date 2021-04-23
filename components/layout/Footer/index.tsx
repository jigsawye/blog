import styled from 'styled-components';

import Copyright from './Copyright';

const FooterWrapper = styled.footer`
  background: #fafafa;
  border-top: 1px solid #eaeaea;
`;

const Footer = () => (
  <FooterWrapper>
    <Copyright />
  </FooterWrapper>
);

export default Footer;
