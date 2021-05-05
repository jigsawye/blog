import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeadLineWrapper = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  background: #000;
  color: #fff;
  height: 50px;
  display: flex;

  a {
    color: #fff;
    text-decoration: none;
  }

  span.desktop {
    display: block;
  }
  span.mobile {
    display: none;
  }

  @media (max-width: 640px) {
    span.desktop {
      display: none;
    }

    span.mobile {
      display: block;
    }
  }
`;

const HeadLine: FC = () => (
  <HeadLineWrapper>
    <Link href="/resume" passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        <span className="desktop">
          <b>Senior frontend developer</b> seeking new opportunities →
        </span>
        <span className="mobile">Looking for new opportunities →</span>
      </a>
    </Link>
  </HeadLineWrapper>
);

export default HeadLine;
