import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BoxContainer from '../Dashboard/Containers/BoxContainer';
import DisplaySection from '../Dashboard/Sections/DisplaySection';

export default function PaymentConfirmation() {
  const { state } = useLocation();

  return (
    <Container>
      <TitleSection>Ingresso e pagamento</TitleSection>
      <DisplaySection isActive={true} title={'Ingresso escolhido'}>
        <BoxContainer width={290} height={108} isTapped={true} description={changeName(state.modalityIndex, state.hospitalityIndex)} value={`R$ ${state.price}`}/>
      </DisplaySection>
      <DisplaySection isActive={true} title={'Pagamento'}>
      
      </DisplaySection>
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
