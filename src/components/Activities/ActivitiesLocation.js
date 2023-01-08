import styled from 'styled-components';
import { RxEnter } from 'react-icons/rx'; 
import { AiOutlineCloseCircle } from 'react-icons/ai';

export function ActivitiesLocation() {
  return (
    <>
      <Container>
        <LocationAndActivities>
          <p>Auditório Principal</p>
          <ActivitiesInfos>  
            <Activities>
              <Infos>
                <h1>Minecraft: montando o PC ideal</h1>
                <h2>09:00 - 10:00</h2>
              </Infos>
              <IonIcon>
                <RxEnter color='#078632'/>
                <h3>27 vagas</h3>
              </IonIcon>
            </Activities>
            <Activities>
              <Infos>
                <h1>LoL: montando o PC ideal</h1>
                <h2>10:00 - 11:00</h2>
              </Infos>
              <IonIcon color={true}>
                <AiOutlineCloseCircle color='#CC6666'/>
                <h3>Esgotado</h3>
              </IonIcon>
            </Activities>
          </ActivitiesInfos>
        </LocationAndActivities>
        <LocationAndActivities>
          <p>Auditório Lateral</p>
          <ActivitiesInfos>  
            <Activities>
              <Infos>
                <h1>CS-GO: montando o PC ideal</h1>
                <h2>13:00 - 14:00</h2>
              </Infos>
              <IonIcon>
                <RxEnter color='#078632'/>
                <h3>27 vagas</h3>
              </IonIcon>
            </Activities>
          </ActivitiesInfos>
        </LocationAndActivities>
        <LocationAndActivities>
          <p>Sala de Workshop</p>
          <ActivitiesInfos>  
            <Activities>
              <Infos>
                <h1>TFT: montando o PC ideal</h1>
                <h2>12:00 - 13:00</h2>
              </Infos>
              <IonIcon>
                <RxEnter color='#078632'/>
                <h3>30 vagas</h3>
              </IonIcon>
            </Activities>
            <Activities>
              <Infos>
                <h1>RDR 2: montando o PC ideal</h1>
                <h2>20:00 - 22:00</h2>
              </Infos>
              <IonIcon color={true}>
                <AiOutlineCloseCircle color='#CC6666'/>
                <h3>Esgotado</h3>
              </IonIcon>
            </Activities>
          </ActivitiesInfos>
        </LocationAndActivities>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`;

const LocationAndActivities = styled.div`
  height: 391px;
  width: 300px;

  p{
    color: #7B7B7B;
    font-size: 17px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

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
