import styled from 'styled-components';
import ActivitiesCard from './ActivitiesCard';

export function ActivitiesLocation({ data }) {
  const { Location } = data;
  return (
    <>
      <LocationAndActivities>
        <p>{Location}</p>
        <ActivitiesCard data={data.data}/>
      </LocationAndActivities>
    </>
  );
};

const LocationAndActivities = styled.div`
  min-height: 391px;
  min-width: 300px;

  p{
    color: #7B7B7B;
    font-size: 17px;
    margin-bottom: 20px;
    text-align: center;
  }
`;
