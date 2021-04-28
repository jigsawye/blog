import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';
import menu from './menu';

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0 0 auto;

  a {
    display: inline-flex;
    align-items: center;
    border: 0;
    font-size: 1em;
    margin-left: 20px;
    color: #696969;
    text-decoration: none;
    transition: color 0.2s ease;

    :hover {
      color: #000;
    }

    &.active {
      color: #0070f3;
      text-shadow: 0px 0px 1px #0070f3;
    }
  }
`;

interface NavLinkProps {
  to: string;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const router = useRouter();

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
      <a className={router.route === to ? 'active' : ''}>{children}</a>
    </Link>
  );
};

const Nav: FC = () => (
  <NavWrapper>
    {menu.map(({ title, icon, path }) => (
      <NavLink key={path} to={path}>
        {title ?? icon}
      </NavLink>
    ))}
  </NavWrapper>
);

export default Nav;
