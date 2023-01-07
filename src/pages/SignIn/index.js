import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';
import useOAuthGithub from '../../hooks/api/useOAuth';
import styled from 'styled-components';
import githubLogo from '../../assets/images/github-icon-9.png';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();
  const {  oAuthGithub } = useOAuthGithub();
  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
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
        const userData = await signIn(`${userInfo.login}@github.com`, userInfo.node_id);
        setUserData(userData);
        toast('Login realizado com sucesso!');
        navigate('/dashboard');
      } catch (error) {
        console.log(error);
        toast('Usuário não encontrado!');
        navigate('/enroll');
      }
    }
  };

  function redirectToGithub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = '663f23177c565f1cbd23';
    const authURL = `${GITHUB_URL}?client_id=${CLIENT_ID}`;
    window.location.href = authURL;
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>
            Entrar
          </Button>
        </form>
      </Row>
      <Link to="/enroll">Não possui login? Inscreva-se</Link>
      <GithubButton onClick={() => redirectToGithub()}>
        <GithubLogo src={githubLogo} alt="github-login" />
        <VerticalDivider></VerticalDivider>
        Login com Github
      </GithubButton>
      <Row></Row>
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
`;
