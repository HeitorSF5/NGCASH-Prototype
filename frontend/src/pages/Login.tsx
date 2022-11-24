import { useState } from 'react';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import localUserData from '../classes/localUserData';
// import { setUserData } from '../components/LocalUserData';
import api from '../services/api';
import '../styles/pages/generic.css';

function Login() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('login', { username, password });
      setUsername(response.data);

      const userData: localUserData = {
        username: response.data.username,
        token: response.data.token,
        accountId: response.data.accountId,
        balance: response.data.balance,
      };

      localStorage.user = JSON.stringify(userData);
      // setUserData(userData)

      navigate('/profile');
    } catch (error: any) {
      console.log(error);
      setErrMessage(error.response.data.message)
    };
  };

  return (
    <main>
      <h1>Faça seu Login!</h1>
      <form onSubmit={ handleSubmit } className="formBody">
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={ username }
            onChange={ ({ target }) => setUsername(target.value) }
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          </label>
        <br/>
        <button type="submit">
          Login
        </button>
        <button onClick={() => navigate('/register')}>
          Registrar
        </button>
        <p color='#FF795B' id="errorMessage"> { errMessage } </p>
      </form>
    </main>
  );
};

export default Login;
