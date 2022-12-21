import styled from 'styled-components';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import React, { useEffect, useState } from 'react';
import Input from './Input';
import { useForm } from '../../hooks/useForm';
import FormValidations from '../PersonalInformationForm/FormValidations';
import { toast } from 'react-toastify';
import FlatButton from '../Dashboard/Buttons/FlatButton';
import * as useTicket from '../../hooks/api/useTicket';

export default function PaymentForm() {
  const { ticket } = useTicket.useGetTicket();

  useEffect(() => {
    console.log(ticket);
  }, [ticket]);

  const {
    handleChange,
    handleSubmit,
    data,
    errors,
    handleInputFocus
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
      try {
        toast('Pagamento realizado com sucesso!');
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
    }
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
        />
        <Form >
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
              type="text"
              name="expiry"
              label="Valid Thru"
              value={data.expiry}
              onChange={handleChange('expiry')}
              onFocus={handleInputFocus}
            />
            <Input
              type="text"
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
