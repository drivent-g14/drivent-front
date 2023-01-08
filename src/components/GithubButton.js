import styled from 'styled-components';
import githubLogo from '../assets/images/github-icon-9.png';

export default function GithubButton({ ...props }) {
  return (
    <GithubButtonContainer {...props}>
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
