import { useContext } from 'react';
import AuthContext from '../../../store/auth-context';

const FormButton = () => {
  const ctx = useContext(AuthContext);

  const accountExisted = '이미 계정이 있으신가요?';
  const accountNotExisted = '계정이 없으신가요?';
  const login = '로그인';
  const signUp = '회원가입';

  return (
    <>
      <button
        className={`btn-submit ${
          ctx.emailState.isEmailValid &&
          ctx.passwordState.isPasswordValid &&
          'activate'
        }`}
        type="submit"
      >
        {ctx.isSignInClicked ? login : signUp}
      </button>
      <p className="desc">
        {!ctx.isSignInClicked ? accountExisted : accountNotExisted}
        <button
          type="button"
          className="btn-switch"
          onClick={ctx.onClickToSignIn}
        >
          <span>{ctx.isSignInClicked ? signUp : login}</span>
        </button>
      </p>
    </>
  );
};

export default FormButton;
