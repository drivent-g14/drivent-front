import styled from 'styled-components';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import * as useActivities from '../../hooks/api/useActivities';

export function ActivitiesChoices({ data }) {
  const { createActivities } = useActivities.addActivities();
  const { getActivitiesById } = useActivities.listActivitiesById();

  const [modelIonIcon, setModelIonIcon] = useState('');
  const [color, setColor] = useState('');
  const [saveActivities, setSaveActivities] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(async() => {
    const list = await getActivitiesById();
    if(list.length !== 0) {
      list.map((value) => {
        if(data.id === value.activitiesId) {
          setColor('#078632');
          setModelIonIcon(<AiOutlineCheckCircle color='#078632'/>);
          setMessage('Inscrito');
          setSaveActivities(true);
        }
      });
    }else{
      if(data.slots === 0) {
        setColor('#CC6666');
        setMessage('Esgotado');
        setModelIonIcon(<AiOutlineCloseCircle color='#CC6666'/>);
      }else{
        setColor('#078632');
        setMessage(data.slots + ' vagas');
        setModelIonIcon(<RxEnter color='#078632'/>);
      } 
    }
  }, []);

  async function registerActivities(slots) {
    if(slots !== 0) {
      try {
        await createActivities(data.id);
        setColor('#078632');
        setModelIonIcon(<AiOutlineCheckCircle color='#078632'/>);
        setMessage('Inscrito');
        setSaveActivities(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Activities saveActivities={saveActivities}>
        <Infos saveActivities={saveActivities}>
          <h1>{data.name}</h1>
          <h2>{data.startsAt} - {data.endsAt}</h2>
        </Infos>
        <IonIcon color={color} onClick={() => registerActivities(data.slots)} >
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
