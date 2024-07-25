import {  getCookie  } from 'cookies-next';

const getTokenFromCookie = () => {
  let token;

    token = getCookie('token2');
    
  return token;
};

export { getTokenFromCookie };
