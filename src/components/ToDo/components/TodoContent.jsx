import { useContext } from 'react';
import TodoContext from '../../../store/todo-context';

const ToDoContent = ({ todoData, newTodo, onEditTodo }) => {
  const ctx = useContext(TodoContext);

  const { id, isCompleted, todo } = todoData;

  return (
    <>
      {ctx.todoEditState.selectedTodoId !== id && (
        <label
          htmlFor={id}
          className={`list-item__desc ${isCompleted ? 'completed' : ''}`}
        >
          {todo}
        </label>
      )}
      {ctx.todoEditState.isEditing &&
        ctx.todoEditState.selectedTodoId === id && (
          <input
            type="text"
            maxLength={20}
            value={newTodo}
            onChange={onEditTodo}
            className="list-item__edit-input"
          />
        )}
    </>
  );
  //
};

export default ToDoContent;
