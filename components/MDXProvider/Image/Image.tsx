import { FC, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
  display: block;
  text-align: center;
  margin: 40px 0px;
`;

type ImageSize = 'sm' | 'md';

const StyledImage = styled.img<{ size: ImageSize }>`
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  width: ${(p) => (p.size === 'md' ? 'auto' : '360px')};
  min-width: ${(p) => (p.size === 'md' ? '100%' : '0')};
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
`;

const Figcaption = styled.figcaption`
  color: rgb(153, 153, 153);
  font-size: 12px;
  margin: 0px;
  margin-top: 20px;
  text-align: center;
`;

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> & {
  size: ImageSize;
};

const Image: FC<ImageProps> = ({ alt, ...props }) => (
  <Figure>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <StyledImage alt={alt} {...props} />
    {alt && <Figcaption>{alt}</Figcaption>}
  </Figure>
);

export default Image;
