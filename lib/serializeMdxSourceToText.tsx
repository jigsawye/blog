import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { renderToStaticMarkup } from 'react-dom/server';

const serializeMdxSourceToText = (source: MDXRemoteSerializeResult): string =>
  renderToStaticMarkup(<MDXRemote {...source} />).replace(/<[^>]*>/g, '');

export default serializeMdxSourceToText;
