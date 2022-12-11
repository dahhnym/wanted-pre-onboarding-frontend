import axios from 'axios';

const accessToken = localStorage.getItem('access_token');
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.baseURL = 'https://pre-onboarding-selection-task.shop/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

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
  return await axios
    .post('/auth/signin', { email: email, password: password })
    .then(res => {
      if (res.status === 200) {
        alert('You are signed in!');
        return res.data['access_token'];
      }
    })
    .catch(error => console.error(error));
};

export const getTodos = async accessToken => {
  try {
    const todoData = await axios
      .get('/todos', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(res => {
        console.log(`status ${res.status} Fetch todos successfully`);
        return res.data;
      });
    return todoData;
  } catch (error) {
    console.error('Fail to get todos', error);
  }
};

export const postTodo = async todo => {
  try {
    return await axios
      .post('/todos', {
        todo,
      })
      .then(res => {
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
      params: {
        id,
      },
      data: {
        todo: todo,
        isCompleted: isCompletedStatus,
      },
    })
    .then(res => console.log('Update todo', res.status))
    .catch(error => console.error('Fail to update', error));
};

export const deleteTodo = async id => {
  return await axios
    .delete(`/todos/${id}`)
    .then(res => {
      console.log(`status ${res.status} Delete Success`);
      return true;
    })
    .catch(error => console.error('Fail to delete', error));
};
