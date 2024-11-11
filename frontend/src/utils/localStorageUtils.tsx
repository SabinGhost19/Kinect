export const getAccesTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('accssesToken');
};

export const setAccesTokenInLocalStorare = (accessToken: string): void => {
  localStorage.setItem('accssesToken', accessToken);
};

export const setRefreshTokenInLocalStorare = (refreshToken: string): void => {
  localStorage.setItem('refreshToken', refreshToken);
};

export const getRefreshTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('refreshToken');
};
