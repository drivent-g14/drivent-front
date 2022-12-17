import styled from 'styled-components';
import Container from '../../../components/Container';

export default function Payment() {
  return (
    <>
      <Divizinha>
        <Container height="150px" width="150px" hasBoxShadow={false} borderColor="red" backgroundColor="blue" />
        <Container height="150px" width="150px" />
        <Container height="150px" width="150px" borderColor="blue" backgroundColor={'red'} />
      </Divizinha>
    </>
  );
}

const Divizinha = styled.div`
  display: flex;
  row-gap: 45px;
  column-gap: 45px;
  flex-direction: row;
`;
