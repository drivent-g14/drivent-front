import useAsync from '../useAsync';

import * as oAuthApi from '../../services/oauthGithub';

export default function useOAuthGithub() {
  const {
    loading: oAuthGithubLoading,
    error: oAuthGithubError,
    act: oAuthGithub,
  } = useAsync(oAuthApi.oAuthGithub, false);

  return {
    oAuthGithub,
    oAuthGithubLoading,
    oAuthGithubError,
  };
}
