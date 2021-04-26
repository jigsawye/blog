import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const LogoWrapper = styled.aside`
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoLink = styled.a`
  display: block;
  width: 28px;
  height: 24px;
  position: relative;
`;

const Logo: FC = () => (
  <LogoWrapper>
    <Link href="/" passHref>
      <LogoLink>
        <img src="/favicon.png" height="28px" width="28px" alt="Logo" />
      </LogoLink>
    </Link>
  </LogoWrapper>
);

export default Logo;
