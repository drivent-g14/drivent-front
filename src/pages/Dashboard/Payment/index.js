import { useState } from 'react';
import styled from 'styled-components';
import BoxContainer from '../../../components/Dashboard/Containers/BoxContainer';

export default function Payment() {
  const [modalityIndex, setModalityIndex] = useState('');
  const [hospitalityIndex, setHospitalityIndex] = useState('');

  return (
    <PaymentSection>
      <TitleSection>Ingresso e pagamento</TitleSection>
      <TicketTypeSection>
        <p>Primeiro, escolha sua modalidade de ingresso</p>
        <TicketTypeBoxSection>
          <BoxContainer
            description="Presencial"
            value="R$ 250"
            isTapped={modalityIndex === 0}
            onClick={() => {
              modalityIndex !== 0 ? setModalityIndex(0) : setModalityIndex('');
            }}
          />
          <BoxContainer
            description="Online"
            value="R$ 100"
            isTapped={modalityIndex === 1}
            onClick={() => {
              modalityIndex !== 1 ? setModalityIndex(1) : setModalityIndex('');
            }}
          />
        </TicketTypeBoxSection>
      </TicketTypeSection>

      <HotelReservationSection hospitality={modalityIndex}>
        <p>Ótimo! Agora escolha sua modalidade de hospedagem</p>
        <HotelReservationBoxSection>
          <BoxContainer
            description={'Sem Hotel'}
            value="+ R$ 0"
            isTapped={hospitalityIndex === 0}
            onClick={() => {
              hospitalityIndex !== 0 ? setHospitalityIndex(0) : setHospitalityIndex('');
            }}
          />
          <BoxContainer
            description={'Com Hotel'}
            value="+ R$ 350"
            isTapped={hospitalityIndex === 1}
            onClick={() => {
              hospitalityIndex !== 1 ? setHospitalityIndex(1) : setHospitalityIndex('');
            }}
          />
        </HotelReservationBoxSection>
      </HotelReservationSection>
    </PaymentSection>
  );
}

const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;

const TicketTypeSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  font-size: 18px;
  color: #9e9e9e;
`;

const TicketTypeBoxSection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  row-gap: 24px;
  align-items: center;
`;
const HotelReservationSection = styled.div`
  display: flex;
  flex-direction: column;
  display: ${(props) => (props.hospitality === 0 ? '' : 'none')};
  row-gap: 16px;
  font-size: 18px;
  color: #9e9e9e;
`;

const HotelReservationBoxSection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  row-gap: 24px;
  align-items: center;
`;
