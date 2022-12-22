import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTicketType from '../../hooks/api/useTicketType';
import BoxContainer from '../Dashboard/Containers/BoxContainer';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import ReserveButton from './ReservationButton';
import PaymentForm from '../PaymentForm/PaymentForm';

export default function TicketReservation() {
  const [modalityIndex, setModalityIndex] = useState('');
  const [hospitalityIndex, setHospitalityIndex] = useState('');
  const [modalityOpt, setModalityOpt] = useState([]);
  const [atEventOpt, setAtEventOpt] = useState([]);
  const [ticketType, setTicketType] = useState('');
  const [priceAtEvent, setPriceAtEvent] = useState(0);
  const [hiddenPayment, setHiddenPayment] = useState(true);
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
    <PaymentSection>
      <TitleSection>Ingresso e pagamento</TitleSection>
      {hiddenPayment ? 
        <>
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
          <ReserveButton ticketType={ticketType} hospitalityIndex={hospitalityIndex} priceAtEvent={priceAtEvent} setHiddenPayment={setHiddenPayment}/> 
        </>
        :    
        <>   
          <DisplaySection isActive={true} title={'Ingresso escolhido'}>
            <BoxContainer width={290} height={108} isTapped={true} description={changeName(modalityIndex, hospitalityIndex)} value={`R$ ${ticketType.isRemote ? ticketType.price : priceAtEvent + ticketType.price}`}/>
          </DisplaySection>
          <DisplaySection isActive={true} title={'Pagamento'}>
            <PaymentSection>
              <PaymentForm />
            </PaymentSection>
          </DisplaySection>
        </>
      }
    </PaymentSection>
  );
}

function changeName(modalityIndex, hospitalityIndex) {
  if(modalityIndex === 1) return 'Online';
  else{
    if(hospitalityIndex === 0) return 'Presencial + Sem hotel';
    else return 'Presencial + Com hotel';
  }
}

const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;
