import { useState } from 'react';
import styled from 'styled-components';
import BoxContainer from '../../../components/Dashboard/Containers/BoxContainer';

export default function Payment() {
  const [activeIndex, setIndex] = useState('');
  const [activeIndexTwo, setIndexTwo] = useState('');
  const [type, setType] = useState(false);

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
              setType(!type);
            }}
          />
          <BoxContainer
            description="Online"
            value="R$ 100"
            isTapped={activeIndex === 1}
            onClick={() => {
              activeIndex !== 1 ? setIndex(1) : setIndex('');
              setType(false);
            }}
          />
        </TicketTypeBoxSection>
      </TicketTypeSection>

      <TicketTypeSection style={{ marginTop: '30px', display: type === true ? 'block' : 'none' }}>
        <p>Ótimo! Agora escolha sua modalidade de hospedagem</p>
        <TicketTypeBoxSection style={{ marginTop: '30px' }}>
          <BoxContainer
            description={'Sem Hotel'}
            value="+ R$ 0"
            isTapped={activeIndexTwo === 0}
            onClick={() => {
              activeIndexTwo !== 0 ? setIndexTwo(0) : setIndexTwo('');
            }}
          />
          <BoxContainer
            description={'Com Hotel'}
            value="+ R$ 350"
            isTapped={activeIndexTwo === 1}
            onClick={() => {
              activeIndexTwo !== 1 ? setIndexTwo(1) : setIndexTwo('');
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
