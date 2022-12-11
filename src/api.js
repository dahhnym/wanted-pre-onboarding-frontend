import axios from 'axios';

axios.defaults.baseURL = 'https://pre-onboarding-selection-task.shop/';

const accessToken = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

export const signUpNewUser = async (email, password) => {
  const accessToken = await axios
    .post('/auth/signup', { email: email, password: password })
    .then(res => {
      alert('Sign up success!');
      return res.data['access_token'];
    })
    .catch(error => console.error(error));
  return accessToken;
};

export const getUser = async (email, password) => {
  const accessToken = await axios
    .post('/auth/signin', { email: email, password: password })
    .then(res => {
      if (res.status === 200) {
        alert('You are signed in!');
        return res.data['access_token'];
      }
    })
    .catch(error => console.error(error));
  return accessToken;
};

export const getTodo = async () => {
  try {
    const todoData = await axios.get('/todos').then(res => {
      console.log('todo res.data', res);
      return res.data;
    });

    return todoData;
  } catch (error) {
    console.error(error);
  }
};

export const postTodo = async todoInput => {
  console.log('todoInput', todoInput);
  try {
    await axios
      .post('/todos', {
        headers: {
          'Content-type': 'application/json',
        },
        data: {
          todo: 'todoInput',
        },
      })
      .then(res => {
        console.log('create to do');
        alert('create todo result', res.status);
      });
  } catch (error) {
    console.error(error);
  }
};
