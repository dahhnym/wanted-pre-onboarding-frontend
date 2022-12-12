const ToDoContent = ({
  selectedTodoId,
  id,
  isCompleted,
  todo,
  isEditing,
  newTodo,
  editTodo,
}) => {
  return (
    <>
      {selectedTodoId !== id && (
        <label
          htmlFor={id}
          className={`list-item__desc ${isCompleted ? 'completed' : ''}`}
        >
          {todo}
        </label>
      )}
      {isEditing && selectedTodoId === id && (
        <input
          type="text"
          value={newTodo}
          onChange={editTodo}
          className="list-item__edit-input"
        />
      )}
    </>
  );
};

export default ToDoContent;
