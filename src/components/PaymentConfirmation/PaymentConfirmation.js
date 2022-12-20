import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

export default function PaymentConfirmation() {
  const { state } = useLocation();
  console.log(changeName(state.modalityIndex, state.hospitalityIndex));

  return (
    <Container>
      <TitleSection>Ingresso e pagamento</TitleSection>
      <h1>{state.price}</h1>
    </Container>
  );
}

function changeName(modalityIndex, hospitalityIndex) {
  if(modalityIndex === 1) return 'Online';
  else{
    if(hospitalityIndex === 0) return 'Presencial + Sem hotel';
    else return 'Presencial + Com hotel';
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;
