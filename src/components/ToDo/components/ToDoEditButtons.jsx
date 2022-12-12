import Confirm from './../../../assets/confirm.svg';
import Cancel from './../../../assets/cancel.svg';
import { useContext } from 'react';
import TodoContext from '../../../store/todo-context';

const ToDoEditButtons = ({ handleUpdateTodo, newTodo, todoData }) => {
  const ctx = useContext(TodoContext);

  const { isCompleted } = todoData;

  return (
    <div className="button-wrapper">
      <button
        type="button"
        onClick={() =>
          handleUpdateTodo(
            ctx.todoEditState.selectedTodoId,
            newTodo,
            isCompleted,
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
        onClick={e => ctx.toggleEditTodo(e.target.value)}
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
  );
};

export default ToDoEditButtons;
