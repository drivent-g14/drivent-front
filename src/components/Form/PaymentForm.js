import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import React, { useEffect, useState } from 'react';
import Input from './Input';
import { useForm } from '../../hooks/useForm';
import FormValidations from '../PersonalInformationForm/FormValidations';
import { toast } from 'react-toastify';
import FlatButton from '../Dashboard/Buttons/FlatButton';
import usePayment from '../../hooks/api/usePayment';
import * as useTicket from '../../hooks/api/useTicket';

export default function PaymentForm() {
  const [issuer, setIssuer] = useState('');
  const [ticketId, setTicketId] = useState(0);
  const { ticket } = useTicket.useGetTicket();

  useEffect(() => {
    if(ticket) setTicketId(ticket.id);
  }, [ticket]);

  const {
    handleChange,
    handleInputFocus,
    data,
    errors,
  } = useForm({
    validation: FormValidations,

    onSubmit: async(data) => {
      const newData = {
        name: data.name,
        number: data.number,
        expiry: data.expiry,
        cvc: data.cvc,
        focused: data.focused,
      };
    },

    initialValues: {
      name: '',
      number: '',
      expiry: '',
      cvc: '',
      focused: '',
    }
  });

  const { createPayment } = usePayment({
    ticketId,
    cardData: {
      issuer: issuer,
      number: data.number,
      name: data.name,
      expirationDate: data.expiry,
      cvv: data.cvc,
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    
    if(data.cvc.length !== 3 || data.expiry.length !== 4 || data.name.length > 16 || data.number.length > 16 || 
      data.name === '' || issuer === 'unknown')
      toast('Dados incorretos, insira novamente!');
    else{
      try {
        await createPayment();
        toast('Pagamento realizado com sucesso!');
      } catch (error) {
        toast('Não foi possível processar o pagamento!');
      }  
    }
  }

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
        />
        <Form >
          <Input
            name="number"
            label="Card Number"
            type="number"
            size="small"
            helperText="E.g.: 49..., 51..., 36..., 37..."
            value={data.number}
            onChange={handleChange('number')}
            onFocus={handleInputFocus}
          />
          <Input
            type="text"
            name="name"
            label="Name"
            size="small"
            value={data.name}
            onChange={handleChange('name')}
            onFocus={handleInputFocus}
          />
          <InputAligner>
            <Input
              type="number"
              name="expiry"
              label="Valid Thru"
              value={data.expiry}
              onChange={handleChange('expiry')}
              onFocus={handleInputFocus}
            />
            <Input
              type="number"
              name="cvc"
              label="CVC"
              value={data.cvc}
              onChange={handleChange('cvc')}
              onFocus={handleInputFocus}
            />
          </InputAligner> 
        </Form>
      </Wrapper>
      <FlatButton onClick={handleSubmit} description="Finalizar pagamento"/>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
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
