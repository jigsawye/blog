import { FC } from 'react';
import {
  MDXProvider as OriginMDXProvider,
  MDXProviderComponentsProp,
} from '@mdx-js/react';

import { Anchor, Blockquote, Code, Ul, Li, Table, Th, Td } from './styles';
import CodeBlock from './CodeBlock';
import Image from './Image';
import Text from './Text';
import Heading from './Heading';

export const components: MDXProviderComponentsProp = {
  code: CodeBlock,
  inlineCode: Code,
  img: Image,
  p: Text,
  a: Anchor,
  blockquote: Blockquote,
  ul: Ul,
  li: Li,
  h2: Heading.H2,
  h3: Heading.H3,
  table: Table,
  th: Th,
  td: Td,
};

const MDXProvider: FC = ({ children }) => (
  <OriginMDXProvider components={components}>{children}</OriginMDXProvider>
);

export default MDXProvider;
