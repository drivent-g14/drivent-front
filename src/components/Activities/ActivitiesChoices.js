import styled from 'styled-components';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export function ActivitiesChoices({ data }) {
  const [modelIonIcon, setModelIonIcon] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if(data.slotsNumbers === 0) {
      setColor('#CC6666');
      setModelIonIcon(<AiOutlineCloseCircle color='#CC6666'/>);
    }else{
      setColor('#078632');
      setModelIonIcon(<RxEnter color='#078632'/>);
    } 
  }, []);

  return (
    <>
      <Activities>
        <Infos>
          <h1>{data.event}</h1>
          <h2>{data.startHour} - {data.endHour}</h2>
        </Infos>
        <IonIcon color={color}>
          {modelIonIcon}
          <h3>{data.slotsNumbers} vagas</h3>
        </IonIcon>
      </Activities>
    </>
  );
};

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
    color: ${(props) => props.color};
    font-size: 9px;
    font-weight: 400;
  }
`;
