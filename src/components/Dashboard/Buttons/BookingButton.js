import styled from 'styled-components';
import { IoPerson, IoPersonOutline } from 'react-icons/io5';
export default function BookingButton({
  height,
  width,
  number,
  ocupations,
  selection,
  ...props }) {
  function changeIcon(ocupation) {
    if(ocupation === 'RESERVED') { return <UserReserved/>;};
    if(ocupation === 'SELECT') { return <UserSelect />;};
    if(ocupation === 'VAGUE') { return <UserDefault />;};
  }
  function changeColor(selection) {
    if(selection === 'BUSY') return '#CECECE';
    if(selection === 'SELECT') return '#FFEED2';
    if(selection === 'DEFAULT') return '#FFFFFF';
  }
  return (
    <BookingButtonStyle height ={height} width={width} color = {changeColor(selection)}>
      <NumberButton>{number}</NumberButton>
      <DivIcon>{ocupations && ocupations.map(data => changeIcon(data))}</DivIcon>
    </BookingButtonStyle>
  );
}

const BookingButtonStyle = styled.button`
    height: ${(props) => props.height || '36px'};
    width: ${(props) => props.width || '180px'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    cursor:pointer;
    border-radius:8px;
    border: solid 1px #CECECE;
    background-color: ${(props) => props.color};
`;

const NumberButton = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #454545;
`;

const DivIcon = styled.div`
  height:100%;
  width:100%;
  display: flex;
  justify-content:end;
  align-items:center;
`;

const UserDefault = styled(IoPersonOutline)`
  font-size: 24px
`;

const UserReserved = styled(IoPerson)`
  font-size: 24px;
`;

const UserSelect = styled(UserReserved)`
  color:#FF4791;
`;

