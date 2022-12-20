import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUser } from '../../api';
import EmailInput from './components/EmailInput';
import FormButton from './components/FormButton';
import PasswordInput from './components/PasswordInput';
import './Auth.scss';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Auth = () => {
  const ctx = useContext(AuthContext);

  const navigate = useNavigate();

  const signUpUser = async () => {
    const response = await signUpNewUser(
      ctx.emailState.val,
      ctx.passwordState.val,
    );
    const { isSuccess, data } = response;
    if (isSuccess) {
      alert('회원가입 성공. 환영합니다!');
      localStorage.setItem('access_token', data['access_token']);
      navigate('/todo');
    } else {
      ctx.setErrorMsg(data.message);
      return;
    }
    ctx.resetInput();
  };

  const signInUser = async () => {
    const response = await getUser(ctx.emailState.val, ctx.passwordState.val);
    const { isSuccess, data } = response;

    if (isSuccess) {
      alert('로그인 성공. 환영합니다!');
      localStorage.setItem('access_token', data['access_token']);
      navigate('/todo');
      ctx.resetInput();
      return true;
    } else {
      // status code 401 : Unauthorized
      if (data.statusCode === 401) {
        ctx.setErrorMsg('입력하신 정보가 일치하지 않습니다.');
        return;
      }
      if (data.statusCode === 404) {
        ctx.setErrorMsg('입력하신 정보가 존재하지 않습니다.');
        return;
      }
      return false;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (
      ctx.emailState.val.trim().length === 0 ||
      ctx.passwordState.val.trim().length === 0
    ) {
      return;
    }
    if (ctx.isSignInClicked) {
      await signInUser();
    } else {
      await signUpUser();
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={onSubmit}>
        <EmailInput />
        <PasswordInput />
        {ctx.errorMsg !== '' ? <p className="invalid">{ctx.errorMsg}</p> : null}
        <FormButton />
      </form>
    </div>
  );
};

export default Auth;
