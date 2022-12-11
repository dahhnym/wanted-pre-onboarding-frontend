import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUser } from '../../api';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassed, setIsPassed] = useState(false);
  const [isSignInClicked, setIsSignInClicked] = useState(false);

  const navigate = useNavigate();

  const onEmailChange = e => setEmail(e.target.value);

  const onPasswordChange = e => setPassword(e.target.value);

  const onClickToSignIn = () => {
    setEmail('');
    setPassword('');
    setIsSignInClicked(prev => !prev);
  };

  const signInUser = async () => {
    const accessToken = await getUser(email, password);
    console.log('accessToken', accessToken);
    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      return true;
    }
    return false;
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) return;
    checkValidation();
    if (isSignInClicked) {
      const isSuccess = await signInUser();
      if (isSuccess) {
        navigate('/todo');
      } else {
        return;
      }
    } else {
      signUpNewUser(email, password);
      const accessToken = signUpNewUser(email, password);
      if (accessToken) {
        navigate('/todo');
      } else {
        return;
      }
    }
  };

  const checkValidation = () => {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const regPassword = /^[\w\d]{8,}$/.test(password);

    if (regEmail && regPassword) {
      setIsPassed(true);
    } else {
      setIsPassed(false);
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="">이메일</label>
      <input
        type="text"
        placeholder="이메일"
        value={email}
        onChange={onEmailChange}
        onKeyUp={checkValidation}
      />
      <label htmlFor="">비밀번호</label>
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={onPasswordChange}
        onKeyUp={checkValidation}
      />
      {!isSignInClicked && (
        <>
          <input
            className={isPassed ? 'btn-submit active' : 'btn-submit'}
            type="submit"
            value="회원가입"
          />
          <p>
            이미 계정이 있으신가요?
            <button
              type="button"
              className="btn-switch"
              onClick={onClickToSignIn}
            >
              <span>로그인</span>
            </button>
          </p>
        </>
      )}
      {isSignInClicked && (
        <>
          <input
            className={isPassed ? 'btn-submit active' : 'btn-submit'}
            type="submit"
            value="로그인"
          />
          <p>
            계정이 없으신가요?
            <button
              type="button"
              className="btn-switch"
              onClick={onClickToSignIn}
            >
              <span>회원가입</span>
            </button>
          </p>
        </>
      )}
    </form>
  );
};

export default SignUp;
