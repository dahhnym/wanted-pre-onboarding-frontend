const PasswordInput = ({
  isPasswordValid,
  setIsPasswordValid,
  onPasswordChange,
  passwordValue,
}) => {
  const checkPasswordValidity = () => {
    const regPassword = /^[\w\d]{8,}$/.test(passwordValue);
    setIsPasswordValid(regPassword);
  };

  return (
    <>
      <label className="form__label">비밀번호</label>
      <input
        className={`form__input ${isPasswordValid ? 'passed' : ''}`}
        type="password"
        placeholder="비밀번호"
        value={passwordValue}
        onChange={onPasswordChange}
        onKeyUp={checkPasswordValidity}
      />
    </>
  );
};

export default PasswordInput;
