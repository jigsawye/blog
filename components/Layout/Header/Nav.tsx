import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { useRouter } from 'next/router';

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  margin-left: auto;
`;

const NavItem = styled.a`
  display: inline-flex;
  align-items: center;
  border: 0;
  font-size: 1em;
  height: 36px;
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
`;

// const PrimaryNavItem = styled.a`
//   display: inline-flex;
//   align-items: center;
//   border: 0;
//   font-size: 1em;
//   padding: 0 8px;
//   height: 36px;
//   margin-left: 20px;
//   text-decoration: none;
//   border: 1px solid rgba(0, 118, 255, 0.9);
//   border-radius: 7px;
//   color: #fff;
//   background-color: rgba(0, 118, 255, 0.9);
//   transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s;

//   &:hover {
//     background-color: transparent;
//     color: rgba(0, 118, 255, 0.9);
//   }
// `;

const GitHubIcon = () => (
  <NavItem
    href="https://github.com/jigsawye"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 16"
      fill="none"
      style={{ width: 24, height: 24 }}
    >
      <g clipPath="url(githublogo)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8.18391.249268C3.82241.249268.253906 3.81777.253906 8.17927c0 3.46933 2.279874 6.44313 5.451874 7.53353.3965.0991.49563-.1983.49563-.3965v-1.3878c-2.18075.4956-2.67638-.9912-2.67638-.9912-.3965-.8922-.89212-1.1895-.89212-1.1895-.69388-.4957.09912-.4957.09912-.4957.793.0992 1.1895.793 1.1895.793.69388 1.2887 1.88338.8922 2.27988.6939.09912-.4956.29737-.8921.49562-1.0904-1.78425-.1982-3.5685-.8921-3.5685-3.96496 0-.89212.29738-1.586.793-2.08162-.09912-.19825-.3965-.99125.09913-2.08163 0 0 .69387-.19825 2.18075.793.59475-.19825 1.28862-.29737 1.9825-.29737.69387 0 1.38775.09912 1.98249.29737 1.4869-.99125 2.1808-.793 2.1808-.793.3965 1.09038.1982 1.88338.0991 2.08163.4956.59475.793 1.28862.793 2.08162 0 3.07286-1.8834 3.66766-3.66764 3.86586.29737.3965.59474.8921.59474 1.586v2.1808c0 .1982.0991.4956.5948.3965 3.172-1.0904 5.4518-4.0642 5.4518-7.53353-.0991-4.3615-3.6676-7.930002-8.02909-7.930002z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="githublogo">
          <path
            fill="transparent"
            d="M0 0h15.86v15.86H0z"
            transform="translate(.253906 .0493164)"
          />
        </clipPath>
      </defs>
    </svg>
  </NavItem>
);

interface NavLinkProps {
  to: string;
}

const NavLink: FC<NavLinkProps> = ({ to, children }) => {
  const router = useRouter();

  return (
    <Link href={to} passHref>
      <NavItem className={router.route === to ? 'active' : ''}>
        {children}
      </NavItem>
    </Link>
  );
};

const Nav: FC = () => (
  <NavWrapper>
    {[
      {
        title: 'Home',
        path: '/',
      },
      {
        title: 'Archives',
        path: '/archives',
      },
      {
        title: 'About',
        path: '/about',
      },
    ].map(({ title, path }) => (
      <NavLink key={path} to={path}>
        {title}
      </NavLink>
    ))}

    {/* <Link href="/resume" passHref>
      <PrimaryNavItem>Hiring</PrimaryNavItem>
    </Link> */}

    <GitHubIcon />
  </NavWrapper>
);

export default Nav;
