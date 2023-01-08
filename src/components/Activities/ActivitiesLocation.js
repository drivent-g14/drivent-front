import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ActivitiesCard from './ActivitiesCard';

export function ActivitiesLocation({ data, array }) {
  const [arrayCards, setArrayCards] = useState();

  useEffect(() => {
    if(data === 'Auditório Principal') {
      setArrayCards(array.filter(value => value.Location.name === 'Auditório Principal'));
    }else if(data === 'Auditório Lateral') {
      setArrayCards(array.filter(value => value.Location.name === 'Auditório Lateral'));
    }
  }, []);

  return (
    <>
      <LocationAndActivities>
        <p>{data}</p>
        <ActivitiesCard data={arrayCards}/>
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
