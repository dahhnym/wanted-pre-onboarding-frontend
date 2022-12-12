const EmailInput = ({
  isEmailValid,
  setIsEmailValid,
  onEmailChange,
  emailValue,
}) => {
  const checkEmailValidity = () => {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailValue);
    setIsEmailValid(regEmail);
  };

  return (
    <>
      <label className="form__label">이메일</label>
      <input
        className={`form__input ${isEmailValid ? 'passed' : ''}`}
        type="text"
        placeholder="이메일"
        value={emailValue}
        onChange={onEmailChange}
        onBlur={checkEmailValidity}
      />
    </>
  );
};

export default EmailInput;
