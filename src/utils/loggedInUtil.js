import store from '../reducers/store.js';

export const isLoggedIn = () => {
  const reduxState = store.getState();
  const currentUser = reduxState.currentUser;
  if (currentUser && currentUser.email) {
    console.log('logged in');
  }
}

export const redirectIfNotLoggedIn = (navigate) => {
  if (!isLoggedIn) {
    navigate.push('signin');
  }
}