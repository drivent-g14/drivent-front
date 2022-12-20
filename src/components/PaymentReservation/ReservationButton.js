import { toast } from 'react-toastify';
import useTicket from '../../hooks/api/useTicket';
import FlatButton from '../Dashboard/Buttons/FlatButton';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import { useNavigate } from 'react-router-dom';

export default function ReserveButton({ ticketType, hospitalityIndex = '', priceAtEvent, modalityIndex }) {
  const { createTicket } = useTicket();
  const isActive = ticketType.isRemote || (!ticketType.isRemote && hospitalityIndex !== '') ? true : false;
  const navigate = useNavigate();

  return (
    <DisplaySection
      title={`Fechado! O total ficou em R$ ${
        ticketType.isRemote ? ticketType.price : priceAtEvent + ticketType.price
      }. Agora é só confirmar`}
      isActive={isActive}
    >
      <FlatButton
        description="Reservar ingresso"
        onClick={async() => {
          try {
            // await createTicket(ticketType.id);
            // toast('Ticket reservado com sucesso!');
            navigate('/dashboard/payment/confirmation', { state: { price: ticketType.isRemote ? ticketType.price : priceAtEvent + ticketType.price, modalityIndex: modalityIndex, hospitalityIndex: hospitalityIndex } } );
          } catch (error) {
            toast('Não foi possível reservar seu ticket, favor tente novamente');
          }
        }}
      />
    </DisplaySection>
  );
}
