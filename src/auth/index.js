import decode from 'jwt-decode';
import axios from 'axios';
import Router from 'vue-router';

const BASE_URL = 'http://localhost:3001';
const TOKEN_KEY = 'token';

export default {
    login, logout, requireAuth, getUser, getToken, isLoggedIn
}

function login(username, password) {
    const url = `${BASE_URL}/api/users/authenticate`;
    return axios.post(url, {user: username, password: password}).then( response => {
        setToken(response.data.token);
        const token = decode(response.data.token);
        return token.user;
    });
}

function getUser() {
  if ( isLoggedIn() ) {
    const token = decode(getToken());
    return token.user;
  }
  return {};
}

function logout() {
  clearToken();
}

function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

function isLoggedIn() {
  const token = getToken();
  return !!token && !isTokenExpired(token);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}