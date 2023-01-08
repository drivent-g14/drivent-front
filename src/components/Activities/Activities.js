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
  min-height: 100%;
  min-width: 100%;
  display: flex;
  overflow: scroll;
`;
