import React, { useState } from 'react';
import { useReducer } from 'react';
import { getTodos } from './../api';

const TodoContext = React.createContext({
  todoData: [],
  fetchTodoData: () => {},
  accessToken: localStorage.getItem('access_token'),
  todoEditState: {},
  toggleEditTodo: value => {},
  resetEditStatus: () => {},
  setSelectedTodoId: value => {},
});

const TOGGLE_EDIT = 'TOGGLE_EDIT';
const RESET_EDIT_STATUS = 'RESET_EDIT_STATUS';
const DELETED_TODO = 'DELETED_TODO';

const editingTodoReducer = (state, action) => {
  if (action.type === TOGGLE_EDIT) {
    return {
      isEditing: !state.isEditing,
      selectedTodoId: action.selectedTodoId,
    };
  }
  if (action.type === RESET_EDIT_STATUS) {
    return {
      isEditing: false,
      selectedTodoId: 0,
    };
  }
  if (action.type === DELETED_TODO) {
    return {
      ...state,
      selectedTodoId: action.selectedTodoId,
    };
  }
};

export const TodoContextProvider = props => {
  const [todoData, setTodoData] = useState([]);

  const initialState = {
    isEditing: false,
    selectedTodoId: 0,
  };

  const [todoEditState, dispatchTodoEditStatus] = useReducer(
    editingTodoReducer,
    initialState,
  );

  const fetchTodoData = async accessToken => {
    const todos = await getTodos(accessToken);
    return setTodoData(todos);
  };

  const toggleEditTodo = value => {
    const selectedTodoIdNumber = Number(value);
    dispatchTodoEditStatus({
      type: TOGGLE_EDIT,
      selectedTodoId: selectedTodoIdNumber,
    });
  };

  const resetEditStatus = () => {
    dispatchTodoEditStatus({ type: RESET_EDIT_STATUS });
  };

  const setSelectedTodoId = value => {
    dispatchTodoEditStatus({ type: DELETED_TODO, selectedTodoId: value });
  };

  return (
    <TodoContext.Provider
      value={{
        todoData,
        fetchTodoData,
        toggleEditTodo,
        todoEditState,
        resetEditStatus,
        setSelectedTodoId,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
