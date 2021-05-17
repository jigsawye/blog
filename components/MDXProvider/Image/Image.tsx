import { FC, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
  display: block;
  text-align: center;
  margin: 40px 0px;
`;

const StyledImage = styled.img`
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  min-width: 100%;
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

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

const Image: FC<ImageProps> = ({ alt, ...props }) => (
  <Figure>
    {/* eslint-disable-next-line jsx-a11y/alt-text */}
    <StyledImage alt={alt} {...props} />
    {alt && <Figcaption>{alt}</Figcaption>}
  </Figure>
);

export default Image;
