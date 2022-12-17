import { useState } from 'react';
import styled from 'styled-components';
import BoxContainer from '../../../components/Dashboard/Containers/BoxContainer';

export default function Payment() {
  const [tapped, setTapped] = useState(false);
  const [activeIndex, setIndex] = useState('');

  return (
    <PaymentSection>
      <TitleSection>Ingresso e pagamento</TitleSection>
      <TicketTypeSection>
        <p>Primeiro, escolha sua modalidade de ingresso</p>
        <TicketTypeBoxSection>
          <BoxContainer
            description="Presencial"
            value="R$ 250"
            isTapped={activeIndex === 0}
            onClick={() => {
              activeIndex !== 0 ? setIndex(0) : setIndex('');
              setTapped(!tapped);
            }}
          />
          <BoxContainer
            description="Online"
            value="R$ 100"
            isTapped={activeIndex === 1}
            onClick={() => {
              activeIndex !== 1 ? setIndex(1) : setIndex('');
              setTapped(!tapped);
            }}
          />
        </TicketTypeBoxSection>
      </TicketTypeSection>
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
  align-items: center;
`;
