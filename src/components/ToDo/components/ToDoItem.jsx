import ToDoControlButtons from './ToDoControlButtons';
import { updateTodo } from '../../../api';
import ToDoEditButtons from './ToDoEditButtons';
import Checkbox from './Checkbox';
import ToDoContent from './TodoContent';
import { useContext } from 'react';
import TodoContext from '../../../store/todo-context';
import { useReducer } from 'react';

const EDITING_TODO = 'EDITING_TODO';

const todoReducer = (state, action) => {
  if (action.type === EDITING_TODO) {
    return {
      ...state,
      val: action.val,
    };
  }
};

const ToDoItem = ({ todoSingleData }) => {
  const { id } = todoSingleData;
  const accessToken = localStorage.getItem('access_token');

  const ctx = useContext(TodoContext);

  const initialState = {
    val: todoSingleData.todo,
  };

  const [todoState, dispatchTodo] = useReducer(todoReducer, initialState);

  const editTodo = e => {
    dispatchTodo({ type: 'EDITING_TODO', val: e.target.value });
  };

  const handleUpdateTodo = async (id, newTodo, isCompletedStatus) => {
    if (newTodo.trim().length === 0) {
      ctx.resetEditStatus();
      return;
    }
    const isSuccess = await updateTodo(
      id,
      newTodo,
      isCompletedStatus,
      accessToken,
    );
    if (isSuccess) {
      ctx.fetchTodoData(accessToken);
    }
    ctx.resetEditStatus();
  };

  return (
    <li key={id} className="list-item">
      <div className="list-item-desc__wrapper">
        <Checkbox
          todoData={todoSingleData}
          handleUpdateTodo={handleUpdateTodo}
        />
        <ToDoContent
          newTodo={todoState.val}
          onEditTodo={editTodo}
          todoData={todoSingleData}
        />
      </div>
      {ctx.todoEditState.isEditing &&
        ctx.todoEditState.selectedTodoId === id && (
          <ToDoEditButtons
            handleUpdateTodo={handleUpdateTodo}
            newTodo={todoState.val}
            todoData={todoSingleData}
          />
        )}
      {ctx.todoEditState.selectedTodoId !== id &&
        !ctx.todoEditState.isEditing && (
          <ToDoControlButtons todoData={todoSingleData} />
        )}
    </li>
  );
};

export default ToDoItem;
