import { useEffect, useState } from 'react';
import { PaymentSection } from '../../../components/PaymentReservation/PaymentSection';
import { TicketReservation } from '../../../components/PaymentReservation/TicketReservation';
import { useGetTicket } from '../../../hooks/api/useTicket';

const ticketSections = Object.freeze({
  RESERVATION_SECTION: 'RESERVATION_SECTION',
  PAYMENT_SECTION: 'PAYMENT_SECTION',
});

export default function Payment() {
  const [section, setSection] = useState(ticketSections.RESERVATION_SECTION);
  const { ticket } = useGetTicket();
  const hasTicketPaid = section === ticketSections.RESERVATION_SECTION;

  useEffect(() => {
    if (ticket) setSection(ticketSections.PAYMENT_SECTION);
  }, [ticket]);

  return hasTicketPaid ? <TicketReservation/> : <PaymentSection ticket={ticket} />;
}
