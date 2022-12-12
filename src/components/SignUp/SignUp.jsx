import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUser } from '../../api';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const accountExisted = '이미 계정이 있으신가요?';
  const accountNotExisted = '계정이 없으신가요?';
  const login = '로그인';
  const signUp = '회원가입';

  const onEmailChange = e => {
    setEmail(e.target.value);
    if (email.trim().length === 0) {
      setErrorMsg('');
    }
  };

  const onPasswordChange = e => setPassword(e.target.value);

  const onClickToSignIn = () => {
    setEmail('');
    setPassword('');
    setIsSignInClicked(prev => !prev);
    setIsEmailValid(false);
    setIsPasswordValid(false);
  };

  const signUpUser = async () => {
    const response = await signUpNewUser(email, password);
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
    const response = await getUser(email, password);
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
      return false;
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) return;
    if (isSignInClicked) {
      signInUser();
    } else {
      signUpUser();
    }
  };

  const checkEmailValidity = () => {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    if (regEmail) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const checkPasswordValidity = () => {
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
        {errorMsg !== '' ? <p className="invalid">{errorMsg}</p> : null}
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
