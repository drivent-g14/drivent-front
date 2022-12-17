import styled from 'styled-components';

//[height]: Define a altura do container;
//[width]: Define a largura do container;
//[hasBoxShadow] - boolean: Deixa o componente com a cor default, ele vem como default true;
// com um efeito de box-shadow;
//[borderColor]: hasBoxShadow deve estar false para funcionar. Define a cor da borda;
//[backgroundColor]: Define o background do container;

export default function Container({ height, width, hasBoxShadow, borderColor, backgroundColor }) {
  return (
    <BoxContainer
      height={height}
      width={width}
      hasBoxShadow={hasBoxShadow ?? true}
      borderColor={borderColor ?? 'rgba(0, 0, 0, 0.2)'}
      backgroundColor={backgroundColor}
    />
  );
}

const BoxContainer = styled.div`
  height: 100vh;
  max-height: ${(props) => props.height || '600px'};
  width: 100%;
  max-width: ${(props) => props.width || '1200px'};

  border-radius: 20px;
  background-color: ${(props) => props.backgroundColor || '#fff'};
  border: ${(props) => (props.hasBoxShadow ? '' : '1px')};
  border-style: ${(props) => (props.hasBoxShadow ? '' : 'solid')};
  border-color: ${(props) => (props.hasBoxShadow ? '' : props.borderColor)};
  box-shadow: ${(props) => (props.hasBoxShadow ? '4px 4px 10px 5px rgba(0, 0, 0, 0.2)' : '')};

  display: flex;
  overflow: hidden;

  @media (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
    height: auto;
    max-height: initial;
    min-width: 100%;
    max-width: initial;
  }
`;
