import styled from 'styled-components';
import { ActivitiesLocation } from './ActivitiesLocation';

export function Activities({ array }) {
  return (
    <>
      <Container>
        {array.data.map((data, index) => 
          <ActivitiesLocation key={index} data={data}/>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;
