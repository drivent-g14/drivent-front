import Button from '@material-ui/core/Button';
import styled from 'styled-components';

//[height]: Define a altura do container;
//[width]: Define a largura do container;
//[tapped]: Caso seja true, a cor do background muda (usar com setState). Default false;
//[description] - String: Descrição a ser mostrada no container;
//[value]- String opcional: Valor a ser mostrado no container(geralmente em R$);
//[...props]: Demais parametros que o componente permita, Ex: Disabled. Porém deve ser utilizado na
//na construção do componente

export default function FlatButton({ height, width, description, ...props }) {
  return (
    <FlatButtonContainer>
      <FlatButtonStyle height={height} width={width} {...props} variant="contained">
        {description}
      </FlatButtonStyle>
    </FlatButtonContainer>
  );
}

const FlatButtonContainer = styled.div`
  margin: 3px 3px 3px 0;
`;

const FlatButtonStyle = styled(Button)`
  height: ${(props) => props.height || '36px'};
  width: ${(props) => props.width || '180px'};
  display: flex;
  span {
    font-size: 12px;
  }
`;
