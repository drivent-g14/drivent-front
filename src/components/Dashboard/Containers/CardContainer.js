import { Box } from '@material-ui/core';
import { CiImageOff } from 'react-icons/ci';
import styled from 'styled-components';

function TextsOfCards({ roomsTypes, vacancies }) {
  function FilterRomms(roomsTypes) {
    roomsTypes = roomsTypes.filter((elem, index, self) => self.indexOf(elem) === index);
    if (roomsTypes.length === 1) { return roomsTypes; };
    if (roomsTypes.length === 2) { return roomsTypes.join(' e '); };
    if (roomsTypes.length > 2) {
      const last = roomsTypes.pop();
      return roomsTypes.join(', ') + ' e ' + last;
    }
  }

  return (
    <>
      <SubTitleCard>Tipos de acomodação
        <TextCard>{FilterRomms(roomsTypes)}</TextCard>
      </SubTitleCard>
      <SubTitleCard>Vagas disponíveis:
        <TextCard>{vacancies.reduce((acc, cur) => acc + cur, 0)}</TextCard>
      </SubTitleCard>
    </>
  );
}

//[height]: Define a altura do container;
//[width]: Define a largura do container;
//[title] - String: Adiciona um titulo ao Card;
//[image - String: Deve ser enviar uma url da imagem, assim é adicionado a um imagem ao card;
//[roomType] - String(opcional porém é necessário o vacancies): Diz os tipos de quartos disponíveis, ex: Suíte, Single...;
//[vancancies]- String(opcional porém é necessário roomsType): Diz o numero de vagas no hotel disponivel;
//[...props]: Demais parametros que o componente permita, Ex: onClick. Porém deve ser utilizado na
//na construção do componente

export default function CardContainer({ height, width, image, title, roomsTypes, vacancies, isTapped, ...props }) {
  return (
    <MuiContainer
      height={height}
      width={width}
      tapped={isTapped}
      sx={{ height: height ?? '280px', width: width ?? '210px' }}
      {...props}
      disabladed = {!vacancies}
    >

      <CardContent>
        <CardMedia>
          {image ? <CardImage src={image} /> : <CustomCiImageIcon />}
        </CardMedia>
        <TitleCard>{title ?? ''}</TitleCard>
        {(roomsTypes.length && vacancies.length) ?
          <TextsOfCards roomsTypes={roomsTypes} vacancies={vacancies} />
          : ''}
      </CardContent>

    </MuiContainer>

  );
}

const MuiContainer = styled(Box)`
  cursor: pointer;
  background-color: ${(props) => props.tapped ? '#FFEED2': '#EBEBEB'}  ;
  border-radius: 16px;
  overflow: hidden;
`;

const CardContent = styled.div`
  display: flex;
  height: 100%;
  width: 100%
  column-gap: 8px;
  row-gap: 16px;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 20px;
`;

const CardMedia = styled.div`
  height: 120px;
  width: 180px;
  border-radius: 16px;
  align-self:center;
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 16px;
`;

const CustomCiImageIcon = styled(CiImageOff)`
  height:100%;
  width: 100%;
`;

const TitleCard = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color:#343434;
`;

const SubTitleCard = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
`;

const TextCard = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
  margin-top: 2.5px;
`;
