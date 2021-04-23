import { createGlobalStyle } from 'styled-components';

import custom from './custom';
import normalize from './normalize';
import prism from './prism';

export default createGlobalStyle`
  ${normalize};
  ${prism};
  ${custom};
`;
