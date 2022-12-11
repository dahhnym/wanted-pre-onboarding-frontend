import './Todo.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, getTodos, postTodo } from '../../api';

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
  const [todo, setTodo] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState();
  const [isEditing, setIsEditing] = useState(false);

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
    const isSuccess = await postTodo(todo, accessToken);
    if (isSuccess) {
      await fetchTodoData();
    }
  };

  const writeTodo = e => {
    setTodo(e.target.value);
  };

  const handleUpdateTodo = e => {
    const selectedTodoIdNumber = Number(e.target.value);
    setSelectedTodoId(selectedTodoIdNumber);
    setIsEditing(true);
  };

  const handleDeleteTodo = async e => {
    const selectedTodoIdNumber = Number(e.target.value);
    setSelectedTodoId(selectedTodoIdNumber);
    const isSuccess = await deleteTodo(selectedTodoIdNumber);
    if (isSuccess) {
      await fetchTodoData();
    }
  };

  return (
    <div>
      {}
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
        {todoData &&
          todoData.map(item => {
            return (
              <li key={item.id}>
                <input type="checkbox" />
                {isEditing && selectedTodoId === item.id ? (
                  <>
                    <input type="text" value={item.todo} onChange={writeTodo} />
                  </>
                ) : (
                  <label htmlFor="">{item.todo}</label>
                )}
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleUpdateTodo}
                  value={item.id}
                >
                  {isEditing && selectedTodoId === item.id ? '완료' : '수정'}
                </button>

                {isEditing ? null : (
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleDeleteTodo}
                    value={item.id}
                  >
                    삭제
                  </button>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ToDo;
