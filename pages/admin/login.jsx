import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Login.module.css';
import { loginUser } from '../../services/authService';

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    try {
      await loginUser({ ...userData });
      router.push('/admin');
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          autoFocus
          type='text'
          placeholder='Username'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign in
        </button>
        {error && <span className={styles.error}>Wrong credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
