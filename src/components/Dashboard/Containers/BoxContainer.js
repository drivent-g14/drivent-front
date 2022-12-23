import { Box } from '@material-ui/core';
import styled from 'styled-components';

//[height]: Define a altura do container;
//[width]: Define a largura do container;
//[tapped]: Caso seja true, a cor do background muda (usar com setState). Default false;
//[description] - String: Descrição a ser mostrada no container;
//[value]- String opcional: Valor a ser mostrado no container(geralmente em R$);
//[...props]: Demais parametros que o componente permita, Ex: onClick. Porém deve ser utilizado na
//na construção do componente

export default function BoxContainer({ height, width, description, value, isTapped, ...props }) {
  return (
    <MuiContainer
      height={height}
      width={width}
      tapped={isTapped ? 1 : 0}
      sx={{ height: height ?? '150px', width: width ?? '150px' }}
      {...props}
    >
      <DescriptionDiv>
        <Description>{description}</Description>
        <Value value={value}>{value}</Value>
      </DescriptionDiv>
    </MuiContainer>
  );
}

const MuiContainer = styled(Box)`
  cursor: pointer;
  background-color: ${(props) => (props.tapped ? '#FFEED2' : '#FFFFFF')};
  border-radius: 20px;
  border: ${(props) => (props.tapped ? '' : '1px')};
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

const DescriptionDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  row-gap: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const Description = styled.div`
  text-align: center;
  color: #454545;
  font-weight: 500;
`;

const Value = styled.div`
  color: #9e9e9e;
  display: ${(props) => (props.value ? '' : 'none')};
  font-weight: 300;
`;
