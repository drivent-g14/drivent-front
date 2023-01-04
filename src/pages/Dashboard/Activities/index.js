import { useEffect, useState } from 'react';
import UnauthorizedScreen from '../../../components/Dashboard/Errors/UnauthorizedScreen';
import { useGetTicket } from '../../../hooks/api/useTicket';
import styled from 'styled-components';

export default function Activities() {
  const { ticket } = useGetTicket();
  const [activities, setActivities] = useState(false);
  
  useEffect(() => {
    if (ticket && ticket.status === 'PAID') setActivities(true);
  }, [ticket]);
  
  return (
    <PaymentContainer>
      <TitleSection>Escolha de atividades</TitleSection>
      {activities ? 'Teste' : <UnauthorizedScreen>Você precisa ter confirmado pagamento antes de fazer a escolha de atividades</UnauthorizedScreen>}
    </PaymentContainer>
  );
}

const PaymentContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;
