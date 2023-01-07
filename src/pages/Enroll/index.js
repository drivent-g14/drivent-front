import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';

import EventInfoContext from '../../contexts/EventInfoContext';
import githubLogo from '../../assets/images/github-icon-9.png';
import useSignUp from '../../hooks/api/useSignUp';
import styled from 'styled-components';
import useOAuthGithub from '../../hooks/api/useOAuth';

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();

  const { eventInfo } = useContext(EventInfoContext);
  const { oAuthGithub } = useOAuthGithub();

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }

  function redirectToGithub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = '663f23177c565f1cbd23';
    const authURL = `${GITHUB_URL}?client_id=${CLIENT_ID}`;
    window.location.href = authURL;
  }

  window.onload = async() => {
    const queryParamsString = window.location.search.substring(1);
    const queryParams = queryParamsString.split('&').reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, {});
    if (queryParams.code) {
      try {
        const userInfo = await oAuthGithub(queryParams.code);
        await signUp(`${userInfo.login}@github.com`, userInfo.node_id);
        toast('Usuário cadastrado com sucesso!');
        navigate('/sign-in');
      } catch (error) {}
    }
  };

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Repita sua senha"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>
            Inscrever
          </Button>
        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
        <GithubButton onClick={() => redirectToGithub()}>
          <GithubLogo src={githubLogo} alt="github-sign-up" />
          <VerticalDivider></VerticalDivider>
          Sign-up com Github
        </GithubButton>
      </Row>
    </AuthLayout>
  );
}

const GithubLogo = styled.img`
  height: 100%;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 70%;
  background-color: white;
  margin: 0 5px 0 0;
`;

const GithubButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: #444444;
  color: white;
  padding-right: 5px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;
