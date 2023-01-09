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
export function addActivities() {
  const token = useToken();
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: createActivities,
  } = useAsync((data) => activitiesApi.createActivities(data, token), false);

  return {
    activities,
    activitiesLoading,
    activitiesError,
    createActivities,
  };
}
export function listActivitiesById() {
  const token = useToken();
  const {
    data: activities,
    loading: activitiesLoading,
    error: activitiesError,
    act: getActivitiesById,
  } = useAsync(() => activitiesApi.getActivitiesById(token));
  
  return {
    activities,
    activitiesLoading,
    activitiesError,
    getActivitiesById,
  };
};
