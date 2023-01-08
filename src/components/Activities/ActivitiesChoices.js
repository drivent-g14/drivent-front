import styled from 'styled-components';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';

export function ActivitiesChoices({ data }) {
  const [modelIonIcon, setModelIonIcon] = useState('');
  const [color, setColor] = useState('');
  const [saveActivities, setSaveActivities] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(data.slotsNumbers === 0) {
      setColor('#CC6666');
      setMessage('Esgotado');
      setModelIonIcon(<AiOutlineCloseCircle color='#CC6666'/>);
    }else{
      setColor('#078632');
      setMessage(data.slotsNumbers + ' vagas');
      setModelIonIcon(<RxEnter color='#078632'/>);
    } 
  }, []);

  function registerActivities(slots) {
    if(slots !== 0) {
      setColor('#078632');
      setModelIonIcon(<AiOutlineCheckCircle color='#078632'/>);
      setMessage('Inscrito');
      setSaveActivities(true);
    }
  };

  return (
    <>
      <Activities saveActivities={saveActivities}>
        <Infos saveActivities={saveActivities}>
          <h1>{data.event}</h1>
          <h2>{data.startHour} - {data.endHour}</h2>
        </Infos>
        <IonIcon color={color} onClick={() => registerActivities(data.slotsNumbers)} >
          {modelIonIcon}
          <h3>{message}</h3>
        </IonIcon>
      </Activities>
    </>
  );
};

const Activities = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 10px;
  background: ${(props) => props.saveActivities ? '#D0FFDB' :'#F1F1F1'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
`;

const Infos = styled.div`
  display: flex;
  min-width: 200px;
  flex-direction: column;
  border-right: 1px solid #CFCFCF;
  row-gap: 10px;
  padding-right: 15px;

  ${(props) => {
    if(props.saveActivities) {
      return `
       border-right: 1px solid #99E8A1;
      `;
    }
  }}

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
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  h3{
    text-align: center;
    margin-top: 4px;
    color: ${(props) => props.color};
    font-size: 9px;
    font-weight: 400;
  }
`;
