import './Todo.scss';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ToDoForm from './components/ToDoForm';
import ToDoItem from './components/ToDoItem';
import Signout from '../Auth/components/Signout';
import { useContext } from 'react';
import TodoContext from '../../store/todo-context';

const ToDo = () => {
  const ctx = useContext(TodoContext);

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

  useEffect(() => {
    ctx.fetchTodoData(accessToken);
  }, []);

  return (
    <>
      <Signout />
      <div className="todo__container">
        <ToDoForm />
        <ul className="todo__list">
          {ctx.todoData &&
            ctx.todoData.map(item => {
              return <ToDoItem key={item.id} todoSingleData={item} />;
            })}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
