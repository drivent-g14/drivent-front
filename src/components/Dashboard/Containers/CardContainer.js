import { Box } from '@material-ui/core';
import styled from 'styled-components';

//[height]: Define a altura do container;
//[width]: Define a largura do container;
//[tapped]: Caso seja true, a cor do background muda (usar com setState). Default false;
//[description] - String: Descrição a ser mostrada no container;
//[value]- String opcional: Valor a ser mostrado no container(geralmente em R$);
//[...props]: Demais parametros que o componente permita, Ex: onClick. Porém deve ser utilizado na
//na construção do componente

export default function CardContainer({ height, width, description, value, isTapped, ...props }) {
  return (
    <MuiContainer>

    </MuiContainer>
  );
}

const MuiContainer = styled(Box)`
    cursor: pointer;
    background-color:#EBEBEB;
    border-radius:20px;
    overflow: hidden;
`;
