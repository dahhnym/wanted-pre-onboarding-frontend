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

export const getTodos = async () => {
  try {
    const todoData = await axios.get('/todos').then(res => {
      console.log('getting todos', res.data);
      return res.data;
    });

    return todoData;
  } catch (error) {
    console.error(error);
  }
};

export const postTodo = async todo => {
  try {
    return await axios
      .post(
        '/todos',
        {
          todo,
        },
        {
          'Content-Type': 'application/json',
        },
      )
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          return true;
        } else {
          return false;
        }
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (id, todo, isCompletedStatus) => {
  await axios
    .put('/todos', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id,
      },
      data: {
        todo: todo,
        isCompleted: isCompletedStatus,
      },
    })
    .then(res => console.log(res.status))
    .catch(error => console.error(error));
};

export const deleteTodo = async id => {
  return await axios
    .delete(`/todos/${id}`)
    .then(res => {
      console.log(`status ${res.status} Delete Success`);
      return true;
    })
    .catch(error => console.error(error));
};
