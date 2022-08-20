import { ChangeEvent, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth, useInput } from 'hooks';
import styles from './login.module.css';

export function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const inputID = useInput('');
  const inputPW = useInput('');
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  if (user) {
    return <Navigate to="protected/todos" replace />;
  }

  const onClickLogin = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputID.value.length > 8 && inputPW.value.length > 8) {
      login({ email: inputID.value, password: inputPW.value });
    }
  };
  const validation = () => {
    const emailReg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return (
      inputID.value.length >= 10 &&
      emailReg.test(inputID.value) &&
      inputPW.value.length >= 8
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <header>
          <h1>Login</h1>
        </header>
        <form onSubmit={onClickLogin}>
          <input ref={emailRef} type="email" placeholder="ID" {...inputID} />
          <input type="password" placeholder="PW" {...inputPW} />
          <div className={styles.emptyBox} />
          <button type="submit" disabled={!validation()}>
            login
          </button>
        </form>
        <button onClick={() => navigate('/signup')}>signup</button>
      </div>
    </div>
  );
}
