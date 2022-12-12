const EmailInput = ({
  isEmailValid,
  onEmailChange,
  emailValue,
  onEmailBlur,
}) => {
  return (
    <>
      <label className="form__label">이메일</label>
      <input
        className={`form__input ${isEmailValid ? 'passed' : ''}`}
        type="text"
        placeholder="이메일"
        value={emailValue}
        onChange={onEmailChange}
        onBlur={onEmailBlur}
      />
    </>
  );
};

export default EmailInput;
