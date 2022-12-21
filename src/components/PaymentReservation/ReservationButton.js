import { toast } from 'react-toastify';
import * as useTicket from '../../hooks/api/useTicket';
import FlatButton from '../Dashboard/Buttons/FlatButton';
import DisplaySection from '../Dashboard/Sections/DisplaySection';

export default function ReserveButton({ ticketType, hospitalityIndex = '', priceAtEvent, setHiddenPayment }) {
  const createTicket = useTicket.addTicket();
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
            // await createTicket(ticketType.id);
            // toast('Ticket reservado com sucesso!');
            setHiddenPayment(false);
          } catch (error) {
            toast('Não foi possível reservar seu ticket, favor tente novamente');
          }
        }}
      />
    </DisplaySection>
  );
}
