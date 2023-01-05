import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CardContainer from '../../../components/Dashboard/Containers/CardContainer';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';
import useHotel from '../../../hooks/api/useHotels';
import { useGetTicket } from '../../../hooks/api/useTicket';
import UnauthorizedScreen from '../../../components/Dashboard/Errors/UnauthorizedScreen';

const unauthorizedMsg = Object.freeze({
  NO_PAYMENT_MSG: 'Você precisa ter confirmado pagamento antes de fazer a escolha de hospedagem.',
  ONLINE_MODALITY_MSG: 'Sua modalidade de ingresso não possui hospedagem. Prossiga para a escolha de atividades.',
});

const modalityTicket = Object.freeze({
  ONLINE_MODALITY: 'ONLINE',
  AT_EVENT_MODALITY: 'AT EVENT',
});

//TODO: move to components and refactor screen

export default function Hotel() {
  const { hotels } = useHotel();
  const { ticket } = useGetTicket();
  const [unauthorizedMessage, setUnauthorizedMessage] = useState(unauthorizedMsg.NO_PAYMENT_MSG);
  const [paidTicket, setPaidTicket] = useState(false);
  const [ticketType, setTicketType] = useState(null);

  useEffect(() => {
    if (ticket && ticket.status === 'PAID') {
      setPaidTicket(true);
      setTicketType(modalityTicket.AT_EVENT_MODALITY);
      if (ticket.TicketType.isRemote || ticket.TicketType.name.includes('Sem hotel')) {
        setTicketType(modalityTicket.ONLINE_MODALITY);
        setUnauthorizedMessage(unauthorizedMsg.ONLINE_MODALITY_MSG);
      }
    }
  }, [ticket]);

  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
      {paidTicket && (
        <>
          {ticketType === modalityTicket.AT_EVENT_MODALITY && <> <HotelsContainer hotels={hotels} /> <BoookingContairner></BoookingContairner></>}
          {ticketType === modalityTicket.ONLINE_MODALITY && (
            <UnauthorizedScreen>{unauthorizedMessage}</UnauthorizedScreen>
          )}
        </>
      )}
      {!paidTicket && <UnauthorizedScreen>{unauthorizedMessage}</UnauthorizedScreen>}
    </HotelsSections>
  );
}

function HotelsContainer({ hotels }) {
  return (
    <DisplaySection title={'Primeiro, escolha seu hotel'}>
      {hotels && hotels.map(
        (data, index) => <CardContainer
          key={index}
          title={data.name}
          image={data.image}
          roomsTypes={data.Rooms.map(data => data.name)}
          vacancies={data.Rooms.map(data => data.capacity)}
        />)}
    </DisplaySection>
  );
}

function BoookingContairner() {
  return (
    <DisplaySection title={'Ótimo pedida! Agora escolha seu quarto:'}>
      
    </DisplaySection>
  );
}

const HotelsSections = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;
