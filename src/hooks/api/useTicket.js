import useAsync from '../useAsync';
import useToken from '../useToken';
import * as ticketApi from '../../services/ticketApi';

export function addTicket() {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: createTicket,
  } = useAsync((data) => ticketApi.createTicket(data, token), false);

  return {
    ticket,
    ticketLoading,
    ticketError,
    createTicket,
  };
}
export function useGetTicket() {
  const token = useToken();
  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicketById,
  } = useAsync(() => ticketApi.getTicketById(token));

  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicketById,
  };
}
