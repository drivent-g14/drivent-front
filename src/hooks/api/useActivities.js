import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi';

export function listActivities() {
  const token = useToken();
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivities,
  } = useAsync(() => activitiesApi.getActivities(token));
  
  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivities,
  };
};
