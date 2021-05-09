import { FC, isValidElement } from 'react';
import styled from 'styled-components';

export const StyledText = styled.p`
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const Text: FC = ({ children }) => {
  if (isValidElement(children) && 'src' in children.props) {
    return children;
  }

  return <StyledText>{children}</StyledText>;
};

export default Text;
