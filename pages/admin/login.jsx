import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import Meta from '@/components/Meta';
import { parseCookie } from '@/utils/index';
import Meta from '@/components/Meta';
import { loginUser } from '@/services/authService';
import styles from '@/styles/Login.module.css';

const Login = () => {
  const router = useRouter();

  const usernameRef = useRef();
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

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <>
      <Meta title='Admin Login' />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1>Admin Dashboard</h1>
          <input
            type='text'
            placeholder='Username'
            className={styles.input}
            ref={usernameRef}
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
    </>
  );
};

export const getServerSideProps = ({ req }) => {
  const { token } = parseCookie(req);

  if (token || token === process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
