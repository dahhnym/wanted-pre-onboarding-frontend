import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUser } from '../../api';
import EmailInput from './components/EmailInput';
import FormButton from './components/FormButton';
import PasswordInput from './components/PasswordInput';
import './SignUp.scss';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const EmailInputHandler = e => {
    setEmail(e.target.value);
    setErrorMsg('');
  };

  const PasswordInputHandler = e => {
    setPassword(e.target.value);
    setErrorMsg('');
  };

  const onClickToSignIn = () => {
    setEmail('');
    setPassword('');
    setIsSignInClicked(prev => !prev);
    setIsEmailValid(false);
    setIsPasswordValid(false);
    setErrorMsg('');
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
      if (data.statusCode === 404) {
        setErrorMsg('입력하신 정보가 존재하지 않습니다.');
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

  return (
    <div className="signin-container">
      <form className="signin-form" onSubmit={onSubmit}>
        <EmailInput
          isEmailValid={isEmailValid}
          setIsEmailValid={setIsEmailValid}
          onEmailChange={EmailInputHandler}
          emailValue={email}
        />
        <PasswordInput
          isPasswordValid={isPasswordValid}
          setIsPasswordValid={setIsPasswordValid}
          onPasswordChange={PasswordInputHandler}
          passwordValue={password}
        />
        {errorMsg !== '' ? <p className="invalid">{errorMsg}</p> : null}
        <FormButton
          isEmailValid={isEmailValid}
          isPasswordValid={isPasswordValid}
          onClickToSignIn={onClickToSignIn}
          isSignInClicked={isSignInClicked}
        />
      </form>
    </div>
  );
};

export default SignUp;
