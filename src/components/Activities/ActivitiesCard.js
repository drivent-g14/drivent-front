import styled from 'styled-components';
import { ActivitiesChoices } from './ActivitiesChoices';

export default function ActivitiesCard({ data }) {
  if(data) {
    return (
      <>
        <ActivitiesInfos>  
          {data.map((data, index) => 
            <ActivitiesChoices key={index} data={data}/>
          )}
        </ActivitiesInfos>
      </>
    );
  }else {
    return <></>;
  }
};

const ActivitiesInfos = styled.div`
  height: calc(100% - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 50px;
  padding: 10px;
  border: 1px solid #D7D7D7;
`;
