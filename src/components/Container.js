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
  height: 100%;
  position: relative;
 
  .NoResult{
    position: absolute;
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

    p{
      color: #8E8E8E;
      font-size: 20px;
      font-weight: 400;
      text-align: center;
    }
  }

  h6{
    font-size: 28px;
  }
`;
