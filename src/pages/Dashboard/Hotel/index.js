import styled from 'styled-components';
import CardContainer from '../../../components/Dashboard/Containers/CardContainer';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';

export default function Hotel() {
  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
      <DisplaySection title={'Primeiro, escolha seu hotel'}>
        <CardContainer title={'Driven Resort'} roomsTypes={'Suites'} vacancies={12} image={'https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} />
        <CardContainer title={'Driven Hotel 2'} roomsTypes={'Suites, cama'} vacancies={12}/>
        <CardContainer />
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

