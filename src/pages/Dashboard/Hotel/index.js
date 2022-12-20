import styled from 'styled-components';
import CardContainer from '../../../components/Dashboard/Containers/CardContainer';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';

export default function Hotel() {
  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
      <DisplaySection title={'Primeiro, escolha seu hotel'}></DisplaySection>
      <CardContainer>

      </CardContainer>
    </HotelsSections>
  );
}
const HotelsSections = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
const TitleSection = styled.p`
  font-size: 28px;
`;

