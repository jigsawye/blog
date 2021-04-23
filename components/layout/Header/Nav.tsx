import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import menu from './menu';

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0 0 auto;

  a {
    border: 0;
    font-size: 12px;
    padding: 10px;
    color: #999;
    text-transform: uppercase;
    text-decoration: none;
    transition: color 0.2s ease;

    &.active {
      color: #000;
    }

    :hover {
      background: none;
      color: #000;
    }
  }
`;

interface NavLinkProps {
  to: string;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  if (to.startsWith('http')) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={to} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>
        {children}
      </a>
    </Link>
  );
};

const Nav = () => (
  <NavWrapper>
    {menu.map(({ title, path }) => (
      <NavLink to={path} key={title}>
        {title}
      </NavLink>
    ))}
  </NavWrapper>
);

export default Nav;
