import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const logoutHandler = async () => {
    const res = await axiosInstance(`${import.meta.env.VITE_API}/auth/logout`);

    if (res.status === 200) {
      setUser(null);
      setAccessToken('');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Link to='/'><img src="https://i.pinimg.com/564x/71/1f/25/711f2584db87a02603227588e033be64.jpg"  alt="Logo"/></Link>
      </div>
      <div className={styles.right}>
        {user?.username ? (
          <>
            <Link>{user.username}</Link>
            <Link onClick={logoutHandler}>Выйти</Link>
          </>
        ) : (
          <>
            <Link to='/signin'>Войти</Link>
            <Link to='/signup'>Регистрация</Link>
          </>
        )}
      </div>
    </div>
  );
}
