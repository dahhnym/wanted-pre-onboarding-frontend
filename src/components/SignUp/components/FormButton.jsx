const FormButton = ({
  isEmailValid,
  isPasswordValid,
  isSignInClicked,
  onClickToSignIn,
}) => {
  const accountExisted = '이미 계정이 있으신가요?';
  const accountNotExisted = '계정이 없으신가요?';
  const login = '로그인';
  const signUp = '회원가입';

  return (
    <>
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
        <button type="button" className="btn-switch" onClick={onClickToSignIn}>
          <span>{isSignInClicked ? signUp : login}</span>
        </button>
      </p>
    </>
  );
};

export default FormButton;
