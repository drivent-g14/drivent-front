import styled from 'styled-components';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import BoxDayContainer from '../Dashboard/Containers/BoxDayContainer';
import { useEffect, useState } from 'react';
import { Activities } from './Activities';
import * as useActivities from '../../hooks/api/useActivities';

export function ActivitiesList() {
  const { getActivities } = useActivities.listActivities();
  const [activitiesFiltered, setActivitiesFiltered] = useState([]);
  const [listActivities, setListActivities] = useState([]);

  useEffect(async() => {
    const listActivities = await getActivities();
    setListActivities(listActivities);
    const activitiesMap = listActivities.map(value => value.day);
    setActivitiesFiltered([...activitiesMap.filter((item, index) => activitiesMap.indexOf(item) === index)]);
  }, []);

  const [choicedDay, setChoicedDay] = useState('');
  const [setModality, setSetModality] = useState(true);

  return (
    <>
      <DisplaySection isActive={setModality}>
        Primeiro, filtre pelo dia do evento:
      </DisplaySection>
      <ActivityDays choicedDay={choicedDay}>
        {activitiesFiltered.map((data, index) => 
          <BoxDayContainer 
            key={index} 
            description={data} 
            height={40} width={140} 
            isTapped={choicedDay === index}
            onClick={() => { setChoicedDay(index); setSetModality(false);}}/> 
        )}
      </ActivityDays>
      <DisplaySection isActive={choicedDay === 0}>
        <Activities array={listActivities.filter(value => value.day === 'Sexta, 22/10')}/>
      </DisplaySection>
      {/* <DisplaySection isActive={choicedDay === 1}>
        <Activities array={activitiesArray[1]}/>
      </DisplaySection>
      <DisplaySection isActive={choicedDay === 2}>
        <Activities array={activitiesArray[2]}/>
      </DisplaySection> */}
    </>
  );
};

const ActivityDays = styled.div`
  display: flex;
  column-gap: 18px;

  & > div{
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: none;
  }
`;
