import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

const PasswordInput = () => {
  const ctx = useContext(AuthContext);

  return (
    <>
      <label className="form__label">비밀번호</label>
      <input
        className={`form__input ${
          ctx.passwordState.isPasswordValid ? 'passed' : ''
        }`}
        type="password"
        placeholder="비밀번호"
        value={ctx.passwordState.val}
        onChange={ctx.passwordInputHandler}
        onKeyUp={ctx.checkPasswordValidHandler}
      />
    </>
  );
};

export default PasswordInput;
