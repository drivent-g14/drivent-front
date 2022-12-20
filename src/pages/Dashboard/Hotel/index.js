import styled from 'styled-components';
import CardContainer from '../../../components/Dashboard/Containers/CardContainer';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';
import image from '../../../assets/images/hotels1.png';
export default function Hotel() {
  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
      <DisplaySection title={'Primeiro, escolha seu hotel'}>
        <CardContainer title={'Driven Resort'} roomsTypes={'Suites'} vacancies={12} image={image}/>
        <CardContainer title={'Driven Hotel 2'} roomsTypes={'Suites, cama'} vacancies={12}/>
        <CardContainer/>
      </DisplaySection>
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

