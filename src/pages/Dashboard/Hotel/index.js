import styled from 'styled-components';
import { useEffect } from 'react';
import CardContainer from '../../../components/Dashboard/Containers/CardContainer';
import DisplaySection from '../../../components/Dashboard/Sections/DisplaySection';
import useHotel from '../../../hooks/api/useHotels';
export default function Hotel() {
  const { hotels } = useHotel();

  useEffect(() => {

  }, [hotels]);
  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
      <DisplaySection title={'Primeiro, escolha seu hotel'}>
        {hotels ? hotels.map((data, index) => (
          <CardContainer key={index} title={data.name} image={data.image} />
        )) : ' '}
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

