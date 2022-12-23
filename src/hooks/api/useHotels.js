import useAsync from '../useAsync';
import useToken from '../useToken';
import * as hotelApi from '../../services/hotelsApi';

export default function useHotel() {
  const token = useToken();
  const {
    data: hotels,
    loading: hotelsLoanding,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => hotelApi.getHotels(token));

  return{
    hotels,
    hotelsLoanding,
    hotelsError,
    getHotels
  };
}
