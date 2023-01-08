import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
import useSignUp from '../../hooks/api/useSignUp';
import GithubButton from '../../components/GithubButton';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();
  const { oAuthGithubLoading, oAuthGithub } = useOAuthGithub();
  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);
  const { signUp } = useSignUp();
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    try {
      const userData = await signIn(email, password);
      //setUserData(userData);
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
      let userInfo;
      try {
        userInfo = await oAuthGithub(queryParams.code);
        await signUp(`${userInfo.login}@github.com`, userInfo.node_id);
      } catch (_) {}

      try {
        const userData = await signIn(`${userInfo.login}@github.com`, userInfo.node_id);
        //setUserData(userData);
        toast('Login realizado com sucesso!');
        //navigate('/dashboard');
      } catch (_) {
        toast('Favor tente novamente!');
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
          <Input
            label="E-mail"
            type="text"
            fullWidth
            value={email}
            disabled={loadingSignIn || oAuthGithubLoading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Senha"
            type="password"
            fullWidth
            value={password}
            disabled={loadingSignIn || oAuthGithubLoading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn || oAuthGithubLoading}>
            Entrar
          </Button>
        </form>
      </Row>
      <Link to="/enroll">Não possui login? Inscreva-se</Link>
      <GithubButton onClick={() => redirectToGithub()}/>
      {/* <GithubButton onClick={() => redirectToGithub()}> */}
      <Row></Row>
    </AuthLayout>
  );
}
