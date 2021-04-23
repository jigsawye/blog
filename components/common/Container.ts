import styled from 'styled-components';

export default styled.article`
  max-width: 650px;
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
