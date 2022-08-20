import axios from 'axios';
import { ChangeEvent, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from 'hooks';

import styles from './signUp.module.css';
import { userProps } from 'types';

export function SignUp() {
  const useInputID = useInput('');
  const useInputPW = useInput('');
  const useInputPWCHK = useInput('');
  const emailRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const onBack = () => {
    navigate('/');
  };

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signup({ email: useInputID.value, password: useInputPW.value });
  };
  const signup = async (data: userProps) => {
    const response = await axios.post(
      'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup',
      data
    );
    console.log(response);
    if (response.status === 404) {
      alert('fail');
      return;
    }
    alert('success');
    navigate('/');
  };

  const validation = () => {
    const emailReg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return (
      useInputID.value.length >= 10 &&
      emailReg.test(useInputID.value) &&
      useInputPW.value.length >= 8 &&
      useInputPWCHK.value === useInputPW.value
    );
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <header>
          <h1>SignUp</h1>
        </header>
        <form onSubmit={onSubmit}>
          <input ref={emailRef} type="email" placeholder="id" {...useInputID} />
          <input type="password" placeholder="pw" {...useInputPW} />
          <input type="password" placeholder="check pw" {...useInputPWCHK} />
          <div className={styles.emptyBox} />
          <button type="submit" disabled={!validation()}>
            Sign up
          </button>
        </form>
        <button onClick={onBack}>login</button>
      </div>
    </div>
  );
}
