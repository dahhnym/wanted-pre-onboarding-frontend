import axios from 'axios';
import { redirect } from 'react-router-dom';

axios.defaults.baseURL = 'https://pre-onboarding-selection-task.shop/';

export const signUpNewUser = (email, password) => {
  axios.post('/auth/signup', { email: email, password: password }).then(res => {
    alert('Sign up success!');
    localStorage.setItem('access_token', res.data['access_token']);
  });
};

export const signInUser = (email, password) => {
  axios.post('auth/signin', { email: email, password: password }).then(res => {
    alert('You are signed in!');
    if (localStorage.getItem('access_token')) {
      return;
    }
    localStorage.setItem('access_token', res.data['access_token']);
    if (res.status === 200) {
      console.log(`status code ${res.status}`);
      redirect('/todo');
    }
  });
};
