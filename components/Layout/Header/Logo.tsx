import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';

const LogoWrapper = styled.aside`
  display: flex;
  align-items: center;
`;

const LogoLink = styled.a`
  display: inline-flex;
`;

const Logo: FC = () => (
  <LogoWrapper>
    <Link href="/" passHref>
      <LogoLink>
        <Image src="/favicon.png" height="40px" width="40px" alt="Logo" />
      </LogoLink>
    </Link>
  </LogoWrapper>
);

export default Logo;
