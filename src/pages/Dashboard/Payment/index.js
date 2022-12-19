import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import BoxContainer from '../../../components/Dashboard/Containers/BoxContainer';
import FlatButton from '../../../components/Dashboard/Containers/FlatButton';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';
import useTicket from '../../../hooks/api/useTicket';
import useTicketType from '../../../hooks/api/useTicketType';

export default function Payment() {
  const [modalityIndex, setModalityIndex] = useState('');
  const [hospitalityIndex, setHospitalityIndex] = useState('');
  const [modalityOpt, setModalityOpt] = useState([]);
  const [atEventOpt, setAtEventOpt] = useState([]);
  const [ticketType, setTicketType] = useState('');
  const { ticketTypes } = useTicketType();

  useEffect(() => {
    if (ticketTypes) {
      ticketTypes.map((ticket) => {
        let ticketType = ticket;
        if (ticket.name.includes('mask')) {
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
    <PaymentSection>
      <TitleSection>Ingresso e pagamento</TitleSection>
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
      <ReserveButton
        modalityIndex={modalityIndex}
        ticketType={ticketType}
        ticketTypes={ticketTypes}
        hospitalityIndex={hospitalityIndex}
      />
    </PaymentSection>
  );
}

function ReserveButton({ ticketType, modalityIndex = '', hospitalityIndex = '', ticketTypes }) {
  const { createTicket } = useTicket();
  const atEventTicketPrice = ticketTypes
    ? ticketTypes.filter((ticket) => ticket.name.includes('mask') && ticket.isRemote === false)[0].price
    : 0;
  const isRemote = modalityIndex === 1;
  const isAtEvent = hospitalityIndex !== '' && modalityIndex === 0;
  console.log(ticketType);

  const isActive = ticketType.isRemote || (ticketType && hospitalityIndex !== '') ? true : false;
  return (
    <DisplaySection
      title={`Fechado! O total ficou em R$ ${
        isRemote ? ticketType.price : atEventTicketPrice + ticketType.price
      }. Agora é só confirmar`}
      isActive={isActive}
    >
      <FlatButton
        description="Reservar ingresso"
        onClick={async() => {
          try {
            await createTicket(ticketType.id);
            toast('Ticket reservado com sucesso!');
          } catch (error) {
            toast('Não foi possível reservar seu ticket, favor tente novamente');
          }
        }}
      />
    </DisplaySection>
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
