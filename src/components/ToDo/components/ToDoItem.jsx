import ToDoControlButtons from './ToDoControlButtons';
import { useState } from 'react';
import { updateTodo } from '../../../api';
import ToDoEditButtons from './ToDoEditButtons';
import Checkbox from './Checkbox';
import ToDoContent from './TodoContent';

const ToDoItem = ({ todoData, fetchTodoData }) => {
  const { id, isCompleted, todo } = todoData;
  const accessToken = localStorage.getItem('access_token');

  const [selectedTodoId, setSelectedTodoId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState('');

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

  return (
    <li key={id} className="list-item">
      <div className="list-item-desc__wrapper">
        <Checkbox
          id={id}
          isCompleted={isCompleted}
          todo={todo}
          handleUpdateTodo={handleUpdateTodo}
        />
        <ToDoContent
          selectedTodoId={selectedTodoId}
          id={id}
          isCompleted={isCompleted}
          todo={todo}
          isEditing={isEditing}
          newTodo={newTodo}
          editTodo={editTodo}
        />
      </div>
      {isEditing && selectedTodoId === id && (
        <ToDoEditButtons
          handleUpdateTodo={handleUpdateTodo}
          selectedTodoId={selectedTodoId}
          newTodo={newTodo}
          isCompleted={isCompleted}
          handleEditTodo={handleEditTodo}
        />
      )}
      {selectedTodoId !== id && !isEditing && (
        <ToDoControlButtons
          fetchTodoData={fetchTodoData}
          setSelectedTodoId={setSelectedTodoId}
          handleEditTodo={handleEditTodo}
          isEditing={isEditing}
          id={id}
          accessToken={accessToken}
        />
      )}
    </li>
  );
};

export default ToDoItem;
