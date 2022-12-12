import './Todo.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTodo, getTodos, postTodo, updateTodo } from '../../api';
import Edit from './../../assets/edit.svg';
import Delete from './../../assets/delete.svg';
import Confirm from './../../assets/confirm.svg';
import Cancel from './../../assets/cancel.svg';
import Checked from './../../assets/checked.svg';
import NotChecked from './../../assets/not-checked.svg';

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
    if (todo.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }
    const isSuccess = await postTodo(todo, accessToken);
    if (isSuccess) {
      await fetchTodoData();
    }
    setTodo('');
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
    if (todoContent.trim().length === 0) {
      setIsEditing(false);
      setSelectedTodoId(0);
      return;
    }
    const isSuccess = await updateTodo(
      id,
      todoContent,
      isCompletedStatus,
      accessToken,
    );
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
    const response = await deleteTodo(selectedTodoIdNumber, accessToken);
    if (response.isSuccess) {
      await fetchTodoData();
    } else {
      setSelectedTodoId(0);
      alert(`에러 코드 ${response.data.statusCode}. 투두 삭제 실패`);
      return;
    }
  };

  const handleSignout = () => {
    localStorage.removeItem('access_token');
    navigate('/');
  };

  return (
    <>
      <button type="button" className="signout-button" onClick={handleSignout}>
        로그아웃
      </button>
      <div className="todo__container">
        <form onSubmit={createToDo} className="todo__form">
          <fieldset>
            <legend className="todo__title">To Do List</legend>
            <input
              type="text"
              maxLength="20"
              placeholder="To Do"
              value={todo}
              onChange={writeTodo}
            />
            <button type="submit" className="btn-submit__create-todo">
              추가
            </button>
          </fieldset>
          <desc className="todo__form-desc">최대 20글자</desc>
        </form>

        <ul className="todo__list">
          {todoData &&
            todoData.map(item => {
              return (
                <li key={item.id} className="list-item">
                  <div className="list-item-desc__wrapper">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.isCompleted}
                      onChange={() =>
                        handleUpdateTodo(item.id, item.todo, !item.isCompleted)
                      }
                      style={{ display: 'none' }}
                    />
                    <img
                      src={item.isCompleted ? Checked : NotChecked}
                      alt={item.isCompleted ? '완료' : '미완료'}
                      style={{ width: '25px' }}
                      onClick={() =>
                        handleUpdateTodo(item.id, item.todo, !item.isCompleted)
                      }
                    />
                    {selectedTodoId !== item.id && (
                      <label
                        htmlFor={item.id}
                        className={`list-item__desc ${
                          item.isCompleted ? 'completed' : ''
                        }`}
                      >
                        {item.todo}
                      </label>
                    )}
                    {isEditing && selectedTodoId === item.id && (
                      <input
                        type="text"
                        value={newTodo}
                        onChange={editTodo}
                        className="list-item__edit-input"
                      />
                    )}
                  </div>

                  {isEditing && selectedTodoId === item.id && (
                    <>
                      <div className="button-wrapper">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateTodo(
                              selectedTodoId,
                              newTodo,
                              item.isCompleted,
                            )
                          }
                          className="list-item__button"
                          style={{
                            background: `center / contain no-repeat url(${Confirm})`,
                            width: '20px',
                            height: '20px',
                          }}
                        >
                          <span className="a11y-hidden">확인</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleEditTodo}
                          className="list-item__button"
                          style={{
                            background: `center / contain no-repeat url(${Cancel})`,
                            width: '20px',
                            height: '20px',
                          }}
                        >
                          <span className="a11y-hidden">취소</span>
                        </button>
                      </div>
                    </>
                  )}
                  {selectedTodoId !== item.id && !isEditing && (
                    <div className="button-wrapper">
                      <button
                        type="button"
                        className="list-item__button"
                        onClick={handleEditTodo}
                        value={item.id}
                        disabled={isEditing}
                        style={{
                          background: `center / cover no-repeat url(${Edit})`,
                          width: '20px',
                          height: '20px',
                        }}
                      >
                        <span className="a11y-hidden">수정</span>
                      </button>
                      <button
                        type="button"
                        className="list-item__button"
                        onClick={handleDeleteTodo}
                        value={item.id}
                        disabled={isEditing}
                        style={{
                          background: `center / cover no-repeat url(${Delete})`,
                          width: '20px',
                          height: '20px',
                        }}
                      >
                        <span className="a11y-hidden">삭제</span>
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default ToDo;
