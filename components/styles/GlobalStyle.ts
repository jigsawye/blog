import { createGlobalStyle } from 'styled-components';

import custom from './custom';
import normalize from './normalize';

export default createGlobalStyle`
  ${normalize};
  ${custom};
`;
