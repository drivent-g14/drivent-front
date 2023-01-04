import { useEffect, useState } from 'react';
import { useGetTicket } from '../../../hooks/api/useTicket';

export default function Activities() {
  const { ticket } = useGetTicket();
  const [activities, setActivities] = useState();

  useEffect(() => {
    if (ticket) {
      setActivities(true);
      console.log(ticket.status);
    }
  }, [ticket]);
  
  return 'Atividades: Em breve!';
}
