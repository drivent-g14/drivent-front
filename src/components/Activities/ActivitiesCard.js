import styled from 'styled-components';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function ActivitiesCard({ data }) {
  return (
    <>
      <ActivitiesInfos>  
        <Activities>
          <Infos>
            <h1>{data.event}</h1>
            <h2>{data.startHour} - {data.endHour}</h2>
          </Infos>
          <IonIcon>
            <RxEnter color='#078632'/>
            <h3>{data.slotNumbers} vagas</h3>
          </IonIcon>
        </Activities>
      </ActivitiesInfos>
    </>
  );
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

const Activities = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  background: #F1F1F1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

const Infos = styled.div`
  display: flex;
  min-width: 200px;
  flex-direction: column;
  row-gap: 10px;
  border-right: 1px solid #CFCFCF;
  padding-right: 15px;

  h1{
    color: #343434;
    font-weight: 700;
    font-size: 12px;
  }
  h2{
    color: #343434;
    font-weight: 400;
    font-size: 12px;
  }
`;

const IonIcon = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: column;
  align-items: center;

  h3{
    text-align: center;
    margin-top: 4px;
    color: ${(props) => props.color ? '#CC6666' : '#078632'};
    font-size: 9px;
    font-weight: 400;
  }
`;
