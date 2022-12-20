import styled from 'styled-components';

export default function PaymentConfirmation() {
  return (
    <PaymentSection>
      <TitleSection>Ingresso e Pagamento</TitleSection>
    </PaymentSection>
  );
}

const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const TitleSection = styled.p`
  font-size: 28px;
`;
