const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: 'Digite um nome válido'
    },
  },
  number: {
    custom: {
      isValid: (value) => !isNaN(parseInt(value)) && parseInt(value?.length) === 16,
      message: 'Digite um número válido'
    }
  },
  cvc: {
    custom: {
      isValid: (value) => !isNaN(parseInt(value)) && parseInt(value?.length) === 3,
      message: 'Digite um cvc válido'
    }
  },
  expiry: {
    custom: {
      isValid: (value) => !isNaN(parseInt(value)) && parseInt(value?.length) === 4,
      message: 'Digite uma data válida'
    }
  }
};

export default validations;

function isValidString(value) {
  return value || value?.trim();
}
