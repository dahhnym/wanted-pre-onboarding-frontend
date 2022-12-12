const PasswordInput = ({
  isPasswordValid,
  onPasswordChange,
  checkPasswordValid,
  passwordValue,
}) => {
  return (
    <>
      <label className="form__label">비밀번호</label>
      <input
        className={`form__input ${isPasswordValid ? 'passed' : ''}`}
        type="password"
        placeholder="비밀번호"
        value={passwordValue}
        onChange={onPasswordChange}
        onKeyUp={checkPasswordValid}
      />
    </>
  );
};

export default PasswordInput;
