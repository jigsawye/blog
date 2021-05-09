import { FC, ImgHTMLAttributes } from 'react';
import styled from 'styled-components';

const Figure = styled.figure`
  display: block;
  text-align: center;
  margin: 40px 0px;
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
    <img alt={alt} {...props} />
    {alt && <Figcaption>{alt}</Figcaption>}
  </Figure>
);

export default Image;
