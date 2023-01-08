import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ActivitiesLocation } from './ActivitiesLocation';

export function Activities({ array }) {
  const [arrayLocations, setArrayLocations] = useState([]);

  useEffect(() => {
    const arrayMap = (array.map((value) => value.Location.name));
    setArrayLocations(arrayMap.filter((item, index) => arrayMap.indexOf(item) === index));
  }, [array]);

  return (
    <>
      <Container>
        {arrayLocations.map((data, index) => 
          <ActivitiesLocation key={index} data={data} array={array}/>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  overflow: scroll;
`;
