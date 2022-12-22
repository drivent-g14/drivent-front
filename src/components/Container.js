import styled from 'styled-components';

export default function Container({ children }) {
  return ( 
    <Wrapp>
      {children}
    </Wrapp>
  );
};

const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;

  h6{
    font-size: 28px;
  }
  
`;
