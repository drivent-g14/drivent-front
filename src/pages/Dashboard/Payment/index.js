import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { ticketTypes } = useTicketType();
  const { createTicket } = useTicket();
  const navigate = useNavigate();

  useEffect(() => {
    if (ticketTypes) {
      ticketTypes.map((ticket) => {
        let ticketType = ticket;
        if (ticket.name.includes('mask')) return setModalityOpt((state) => [...state, ticketType]);
        return setAtEventOpt((state) => [...state, ticketType]);
      });
    }
  }, [ticketTypes]);

  function checkModalityIndex(index) {
    modalityIndex !== index ? setModalityIndex(index) : setModalityIndex('');
  }
  function checkHospitalityIndex(index) {
    hospitalityIndex !== index ? setHospitalityIndex(index) : setHospitalityIndex('');
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
            onClick={() => checkModalityIndex(index)}
          />
        ))}
      </DisplaySection>
      <DisplaySection title="Ótimo! Agora escolha sua modalidade de hospedagem" isActive={modalityIndex === 0}>
        {atEventOpt.map((data, index) => (
          <BoxContainer
            key={index}
            description={data.name.split('-')[0]}
            value={data.includesHotel ? `+ R$ ${data.price}` : '+ R$ 0'}
            isTapped={hospitalityIndex === index}
            onClick={() => checkHospitalityIndex(index)}
          />
        ))}
      </DisplaySection>
      {modalityOpt
        .filter((data) => data.isRemote === true)
        .map((data, index) => (
          <DisplaySection
            key={index}
            title={`Fechado! O total ficou em R$ ${data.price}. Agora é só confirmar`}
            isActive={modalityIndex === 1}
          >
            <FlatButton
              description="Reservar ingresso"
              onClick={async() => {
                const onlineTicketTypeId = ticketTypes.filter((ticket) => ticket.isRemote === true);
                try {
                  await createTicket(onlineTicketTypeId[0].id);
                  toast('Ticket reservado com sucesso!');
                  navigate('/dashboard/hotel');
                } catch (error) {
                  toast('Não foi possível reservar seu ticket, favor tente novamente');
                }
              }}
            />
          </DisplaySection>
        ))}
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
