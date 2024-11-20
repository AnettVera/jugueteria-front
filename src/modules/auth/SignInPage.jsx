import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/SignInPage.scss';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Enviando datos:', { email, password });
    try {
      const response = await axios.post('http://localhost:6868/toystore/login', {
        email,
        password,
      });
      const { token, userId } = response.data;
      localStorage.setItem('jwt_token', token);
      localStorage.setItem('user_id', userId);
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err.response || err.message);
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className='containerPadre'>
      <Header />
      <div className='containerPrincipal'>
        <div className='containerImage'>
          Aqui va una imagen xd
        </div>
        <div className='containerForm'>
          <h2>!Bienvenido!</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Escribe tu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='***********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="error">{error}</p>}
            <button className='buttonForm' type="submit">Ingresar</button>
          </form>
        </div>
      </div>
      <div className='circulo1'></div>
      <div className='circulo2'></div>
    </div>
  );
}

export default SignInPage