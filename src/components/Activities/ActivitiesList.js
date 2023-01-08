import styled from 'styled-components';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import BoxDayContainer from '../Dashboard/Containers/BoxDayContainer';
import { useState } from 'react';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ActivitiesLocation } from './ActivitiesLocation';

export function ActivitiesList() {
  const activitiesArray = [
    {
      date: 'Sexta, 22/10',
      data: [
        {
          Room: 'Auditório Principal',
          data: [
            {
              event: 'Minecraft: montando o PC ideal',
              duration: 1,
              startHour: '09:00',
              slotsNumbers: 27,

            },
            {
              event: 'LoL: montando o PC ideal',
              duration: 1,
              startHour: '10:00',
              slotsNumbers: 0,
            },
          ],
        },
        {
          Room: 'Auditório Lateral',
          data: [
            {
              event: 'CS-GO: montando o PC ideal',
              duration: 1,
              startHour: '11:00',
              slotsNumbers: 37,
            },
            {
              event: 'TFT: montando o PC ideal',
              duration: 1,
              startHour: '12:00',
              slotsNumbers: 0,
            },
          ],
        },
        {
          Room: 'Sala de Workshop',
          data: [
            {
              event: 'RDR 2: montando o PC ideal',
              duration: 2,
              startHour: '13:00',
              slotsNumbers: 27,
            },
          ],
        },
      ],
    },
    {
      date: 'Sábado, 23/10'
    },
    {
      date: 'Domingo, 24/10'
    },
  ];
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
            description={data.date} 
            height={40} width={140} 
            isTapped={choicedDay === index}
            onClick={() => setChoicedDay(index)}/> 
        )}
      </ActivityDays>
      <DisplaySection isActive={choicedDay === 0}>
        <ActivitiesLocation />
      </DisplaySection>
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
