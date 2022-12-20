import styled from 'styled-components';
import CardContainer from '../../../components/Dashboard/Containers/CardContainer';
export default function Hotel() {
  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
      <HotelsOptionSection>
        <p>Primeiro, escolha seu hotel</p>
        <HotelsCardsSection>
          <CardContainer />
        </HotelsCardsSection>
      </HotelsOptionSection>
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

const HotelsOptionSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap:16px;
  font-size: 18px;
  color: #9e9e9e;
`;

const HotelsCardsSection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap:24px;
  align-items: center;
`;
