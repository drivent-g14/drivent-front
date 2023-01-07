import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BookingButton from '../Dashboard/Buttons/BookingButton';
import CardContainer from '../Dashboard/Containers/CardContainer';
import DisplaySection from '../Dashboard/Sections/DisplaySection';

const ModalityOcupations = Object.freeze({
  RESERVED: 'RESERVED',
  SELECT: 'SELECT',
  VAGUE: 'VAGUE',

});

const ModalitySelect = Object.freeze({
  RESERVED: 'BUSY',
  SELECT: 'SELECT',
  DEFAULT: 'DEFAULT',

});

export function HotelsContainer({ hotels }) {
  const [tapped, setTapped] = useState(true);

  return (
    <>
      <DisplaySection title={'Primeiro, escolha seu hotel'}>
        {hotels && hotels.map(
          (data, index) => <CardContainer
            key={data.id}
            title={data.name}
            image={data.image}
            roomsTypes={data.Rooms.map(data => data.name)}
            vacancies={data.Rooms.map(data => data.capacity)}
            isTapped={tapped === data.id}
            onClick={() => { setTapped(data.id === tapped ? false : data.id); }}
          />)}
      </DisplaySection>
      {tapped && <DisplaySection title={'Ótimo pedida! Agora escolha seu quarto:'}>
        <BookingDisplay>
          {Array.from(Array(4).keys()).map((data, index) => <BookingButton number={100} ocupations={[ModalityOcupations.RESERVED, ModalityOcupations.SELECT, ModalityOcupations.VAGUE]} selection={ModalitySelect.DEFAULT} />)}
          {Array.from(Array(4).keys()).map((data, index) => <BookingButton number={101} />)}
          {Array.from(Array(4).keys()).map((data, index) => <BookingButton number={102} />)}
        </BookingDisplay>
      </DisplaySection>
      }
    </>
  );
}

const BookingDisplay = styled.div`
    height: 128px;
    width: 100%;
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
  `;

