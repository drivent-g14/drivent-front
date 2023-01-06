import styled from 'styled-components';
import { IoPersonOutline } from 'react-icons/io5';
export default function BookingButton({ height, width, number, ...props }) {
  return (
    <BookingButtonStyle>
      <NumberButton>101</NumberButton>
      <DivIcon><CustomIconUser/><CustomIconUser/><CustomIconUser/></DivIcon>
    </BookingButtonStyle>
  );
}

const BookingButtonStyle = styled.div`
    height: ${(props) => props.height || '36px'};
    width: ${(props) => props.width || '180px'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    cursor:pointer;
    border-radius:8px;
    border: solid 1px #CECECE;
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

const CustomIconUser = styled(IoPersonOutline)`
  height:100%
  width:100%;
  color:#000000
`;
