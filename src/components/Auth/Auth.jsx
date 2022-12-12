import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUser } from '../../api';
import EmailInput from './components/EmailInput';
import FormButton from './components/FormButton';
import PasswordInput from './components/PasswordInput';
import './Auth.scss';
import { useReducer } from 'react';

const CHANGE_INPUT_EMAIL = 'CHANGE_INPUT_EMAIL';
const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
const CHANGE_INPUT_PASSWORD = 'HANGE_INPUT_PASSWORD';
const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD';
const RESET_EMAIL_STATE = 'RESET_EMAIL_STATE';
const RESET_PASSWORD_STATE = 'RESET_EMAIL_STATE';

const emailReducer = (state, action) => {
  if (action.type === CHANGE_INPUT_EMAIL) {
    return { val: action.val, isEmailValid: action.isEmailValid };
  }
  if (action.type === VALIDATE_EMAIL) {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(state.val);
    return { val: state.val, isEmailValid: regEmail };
  }
  if (action.type === RESET_EMAIL_STATE) {
    return { val: '', isEmailValid: false };
  }
};

const passwordReducer = (state, action) => {
  if (action.type === CHANGE_INPUT_PASSWORD) {
    return { val: action.val, isPasswordValid: action.isPasswordValid };
  }
  if (action.type === VALIDATE_PASSWORD) {
    const regPassword = /^[\w\d]{8,}$/.test(state.val);
    return { val: state.val, isPasswordValid: regPassword };
  }
  if (action.type === RESET_PASSWORD_STATE) {
    return { val: '', isEmailValid: false };
  }
};

const Auth = () => {
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    val: '',
    isEmailValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    val: '',
    isPasswordValid: false,
  });

  const navigate = useNavigate();

  const emailInputHandler = e => {
    dispatchEmail({ type: CHANGE_INPUT_EMAIL, val: e.target.value });
    setErrorMsg('');
  };

  const checkEmailValidHandler = () => {
    dispatchEmail({ type: VALIDATE_EMAIL });
  };

  const passwordInputHandler = e => {
    dispatchPassword({ type: CHANGE_INPUT_PASSWORD, val: e.target.value });
    setErrorMsg('');
  };

  const checkPasswordValidHandler = () => {
    dispatchPassword({ type: VALIDATE_PASSWORD });
  };

  const onClickToSignIn = () => {
    setIsSignInClicked(prev => !prev);
    setErrorMsg('');
    dispatchEmail({ type: RESET_EMAIL_STATE });
    dispatchPassword({ type: RESET_PASSWORD_STATE });
  };

  const signUpUser = async () => {
    const response = await signUpNewUser(emailState.val, passwordState.val);
    const { isSuccess, data } = response;
    if (isSuccess) {
      alert('회원가입 성공. 환영합니다!');
      localStorage.setItem('access_token', data['access_token']);
      navigate('/todo');
    } else {
      setErrorMsg(data.message);
      return;
    }
  };

  const signInUser = async () => {
    const response = await getUser(emailState.val, passwordState.val);
    const { isSuccess, data } = response;

    if (isSuccess) {
      alert('로그인 성공. 환영합니다!');
      localStorage.setItem('access_token', data['access_token']);
      navigate('/todo');
      return true;
    } else {
      // status code 401 : Unauthorized
      if (data.statusCode === 401) {
        setErrorMsg('입력하신 정보가 일치하지 않습니다.');
      }
      if (data.statusCode === 404) {
        setErrorMsg('입력하신 정보가 존재하지 않습니다.');
      }
      return false;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (
      emailState.val.trim().length === 0 ||
      passwordState.val.trim().length === 0
    )
      return;
    if (isSignInClicked) {
      signInUser();
    } else {
      signUpUser();
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={onSubmit}>
        <EmailInput
          isEmailValid={emailState.isEmailValid}
          onEmailChange={emailInputHandler}
          onEmailBlur={checkEmailValidHandler}
          emailValue={emailState.val}
        />
        <PasswordInput
          isPasswordValid={passwordState.isPasswordValid}
          onPasswordChange={passwordInputHandler}
          checkPasswordValid={checkPasswordValidHandler}
          passwordValue={passwordState.val}
        />
        {errorMsg !== '' ? <p className="invalid">{errorMsg}</p> : null}
        <FormButton
          isEmailValid={emailState.isEmailValid}
          isPasswordValid={passwordState.isPasswordValid}
          onClickToSignIn={onClickToSignIn}
          isSignInClicked={isSignInClicked}
        />
      </form>
    </div>
  );
};

export default Auth;
