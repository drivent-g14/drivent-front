import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import React, { useEffect, useState } from 'react';
import Input from '../Form/Input';
import { useForm } from '../../hooks/useForm';
import PaymentValidation from './PaymentValidation';
import { toast } from 'react-toastify';
import FlatButton from '../Dashboard/Buttons/FlatButton';
import usePayment from '../../hooks/api/usePayment';
import * as useTicket from '../../hooks/api/useTicket';

export default function PaymentForm({ setShowPaymentSuccess }) {
  const [issuer, setIssuer] = useState('');
  const [ticketId, setTicketId] = useState(0);
  const { ticket } = useTicket.useGetTicket();

  useEffect(() => {
    if (ticket) setTicketId(ticket.id);
  }, [ticket]);

  const { handleChange, handleInputFocus, handleSubmit, data, errors } = useForm({
    validations: PaymentValidation,

    onSubmit: async(data) => {
      const newData = {
        name: data.name,
        number: data.number,
        expiry: data.expiry,
        cvc: data.cvc,
        focused: data.focused,
      };

      try {
        if (issuer === 'unknown') toast('Cartão inválido!');
        else {
          await createPayment();
          setShowPaymentSuccess(true);
        }
      } catch (error) {
        toast('Não foi possível processar o pagamento!');
      }
    },

    initialValues: {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
      focused: '',
    },
  });

  const { createPayment } = usePayment({
    ticketId,
    cardData: {
      issuer: issuer,
      number: data.number,
      name: data.name,
      expirationDate: data.expiry,
      cvv: data.cvc,
    },
  });

  return (
    <>
      <Wrapper>
        <Cards
          cvc={data.cvc}
          expiry={data.expiry}
          name={data.name}
          number={data.number}
          focused={data.focused}
          callback={({ issuer }, isValid) => {
            setIssuer(issuer);
          }}
          acceptedCards={['visa', 'mastercard']}
        />
        <Form>
          <Input
            name="number"
            label="Card Number"
            type="text"
            size="small"
            helperText="E.g.: 49..., 51..., 36..., 37..."
            value={data.number}
            onChange={handleChange('number')}
            onFocus={handleInputFocus}
          />
          {errors.number && <ErrorMsg>{errors.number}</ErrorMsg>}
          <Input
            type="text"
            name="name"
            label="Name"
            size="small"
            value={data.name}
            onChange={handleChange('name')}
            onFocus={handleInputFocus}
          />
          {errors.name && <ErrorMsg>{errors.name}</ErrorMsg>}
          <InputAligner>
            <div>
              <Input
                type="text"
                name="expiry"
                label="Valid Thru"
                size="small"
                sx={{ width: '10px' }}
                value={data.expiry}
                onChange={handleChange('expiry')}
                onFocus={handleInputFocus}
              />
              {errors.expiry && <ErrorMsg>{errors.expiry}</ErrorMsg>}
            </div>
            <div>
              <Input
                type="text"
                name="cvc"
                label="CVC"
                size="small"
                value={data.cvc}
                onChange={handleChange('cvc')}
                onFocus={handleInputFocus}
              />
              {errors.cvc && <ErrorMsg>{errors.cvc}</ErrorMsg>}
            </div>
          </InputAligner>
        </Form>
      </Wrapper>
      <FlatButton onClick={handleSubmit} description="Finalizar pagamento" />
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  column-gap: 32px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputAligner = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 12px;
  padding: 5px 0 0 5px;
`;
