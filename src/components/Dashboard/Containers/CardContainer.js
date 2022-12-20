import { Box } from '@material-ui/core';
import styled from 'styled-components';

//[height]: Define a altura do container;
//[width]: Define a largura do container;
//[description] - String: Descrição a ser mostrada no container;
//[value]- String opcional: Valor a ser mostrado no container(geralmente em R$);
//[...props]: Demais parametros que o componente permita, Ex: onClick. Porém deve ser utilizado na
//na construção do componente

export default function CardContainer({ height, width, description, value, isTapped, ...props }) {
  return (
    <MuiContainer
      height={height}
      width={width}
      sx={{ height: height ?? '320px', width: width ?? '210px' }}
      {...props}
    >
      <CardContent>
        <div>teste</div>
        <div>teste</div>
        <div>teste</div>
      </CardContent>

    </MuiContainer>

  );
}

const MuiContainer = styled(Box)`
  cursor: pointer;
  background-color: #EBEBEB ;
  border-radius: 20px;
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
  background-color:red;
  padding: 20px;
`;
