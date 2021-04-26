import { FC } from 'react';
import styled from 'styled-components';

const CopyrightWrapper = styled.div`
  display: flex;
  vertical-align: top;
  justify-content: center;
  padding: 40px 0;
  margin: auto;

  p {
    color: #999999;
    text-align: center;
    font-size: 12px;
  }

  a {
    color: #999999;
    text-decoration: none;
    font-size: 12px;
    transition: all 0.2s ease;

    :hover {
      color: #000;
    }
  }
`;

const Copyright: FC = () => (
  <CopyrightWrapper>
    <p>
      Copyright © {new Date().getFullYear()}{' '}
      <a href="https://jigsawye.com">Evan Ye</a>, powered by{' '}
      <a href="https://nextjs.org/" rel="noopener noreferrer" target="_blank">
        Next.js
      </a>
      . All rights reserved.
    </p>
  </CopyrightWrapper>
);

export default Copyright;
