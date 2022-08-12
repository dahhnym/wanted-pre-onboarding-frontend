import { useState } from 'react';
import './SignUp.scss'

const SignUp = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [emailErrMsg, setEmailErrMsg] = useState("")
  const [passwordErrMsg, setPasswordErrMsg] = useState("")
  const [isPassed, setIsPassed] = useState(false);
    
  const onEmailChange = (e) => setEmail(e.target.value);

  const onPasswordChange = (e) => setPassword(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // checkValidation();
  }

  const checkValidation = () => {
    const regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    console.log('regEmail', regEmail)

    const regPassword = /^[\w\d]{8,}$/.test(password)
    console.log('regPassword', regPassword)

    if (regEmail && regPassword) {
      setIsPassed(true)
    } else {
      setIsPassed(false)
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="">이메일</label>
      <input type="text" placeholder='이메일' value={email} onChange={onEmailChange} onKeyUp={checkValidation}/>
      <label htmlFor="">비밀번호</label>
      <input type="password" placeholder='비밀번호' value={password} onChange={onPasswordChange} onKeyUp={checkValidation} />
      <input className={isPassed ? "btn-submit active" : "btn-submit"} type="submit" value="제출"/>
    </form>
  )
}

export default SignUp;

