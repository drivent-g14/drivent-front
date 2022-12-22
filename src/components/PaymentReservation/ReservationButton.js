import { toast } from 'react-toastify';
import FlatButton from '../Dashboard/Buttons/FlatButton';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import * as useTicket from '../../hooks/api/useTicket';

export default function ReserveButton({ ticketType, hospitalityIndex = '', priceAtEvent, setShowPaymentSection }) {
  const { createTicket } = useTicket.addTicket();
  const isActive = ticketType.isRemote || (!ticketType.isRemote && hospitalityIndex !== '') ? true : false;

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
            await createTicket(ticketType.id);
            toast('Ticket reservado com sucesso!');
            setShowPaymentSection(false);
          } catch (error) {
            toast('Não foi possível reservar seu ticket, favor tente novamente');
          }
        }}
      />
    </DisplaySection>
  );
}
