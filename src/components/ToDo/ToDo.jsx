import './Todo.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos, postTodo } from '../../api';

const ToDo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/');
      }
    };
    checkAccessToken();
  }, []);

  const [todoData, setTodoData] = useState([]);
  const [todo, setTodo] = useState('');

  const fetchTodoData = async () => {
    const todos = await getTodos();
    return setTodoData(todos);
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  const createToDo = async e => {
    e.preventDefault();
    setTodo('');
    const isSuccess = await postTodo(todo);
    if (isSuccess) {
      await fetchTodoData();
    }
  };

  const writeTodo = e => {
    setTodo(e.target.value);
  };

  return (
    <div>
      <h4>to do list</h4>
      <form onSubmit={createToDo}>
        <label htmlFor="">할일목록</label>
        <input
          type="text"
          placeholder="to do"
          value={todo}
          onChange={writeTodo}
        />
        <button type="submit" className="btn-submit__create-todo">
          추가
        </button>
      </form>
      <ul>
        {todoData.length > 0 &&
          todoData.map(item => {
            return (
              <li key={item.id}>
                <input type="checkbox" />
                <label htmlFor="">{item.todo}</label>
                <button type="button" className="btn-cancel">
                  수정
                </button>
                <button type="button" className="btn-cancel">
                  삭제
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ToDo;
