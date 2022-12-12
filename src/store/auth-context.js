import React from 'react';
import { useState, useReducer } from 'react';

const AuthContext = React.createContext({
  emailState: { val: '', isEmailValid: false },
  emailInputHandler: action => {},
  checkEmailValidHandler: action => {},
  passwordState: { val: '', isPasswordValid: false },
  passwordInputHandler: action => {},
  checkPasswordValidHandler: action => {},
  setErrorMsg: () => {},
  errorMsg: '',
  isSignInClicked: false,
  onClickToSignIn: () => {},
  resetInput: () => {},
});

const CHANGE_INPUT_EMAIL = 'CHANGE_INPUT_EMAIL';
const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
const RESET_EMAIL_STATE = 'RESET_EMAIL_STATE';
const CHANGE_INPUT_PASSWORD = 'HANGE_INPUT_PASSWORD';
const VALIDATE_PASSWORD = 'VALIDATE_PASSWORD';
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

export const AuthContextProvider = props => {
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emailInputHandler = e => {
    dispatchEmail({ type: CHANGE_INPUT_EMAIL, val: e.target.value });
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

  const resetInput = () => {
    dispatchEmail({ type: RESET_EMAIL_STATE });
    dispatchPassword({ type: RESET_PASSWORD_STATE });
    setIsSignInClicked(prev => !prev);
  };

  const initiaEmaillState = {
    val: '',
    isEmailValid: false,
  };

  const initialPasswordState = {
    val: '',
    isPasswordValid: false,
  };

  const [emailState, dispatchEmail] = useReducer(
    emailReducer,
    initiaEmaillState,
  );

  const [passwordState, dispatchPassword] = useReducer(
    passwordReducer,
    initialPasswordState,
  );

  return (
    <AuthContext.Provider
      value={{
        emailState,
        emailInputHandler,
        checkEmailValidHandler,
        passwordState,
        passwordInputHandler,
        checkPasswordValidHandler,
        setErrorMsg,
        errorMsg,
        isSignInClicked,
        onClickToSignIn,
        resetInput,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
