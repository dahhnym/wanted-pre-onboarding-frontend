import Edit from './../../../assets/edit.svg';
import Delete from './../../../assets/delete.svg';
import { deleteTodo } from '../../../api';
import { useContext } from 'react';
import TodoContext from '../../../store/todo-context';

const ToDoControlButtons = ({ todoData }) => {
  const ctx = useContext(TodoContext);

  const { id } = todoData;

  const handleDeleteTodo = async e => {
    const selectedTodoIdNumber = Number(e.target.value);
    ctx.setSelectedTodoId(selectedTodoIdNumber);
    const response = await deleteTodo(selectedTodoIdNumber, ctx.accessToken);
    if (response.isSuccess) {
      ctx.fetchTodoData();
    } else {
      ctx.resetEditStatus();
      alert(`에러 코드 ${response.data.statusCode}. 투두 삭제 실패`);
      return;
    }
  };

  return (
    <div>
      <div className="button-wrapper">
        <button
          type="button"
          className="list-item__button"
          onClick={e => ctx.toggleEditTodo(e.target.value)}
          value={id}
          disabled={ctx.todoEditState.isEditing}
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
          value={id}
          disabled={ctx.todoEditState.isEditing}
          style={{
            background: `center / cover no-repeat url(${Delete})`,
            width: '20px',
            height: '20px',
          }}
        >
          <span className="a11y-hidden">삭제</span>
        </button>
      </div>
    </div>
  );
};

export default ToDoControlButtons;
