import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTicketType from '../../hooks/api/useTicketType';
import BoxContainer from '../Dashboard/Containers/BoxContainer';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import ReserveButton from './ReservationButton';
import PaymentForm from '../PaymentForm/PaymentForm';
import { AiFillCheckCircle } from 'react-icons/ai';

export default function TicketReservation() {
  const [modalityIndex, setModalityIndex] = useState('');
  const [hospitalityIndex, setHospitalityIndex] = useState('');
  const [modalityOpt, setModalityOpt] = useState([]);
  const [atEventOpt, setAtEventOpt] = useState([]);
  const [ticketType, setTicketType] = useState('');
  const [priceAtEvent, setPriceAtEvent] = useState(0);
  const [showPaymentSection, setShowPaymentSection] = useState(true);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
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
      {showPaymentSection ? 
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
          <ReserveButton ticketType={ticketType} hospitalityIndex={hospitalityIndex} priceAtEvent={priceAtEvent} setShowPaymentSection={setShowPaymentSection}/> 
        </>
        :    
        <>   
          <DisplaySection isActive={true} title={'Ingresso escolhido'}>
            <BoxContainer width={290} height={108} isTapped={true} description={changeName(modalityIndex, hospitalityIndex)} value={`R$ ${ticketType.isRemote ? ticketType.price : priceAtEvent + ticketType.price}`}/>
          </DisplaySection>
          <DisplaySection isActive={true} title={'Pagamento'}>
            <PaymentSection>
              {showPaymentSuccess ? 
                <PaymentSuccess>
                  <AiFillCheckCircle style={{ color: '#36B853', width: '40px', height: '40px' }}/>
                  <div>
                    <h1>Pagamento confirmado!</h1>
                    <p>Prossiga para a escolha de hospedagem e atividades</p>
                  </div>
                </PaymentSuccess>
                : 
                <PaymentForm setShowPaymentSuccess={setShowPaymentSuccess}/>
              }
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

const PaymentSuccess = styled.div`
  display: flex;
  align-items: center;

  div{
    margin-left: 10px;
  }

  h1{
    font-weight: 700;
    color: #454545;
    font-size: 14px;
  }

  p{
    font-weight: 400;
    color: #454545;
    font-size: 14px;
  }
`;
