import styled from 'styled-components';

const ArchiveWrapper = styled.div`
  border-bottom: 1px solid rgb(234, 234, 234);
  padding: 30px 0px;
  transition: all 0.2s ease 0s;

  &::last-of-type {
    border-bottom: 0;
  }

  &:hover {
    box-shadow: rgb(0 0 0 / 4%) 0px 5px 40px;
  }
`;

export default ArchiveWrapper;
