import styled from 'styled-components';
import githubLogo from '../assets/images/github-icon-9.png';

export default function GithubButton() {
  function redirectToGithub() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    const CLIENT_ID = '663f23177c565f1cbd23';
    const authURL = `${GITHUB_URL}?client_id=${CLIENT_ID}`;
    window.location.href = authURL;
  }

  return (
    <GithubButtonContainer onClick={() => redirectToGithub()}>
      <GithubLogo src={githubLogo} alt="github-login" />
      <VerticalDivider></VerticalDivider>
      Login com Github
    </GithubButtonContainer>
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

const GithubButtonContainer = styled.div`
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
