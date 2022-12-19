import styled from 'styled-components';

export default function Hotel() {
  return (
    <HotelsSections>
      <TitleSection>Escolha de Hotel e quarto</TitleSection>
    </HotelsSections>
  );
}
const HotelsSections = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
  background-color: red;
`;
const TitleSection = styled.p`
  font-size: 28px;
`;

