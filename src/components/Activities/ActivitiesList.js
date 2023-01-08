import styled from 'styled-components';
import DisplaySection from '../Dashboard/Sections/DisplaySection';
import BoxDayContainer from '../Dashboard/Containers/BoxDayContainer';
import { useState } from 'react';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Activities } from './Activities';

export function ActivitiesList() {
  const activitiesArray = [
    {
      date: 'Sexta, 22/10',
      data: [
        {
          Location: 'Auditório Principal',
          data: [
            {
              event: 'Minecraft: montando o PC ideal',
              startHour: '09:00',
              endHour: '10:00',
              slotsNumbers: 27,

            },
            {
              event: 'LoL: montando o PC ideal',
              startHour: '10:00',
              endHour: '11:00',
              slotsNumbers: 0,
            },
          ],
        },
        {
          Location: 'Auditório Lateral',
          data: [
            {
              event: 'CS-GO: montando o PC ideal',
              startHour: '11:00',
              endHour: '12:00',
              slotsNumbers: 37,
            },
            {
              event: 'TFT: montando o PC ideal',
              startHour: '12:00',
              endHour: '13:00',
              slotsNumbers: 0,
            },
          ],
        },
        {
          Location: 'Sala de Workshop',
          data: [
            {
              event: 'RDR 2: montando o PC ideal',
              startHour: '13:00',
              endHour: '15:00',
              slotsNumbers: 27,
            },
          ],
        },
      ],
    },
    {
      date: 'Sábado, 23/10',
      data: [
        {
          Location: 'Auditório Principal',
          data: [
            {
              event: 'Minecraft: montando o PC ideal',
              startHour: '09:00',
              endHour: '10:00',
              slotsNumbers: 0,

            },
            {
              event: 'LoL: montando o PC ideal',
              startHour: '10:00',
              endHour: '11:00',
              slotsNumbers: 0,
            },
          ],
        },
        {
          Location: 'Auditório Lateral',
          data: [
            {
              event: 'CS-GO: montando o PC ideal',
              startHour: '11:00',
              endHour: '12:00',
              slotsNumbers: 3,
            },
            {
              event: 'TFT: montando o PC ideal',
              startHour: '12:00',
              endHour: '13:00',
              slotsNumbers: 10,
            },
          ],
        },
        {
          Location: 'Sala de Workshop',
          data: [
            {
              event: 'RDR 2: montando o PC ideal',
              startHour: '13:00',
              endHour: '15:00',
              slotsNumbers: 10,
            },
          ],
        },
      ],
    },
    {
      date: 'Domingo, 24/10',
      data: [
        {
          Location: 'Auditório Principal',
          data: [
            {
              event: 'Palestra X',
              startHour: '09:00',
              endHour: '10:00',
              slotsNumbers: 10,

            },
          ],
        },
        {
          Location: 'Auditório Lateral',
          data: [
          ],
        },
        {
          Location: 'Sala de Workshop',
          data: [
            {
              event: 'Palestra Y',
              startHour: '12:00',
              endHour: '13:00',
              slotsNumbers: 40,
            },
          ],
        },
      ],
    },
  ];
  const [choicedDay, setChoicedDay] = useState('');
  const [setModality, setSetModality] = useState(true);

  return (
    <>
      <DisplaySection isActive={setModality}>
        Primeiro, filtre pelo dia do evento:
      </DisplaySection>
      <ActivityDays choicedDay={choicedDay}>
        {activitiesArray.map((data, index) => 
          <BoxDayContainer 
            key={index} 
            description={data.date} 
            height={40} width={140} 
            isTapped={choicedDay === index}
            onClick={() => { setChoicedDay(index); setSetModality(false);}}/> 
        )}
      </ActivityDays>
      <DisplaySection isActive={choicedDay === 0}>
        <Activities array={activitiesArray[0]}/>
      </DisplaySection>
      <DisplaySection isActive={choicedDay === 1}>
        <Activities array={activitiesArray[1]}/>
      </DisplaySection>
      <DisplaySection isActive={choicedDay === 2}>
        <Activities array={activitiesArray[2]}/>
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
