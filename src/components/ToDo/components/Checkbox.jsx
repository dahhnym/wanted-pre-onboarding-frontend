import Checked from './../../../assets/checked.svg';
import NotChecked from './../../../assets/not-checked.svg';

const Checkbox = ({ todoData, handleUpdateTodo }) => {
  const { id, isCompleted, todo } = todoData;
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={isCompleted}
        onChange={() => handleUpdateTodo(id, todo, !isCompleted)}
        style={{ display: 'none' }}
      />
      <img
        src={isCompleted ? Checked : NotChecked}
        alt={isCompleted ? '완료' : '미완료'}
        style={{ width: '25px' }}
        onClick={() => handleUpdateTodo(id, todo, !isCompleted)}
      />
    </>
  );
};

export default Checkbox;
