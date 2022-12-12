import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

const EmailInput = () => {
  const ctx = useContext(AuthContext);

  return (
    <>
      <label className="form__label">이메일</label>
      <input
        className={`form__input ${ctx.emailState.isEmailValid ? 'passed' : ''}`}
        type="text"
        placeholder="이메일"
        value={ctx.emailState.val}
        onChange={ctx.emailInputHandler}
        onBlur={ctx.checkEmailValidHandler}
      />
    </>
  );
};

export default EmailInput;
