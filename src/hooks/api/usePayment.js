import useAsync from '../useAsync';
import useToken from '../useToken';
import * as paymentApi from '../../services/paymentApi';

export default function usePayment(body) {
  const token = useToken();

  const{
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: createPayment,
  } = useAsync(() => paymentApi.createPayment(body, token), false);

  return {
    payment,
    paymentLoading,
    paymentError,
    createPayment,
  };
}
