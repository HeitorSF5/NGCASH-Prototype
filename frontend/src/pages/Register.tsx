import { useState, useEffect } from 'react';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/pages/generic.css';

const USERNAME_LENGTH = 3;
const PASSWORD_FAIL = /^(.{0,7}|[^0-9]*|[^A-Z]*|)$/;
// Regex: Logica inversa: Se passar em alguma dessas asserções, então não é valido
// .{0, 7} -- entre 0 à 7 caracteres (< 8)
// [^0-9]* -- não contém números
// [^A-Z]* -- não contém caractére maiusculo


function Register() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errMessage, setErrMessage] = useState();
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!PASSWORD_FAIL.test(password) && username.length >= USERNAME_LENGTH) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [username, password]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await api.post('register', { username, password });
      navigate('/login');
    } catch (error: any) {
      console.log(error);
      setErrMessage(error.response.data);
    }
  };

  return (
    <main>
      <h1>Faça seu cadastro</h1>
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
        <button
          type="submit"
          disabled={ disabled }
          className="pageButton"
        >
          Confirmar
        </button>
        {
          disabled && (
            <span>
              <p>
              Username deve conter no mínimo 3 caractéres!
              </p>
              <p>
              Password deve conter no mínimo 8 caractéres e conter no mínimo 1 número e 1 letra maiúscula!
              </p>
            </span>
          )
        }
        <p id="errorMessage"> {errMessage} </p>
      </form>
      <button onClick={() => navigate('/login')} className="pageButton">
        Voltar
      </button>
    </main>
  );
};

export default Register;

// OBS: Essa verificação de Username e Password pode ser burlada com um "Inspect Element" no próprio browser e removendo a propriedade "disabled" do <button>. No momento isso quebra a página, mas o Back-End também verifica e não deixa passar para a DB.
