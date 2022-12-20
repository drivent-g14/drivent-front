import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useTicketType from '../../hooks/api/useTicketType';
import BoxContainer from '../Dashboard/Containers/BoxContainer';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import ReserveButton from './ReservationButton';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import FlatButton from '../Dashboard/Buttons/FlatButton';

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
              <PaymentForm>
                <Cards 
                  cvc={''}
                  expiry={''}
                  focused={''}
                  name={''}
                  number={''}
                />
                <Form >
                  <input
                    type="tel"
                    name="number"
                    placeholder="Card Number"
                  />
                  <input
                    type="tel"
                    name="name"
                    placeholder="Name"
                  />
                  <InputAligner>
                    <input
                      type="tel"
                      name="validthru"
                      placeholder="Valid Thru"
                    />
                    <input
                      type="tel"
                      name="number"
                      placeholder="CVC"
                    />
                  </InputAligner>
                </Form>
              </PaymentForm>
              <FlatButton description="Finalizar pagamento"/>
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

const PaymentForm = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input{
    width: 30vw;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #CECECE;
  }

  input::placeholder{
    padding-left: 5px;
  }
`;

const InputAligner = styled.div`
  display: flex;
  justify-content: space-between;

  input:nth-child(1){
    width: 20vw;
  }

  input:nth-child(2){
    width: 8vw;
  }
`;
