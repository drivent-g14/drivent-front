import React, { useEffect, useState } from 'react';
import PaymentForm from '../PaymentForm/PaymentForm';
import { AiFillCheckCircle } from 'react-icons/ai';
import Container from '../Container';
import useTicketType from '../../hooks/api/useTicketType';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import BoxContainer from '../Dashboard/Containers/BoxContainer';
import styled from 'styled-components';

export function PaymentSection({ ticket }) {
  const { ticketTypes } = useTicketType();
  const [priceAtEvent, setPriceAtEvent] = useState(0);
  const [nameAtEvent, setNameAtEvent] = useState(0);
  const [paymentDone, setPaymentDone] = useState(false);
  const selectedTicket = ticket.TicketType;
  const ticketPaid = ticket.status === 'PAID' || paymentDone;

  useEffect(() => {
    if (ticketTypes) {
      ticketTypes.map((ticket) => (ticket.name.includes('basePrice') ? setPriceAtEvent(ticket.price) : null));
    }
    if(selectedTicket.name === 'Sem Hotel + Presencial' || selectedTicket.name === 'Com Hotel + Presencial') {
      setPriceAtEvent(250);
      if(selectedTicket.name === 'Sem Hotel + Presencial') setNameAtEvent('Presencial + Sem Hotel');
      else setNameAtEvent('Presencial + Com Hotel');
    }else if(selectedTicket.name === 'Online - mask') {
      setPriceAtEvent(100);
      setNameAtEvent(selectedTicket.name.split('-')[0]);
    }
  }, [ticketTypes]);

  const executePayment = () => {
    setPaymentDone(true);
  };

  return (
    <PaymentContainer>
      <DisplaySection isActive={true} title={'Ingresso escolhido'}>
        <BoxContainer
          width={290}
          height={108}
          isTapped={true}
          description={nameAtEvent}
          value={`R$ ${selectedTicket.isRemote ? selectedTicket.price : priceAtEvent + selectedTicket.price}`}
        />
      </DisplaySection>
      <DisplaySection isActive={true} title={'Pagamento'}>
        <Container>
          {ticketPaid ? (
            <PaymentSuccess>
              <AiFillCheckCircle style={{ color: '#36B853', width: '40px', height: '40px' }} />
              <div>
                <h1>Pagamento confirmado!</h1>
                <p>Prossiga para a escolha de hospedagem e atividades</p>
              </div>
            </PaymentSuccess>
          ) : (
            <PaymentForm setShowPaymentSuccess={executePayment} />
          )}
        </Container>
      </DisplaySection>
    </PaymentContainer>
  );
}

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const PaymentSuccess = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 10px;
    column-gap: 10px;
    row-gap: 10px;
  }

  h1 {
    font-weight: 700;
    color: #454545;
    font-size: 14px;
  }

  p {
    font-weight: 400;
    color: #454545;
    font-size: 14px;
  }
`;
