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

  function setDataAndNavigate(userData) {
    setUserData(userData);
    toast('Login realizado com sucesso!');
    navigate('/dashboard');
  }

  function getQueryParams() {
    const queryParamsString = window.location.search.substring(1);
    const queryParams = queryParamsString.split('&').reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      acc[key] = value;
      return acc;
    }, {});
    return queryParams;
  }

  async function submit(event) {
    event.preventDefault();
    try {
      const userData = await signIn(email, password);
      setDataAndNavigate(userData);
    } catch (_) {
      toast('Não foi possível fazer o login!');
    }
  }

  window.onload = async() => {
    let userInfo;
    const queryParams = getQueryParams();

    if (queryParams.code) {
      try {
        userInfo = await oAuthGithub(queryParams.code);
        await signUp(`${userInfo.login}@github.com`, userInfo.node_id);
      } catch (_) {
      } finally {
        try {
          const userData = await signIn(`${userInfo.login}@github.com`, userInfo.node_id);
          setDataAndNavigate(userData);
        } catch (_) {
          toast('Favor tente novamente!');
        }
      }
    }
  };

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
      <GithubButton />
      <Row></Row>
    </AuthLayout>
  );
}
