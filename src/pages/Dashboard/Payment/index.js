import { useState } from 'react';
import styled from 'styled-components';
import BoxContainer from '../../../components/Dashboard/Containers/BoxContainer';
import FlatButton from '../../../components/Dashboard/Containers/FlatButton';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';

export default function Payment() {
  const [modalityIndex, setModalityIndex] = useState('');
  const [hospitalityIndex, setHospitalityIndex] = useState('');

  function checkModalityIndex(index) {
    modalityIndex !== index ? setModalityIndex(index) : setModalityIndex('');
  }
  function checkHospitalityIndex(index) {
    hospitalityIndex !== index ? setHospitalityIndex(index) : setHospitalityIndex('');
  }

  return (
    <PaymentSection>
      <TitleSection>Ingresso e pagamento</TitleSection>
      <DisplaySection title={'Primeiro, escolha sua modalidade de ingresso'}>
        <BoxContainer
          description="Presencial"
          value="R$ 250"
          isTapped={modalityIndex === 0}
          onClick={() => checkModalityIndex(0)}
        />
        <BoxContainer
          description="Online"
          value="R$ 100"
          isTapped={modalityIndex === 1}
          onClick={() => checkModalityIndex(1)}
        />
      </DisplaySection>

      <DisplaySection title="Ótimo! Agora escolha sua modalidade de hospedagem" isActive={modalityIndex === 0}>
        <BoxContainer
          description={'Sem Hotel'}
          value="+ R$ 0"
          isTapped={hospitalityIndex === 0}
          onClick={() => checkHospitalityIndex(0)}
        />
        <BoxContainer
          description={'Com Hotel'}
          value="+ R$ 350"
          isTapped={hospitalityIndex === 1}
          onClick={() => checkHospitalityIndex(1)}
        />
      </DisplaySection>

      <DisplaySection title="Fechado! O total ficou em R$100. Agora é só confirmar" isActive={modalityIndex === 1}>
        <FlatButton description="Reservar ingresso" />
      </DisplaySection>
    </PaymentSection>
  );
}

const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;
