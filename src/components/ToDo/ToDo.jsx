import './Todo.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodos } from '../../api';
import ToDoForm from './components/ToDoForm';
import ToDoItem from './components/ToDoItem';
import Signout from '../Auth/components/Signout';

const ToDo = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const checkAccessToken = () => {
      if (!accessToken) {
        navigate('/');
      }
    };
    checkAccessToken();
  }, []);

  const [todoData, setTodoData] = useState([]);

  const fetchTodoData = async () => {
    const todos = await getTodos(accessToken);
    return setTodoData(todos);
  };

  useEffect(() => {
    fetchTodoData();
  }, []);

  return (
    <>
      <Signout />
      <div className="todo__container">
        <ToDoForm fetchTodoData={fetchTodoData} />
        <ul className="todo__list">
          {todoData &&
            todoData.map(item => {
              return (
                <ToDoItem
                  key={item.id}
                  todoData={item}
                  fetchTodoData={fetchTodoData}
                />
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
