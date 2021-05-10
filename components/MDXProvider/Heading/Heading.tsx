import styled from 'styled-components';
import { FC, HTMLAttributes } from 'react';

import { useSlug } from '../../SlugContext/SlugContext';

const HeadingAnchorTarget = styled.span`
  display: block;
  margin-top: -160px;
  padding-top: 160px;
  visibility: hidden;
  position: absolute;
`;

const PermalinkWrapper = styled.span`
  text-align: center;
  visibility: hidden;
  display: none;
  margin-left: 10px;

  @media (min-width: 992px) {
    display: inline-block;
  }
`;

const HeadingAnchor = styled.a`
  color: inherit;
  text-decoration: none;
  transition: border-bottom 0.2s ease;

  &:hover {
    border-bottom: 1px dotted;

    ~ ${PermalinkWrapper} {
      visibility: visible;
    }
  }
`;

const Permalink = () => (
  <PermalinkWrapper>
    <span>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <g strokeWidth="1" fill="#000000" stroke="#000000">
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
          />
        </g>
      </svg>
    </span>
  </PermalinkWrapper>
);

const StyledH2 = styled.h2`
  margin-top: 2.5rem;

  &:hover ${PermalinkWrapper} {
    display: inline-block;
  }
`;

const StyledH3 = styled.h3`
  margin-top: 2rem;

  &:hover ${PermalinkWrapper} {
    display: inline-block;
  }
`;

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

const styledHeadings = {
  H2: StyledH2,
  H3: StyledH3,
};

const createHeading = (key: keyof typeof styledHeadings) => {
  const Heading: FC<HeadingProps> = ({ children }) => {
    const slugger = useSlug();
    const HeadingComponent = styledHeadings[key];
    const slug = slugger.slug(children as string);

    return (
      <HeadingComponent>
        <HeadingAnchorTarget id={slug} />
        <HeadingAnchor href={`#${slug}`}>{children}</HeadingAnchor>
        <Permalink />
      </HeadingComponent>
    );
  };

  Heading.displayName = `Heading.${key}`;

  return Heading;
};

const Heading = {
  H2: createHeading('H2'),
  H3: createHeading('H3'),
};

export default Heading;
