import { useContext } from 'react';
import { useState } from 'react';
import { postTodo } from '../../../api';
import TodoContext from '../../../store/todo-context';

const ToDoForm = () => {
  const ctx = useContext(TodoContext);

  const accessToken = localStorage.getItem('access_token');
  const [todo, setTodo] = useState('');

  const createToDo = async e => {
    e.preventDefault();
    if (todo.trim().length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }
    const isSuccess = await postTodo(todo, accessToken);
    if (isSuccess) {
      ctx.fetchTodoData(accessToken);
    }
    setTodo('');
  };

  const writeTodo = e => {
    setTodo(e.target.value);
  };

  return (
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
      <p className="todo__form-desc">최대 20글자</p>
    </form>
  );
};

export default ToDoForm;
