import api from './api';

export async function oAuthGithub(code) {
  console.log(code);
  const response = await api.get('/oauth/github', {
    params: {
      code: code,
    },
  });
  return response.data;
}
