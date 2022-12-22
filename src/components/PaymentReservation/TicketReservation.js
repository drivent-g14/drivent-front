import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useEnrollment from '../../hooks/api/useEnrollment';
import useTicketType from '../../hooks/api/useTicketType';
import BoxContainer from '../Dashboard/Containers/BoxContainer';
import UnauthorizedScreen from '../Dashboard/Errors/UnauthorizedScreen';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import ReserveButton from './ReservationButton';

export default function TicketReservation() {
  return (
    <PaymentSection>
      <TitleSection>Ingresso e pagamento</TitleSection>
      <TicketSection>
        <CheckEnrollment />
      </TicketSection>
    </PaymentSection>
  );
}

function CheckEnrollment() {
  const { enrollment } = useEnrollment();

  //TODO: add loading screen
  return enrollment ? (
    <TicketReservationSection />
  ) : (
    <UnauthorizedScreen>
      Você precisa completar sua inscrição antes de prosseguir para a escolha de ingresso.
    </UnauthorizedScreen>
  );
}

function TicketReservationSection() {
  const [modalityIndex, setModalityIndex] = useState('');
  const [hospitalityIndex, setHospitalityIndex] = useState('');
  const [modalityOpt, setModalityOpt] = useState([]);
  const [atEventOpt, setAtEventOpt] = useState([]);
  const [ticketType, setTicketType] = useState('');
  const [priceAtEvent, setPriceAtEvent] = useState(0);
  const { ticketTypes } = useTicketType();

  useEffect(() => {
    if (ticketTypes) {
      ticketTypes.map((ticket) => {
        const ticketType = ticket;
        if (ticket.name.includes('mask')) {
          if (!ticket.isRemote) setPriceAtEvent(ticket.price);
          return setModalityOpt((state) => [...state, ticketType]);
        }
        return setAtEventOpt((state) => [...state, ticketType]);
      });
    }
  }, [ticketTypes]);

  function checkAndSetModality(index, type) {
    if (modalityIndex !== index) {
      setModalityIndex(index);
      setTicketType(type);
      setHospitalityIndex('');
      return;
    }
    setModalityIndex('');
    setTicketType('');
  }

  function checkHospitalityIndex(index, type) {
    if (hospitalityIndex !== index) {
      setHospitalityIndex(index);
      setTicketType(type);
      return;
    }
    setHospitalityIndex('');
    setTicketType('');
  }

  return (
    <>
      {' '}
      <DisplaySection title={'Primeiro, escolha sua modalidade de ingresso'}>
        {modalityOpt.map((data, index) => (
          <BoxContainer
            key={index}
            description={data.name.split('-')[0]}
            value={`R$ ${data.price}`}
            isTapped={modalityIndex === index}
            onClick={() => checkAndSetModality(index, data)}
          />
        ))}
      </DisplaySection>
      <DisplaySection title="Ótimo! Agora escolha sua modalidade de hospedagem" isActive={modalityIndex === 0}>
        {atEventOpt.map((data, index) => (
          <BoxContainer
            key={index}
            description={data.name.split('-')[0]}
            value={`+ R$ ${data.price}`}
            isTapped={hospitalityIndex === index}
            onClick={() => checkHospitalityIndex(index, data)}
          />
        ))}
      </DisplaySection>
      <ReserveButton ticketType={ticketType} hospitalityIndex={hospitalityIndex} priceAtEvent={priceAtEvent} />
    </>
  );
}

const PaymentSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;

const TicketSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
`;
