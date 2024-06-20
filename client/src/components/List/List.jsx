import MainCard from '../Card/MainCard';
import styles from './List.module.css';

export default function List({ data, setEntries, user }) {
  //? axios.get('http://localhost:3100/api/v1/auth/signup', {
  //?   withCredentials: true,
  //?   headers: {
  //?     'Authorization': accessToken
  //?   }
  //? });

  //? fetch('http://localhost:3100/api/v1/auth/signup', {
  //?   method: 'GET',
  //?   credentials: 'include',
  //? });

  return (
    <div className={styles.wrapper}>
      {data.length
        ? data.map((el) => (
            <MainCard
              key={el.id}
              entry={el}
              setEntries={setEntries}
              user={user}
            />
          ))
        : null}
    </div>
  );
}
