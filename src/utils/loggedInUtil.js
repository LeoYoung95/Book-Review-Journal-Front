import store from '../reducers/store.js';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const isLoggedIn = () => {
  const reduxState = store.getState();
  const currentUser = reduxState.currentUser;
  return currentUser && currentUser.userId.length;
}

export const redirectIfNotLoggedIn = () => {
  if (!isLoggedIn()) {
    history.push('/signin');
    window.location.reload();
  }
}