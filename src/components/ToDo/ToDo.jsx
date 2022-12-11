import './Todo.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, getTodos, postTodo, updateTodo } from '../../api';

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
  const [newTodo, setNewTodo] = useState('');

  const fetchTodoData = async () => {
    const todos = await getTodos(accessToken);
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

  const handleEditTodo = e => {
    const selectedTodoIdNumber = Number(e.target.value);
    setSelectedTodoId(selectedTodoIdNumber);
    setIsEditing(prev => !prev);
    setNewTodo('');
  };

  const editTodo = e => {
    setNewTodo(e.target.value);
  };

  const handleUpdateTodo = async (id, todoContent, isCompletedStatus) => {
    const isSuccess = await updateTodo(id, todoContent, isCompletedStatus);
    if (isSuccess) {
      await fetchTodoData();
    }
    await setIsEditing(false);
    await setSelectedTodoId(0);
    await setNewTodo('');
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
                <input
                  type="checkbox"
                  id={item.id}
                  checked={item.isCompleted}
                  onChange={() =>
                    handleUpdateTodo(item.id, item.todo, !item.isCompleted)
                  }
                />
                {selectedTodoId !== item.id && (
                  <label
                    htmlFor={item.id}
                    className={item.isCompleted ? 'item-completed' : ''}
                  >
                    {item.todo}
                  </label>
                )}
                {isEditing && selectedTodoId === item.id && (
                  <>
                    <input type="text" value={newTodo} onChange={editTodo} />
                    <button
                      type="button"
                      onClick={() =>
                        handleUpdateTodo(
                          selectedTodoId,
                          newTodo,
                          item.isCompleted,
                        )
                      }
                    >
                      완료
                    </button>
                    <button type="button" onClick={handleEditTodo}>
                      취소
                    </button>
                  </>
                )}
                {selectedTodoId !== item.id && (
                  <>
                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={handleEditTodo}
                      value={item.id}
                      disabled={isEditing}
                    >
                      수정
                    </button>

                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={handleDeleteTodo}
                      value={item.id}
                      disabled={isEditing}
                    >
                      삭제
                    </button>
                  </>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ToDo;
