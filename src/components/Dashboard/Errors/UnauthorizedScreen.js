import styled from 'styled-components';

export default function UnauthorizedScreen({ children }) {
  return <UnauthorizedContainer>{children}</UnauthorizedContainer>;
}

const UnauthorizedContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 20%;
  padding-right: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  padding-bottom: 60px;
  line-height: 28px;
  color: #959595;
`;
