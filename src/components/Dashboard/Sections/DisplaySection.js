import styled from 'styled-components';

//[title]: Espera uma string que seria o titulo do componente;
//[isActive] - boolean: Diz se a section deve ser mostrada ou não Default true;
//[children] (Deve ser um BoxContainer): Aceita qualquer componente como filho;

export default function DisplaySection({ title, isActive = true, children }) {
  return (
    <DisplayStyle isActive={isActive}>
      <p>{title}</p>
      <ChildrenSection>{children}</ChildrenSection>
    </DisplayStyle>
  );
}

const DisplayStyle = styled.div`
  display: flex;
  display: ${(props) => (props.isActive ? '' : 'none')};
  flex-direction: column;
  row-gap: 16px;
  font-size: 18px;
  color: #9e9e9e;
  width: 100%;
  overflow: hidden;
`;

const ChildrenSection = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  row-gap: 24px;
  align-items: center;
`;
