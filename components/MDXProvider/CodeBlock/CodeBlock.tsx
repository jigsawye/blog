import { FC } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import prismTheme from 'prism-react-renderer/themes/oceanicNext';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import scope from './reactLiveScope';

const LivePreviewWrapper = styled.div`
  display: flex;
  padding: 20px;
  margin-bottom: 12px;
`;

const LiveEditorWrapper = styled.div`
  font-family: Menlo, Monaco, Consolas, 'Courier New', 'Roboto Mono', monospace !important;
  font-size: 14px;
  border-radius: 8px;
  margin: 40px 0px;
  overflow: auto;

  pre {
    padding: 20px !important;
    overflow: auto;
    margin: 0;
  }

  textarea {
    padding: 20px !important;
  }
`;

interface CodeBlockProps {
  children: string;
  live?: boolean;
  url?: string;
  className?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ children, live, url, ...props }) => {
  const language = props.className?.replace(/language-/, '') as Language;

  if (url) {
    return (
      <LazyLoad height={500} once>
        <iframe
          src={url}
          style={{
            width: '100%',
            height: 500,
            border: 'none',
            borderRadius: 4,
            overflow: 'hidden',
          }}
          title={url}
          allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
      </LazyLoad>
    );
  }

  if (live) {
    return (
      <LiveProvider
        code={children.trim()}
        theme={prismTheme}
        language={language}
        scope={scope}
      >
        <LivePreviewWrapper>
          <LazyLoad height="100%">
            <LivePreview />
          </LazyLoad>
        </LivePreviewWrapper>
        <LiveEditorWrapper>
          <LiveEditor />
        </LiveEditorWrapper>
        <LiveError />
      </LiveProvider>
    );
  }

  return (
    <LiveEditorWrapper>
      <Highlight
        {...defaultProps}
        theme={prismTheme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, padding: 20 }}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </LiveEditorWrapper>
  );
};

export default CodeBlock;
