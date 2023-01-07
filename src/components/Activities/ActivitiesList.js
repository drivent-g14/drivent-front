import styled from 'styled-components';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import BoxDayContainer from '../Dashboard/Containers/BoxDayContainer';
import { useState } from 'react';

export function ActivitiesList() {
  const activitiesArray = ['Sexta, 22/10', 'Sábado, 23/10', 'Domingo, 24/10'];
  const [choicedDay, setChoicedDay] = useState('');

  return (
    <>
      <DisplaySection>
        Primeiro, filtre pelo dia do evento:
      </DisplaySection>
      <ActivityDays choicedDay={choicedDay}>
        {activitiesArray.map((data, index) => 
          <BoxDayContainer 
            key={index} 
            description={data} 
            height={40} width={140} 
            isTapped={choicedDay === index}
            onClick={() => setChoicedDay(index)}/> 
        )}
      </ActivityDays>
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
