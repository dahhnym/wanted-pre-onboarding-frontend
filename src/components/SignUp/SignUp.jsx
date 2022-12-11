import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUser } from '../../api';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassed, setIsPassed] = useState(false);
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  const accountExisted = '이미 계정이 있으신가요?';
  const accountNotExisted = '계정이 없으신가요?';
  const login = '로그인';
  const signUp = '회원가입';

  const onEmailChange = e => setEmail(e.target.value);

  const onPasswordChange = e => setPassword(e.target.value);

  const onClickToSignIn = () => {
    setEmail('');
    setPassword('');
    setIsSignInClicked(prev => !prev);
    setIsPassed(false);
  };

  const signUpUser = async () => {
    const accessToken = await signUpNewUser(email, password);
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      return true;
    } else {
      return false;
    }
  };

  const signInUser = async () => {
    const accessToken = await getUser(email, password);
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) return;
    // checkValidation();
    if (isSignInClicked) {
      const isSuccess = await signInUser();
      if (isSuccess) {
        navigate('/todo');
      } else {
        alert('Login Fail');
        return;
      }
    } else {
      const isSuccess = await signUpUser();
      if (isSuccess) {
        navigate('/todo');
      } else {
        alert('Signup Fail');
        return;
      }
    }
  };

  // const checkValidation = () => {
  //   const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  //   const regPassword = /^[\w\d]{8,}$/.test(password);

  //   if (regEmail && regPassword) {
  //     setIsPassed(true);
  //   } else {
  //     setIsPassed(false);
  //   }
  // };

  const checkEmailValidity = () => {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    if (regEmail) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const checkPasswordValidity = () => {
    console.log('checking pw');
    const regPassword = /^[\w\d]{8,}$/.test(password);
    if (regPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={onSubmit}>
        <label className="form__label">이메일</label>
        <input
          className={`form__input ${isEmailValid ? 'passed' : ''}`}
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onEmailChange}
          onBlur={checkEmailValidity}
        />
        <label className="form__label">비밀번호</label>
        <input
          className={`form__input ${isPasswordValid ? 'passed' : ''}`}
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onPasswordChange}
          onKeyUp={checkPasswordValidity}
        />
        <button
          className={`btn-submit ${
            isEmailValid && isPasswordValid && 'activate'
          }`}
          type="submit"
        >
          {isSignInClicked ? login : signUp}
        </button>
        <p className="desc">
          {!isSignInClicked ? accountExisted : accountNotExisted}
          <button
            type="button"
            className="btn-switch"
            onClick={onClickToSignIn}
          >
            <span>{isSignInClicked ? signUp : login}</span>
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
