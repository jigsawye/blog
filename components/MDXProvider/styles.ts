import styled from 'styled-components';

export const Anchor = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: #0074de;
  font-size: inherit;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #68b5fb;
  }
`;

export const Blockquote = styled.blockquote`
  border-left: 5px solid;
  margin: 0;
  padding-left: 10px;
`;

export const Code = styled.code`
  color: rgb(212, 0, 255);
  font-size: 14px;
  white-space: pre-wrap;

  :before {
    content: '\`';
  }

  :after {
    content: '\`';
  }
`;

export const Ul = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`;

export const Li = styled.li`
  margin-bottom: 0.35rem;

  :before {
    content: '-';
    display: block;
    color: #6d6d6d;
    position: absolute;
    margin-left: -25px;
  }
`;

export const Table = styled.table`
  margin: 0px auto 30px;
`;

export const Th = styled.th`
  font-weight: normal;
  font-size: 12px;
  color: rgb(155, 155, 155);
  padding-bottom: 0px;
  padding: 10px 20px;
`;

export const Td = styled.td`
  text-align: center;
  font-size: 14px;
  vertical-align: middle;
  padding: 10px 20px;
`;
