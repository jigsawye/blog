import styled from 'styled-components';

export default styled.div`
  max-width: 800px;
  margin: auto;

  @media (max-width: 730px) {
    max-width: 100%;
    padding: 0px 10px;
  }

  @media (max-width: 950px) {
    max-width: 100%;
    padding: 0px 20px;
  }
`;
