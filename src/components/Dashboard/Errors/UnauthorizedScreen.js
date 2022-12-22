import styled from 'styled-components';

export default function UnauthorizedScreen({ children }) {
  return <UnauthorizedContainer>{children}</UnauthorizedContainer>;
}

const UnauthorizedContainer = styled.div`
  width: 48%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  padding-bottom: 60px;
  line-height: 28px;
  color: #959595;
`;
