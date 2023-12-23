export const getAccessToken = (tokenName = "access-token") =>
  localStorage.getItem(tokenName);

export const setAccessToken = (token: string, tokenName = "access-token") =>
  localStorage.setItem(tokenName, token);

export const removeAccessToken = (tokenName = "access-token") =>
  localStorage.removeItem(tokenName);

export const checkAccessToken = () => !!getAccessToken();
