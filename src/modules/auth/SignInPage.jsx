import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Elements/Generales/Header';
import '../../assets/Pages/SignInPage.scss';
import login from '../../assets/images/login.svg';
import { useFormik } from 'formik';
import * as yup from 'yup';

function SignInPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('El email no es valido').required('El email es obligatorio'),
      password: yup.string().required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      console.log('Enviando datos:', values);
      try {
        const response = await axios.post('http://localhost:6868/toystore/login', {
          email: values.email,
          password: values.password,
        });
        const { token, userId } = response.data;
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_id', userId);
        navigate('/');
      } catch (err) {
        console.error('Error al iniciar sesión:', err.response || err.message);
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    },
  });

  return (
    <div className='containerPadre'>
      <Header />
      <div className='containerPrincipal'>
        <div className='containerImage'>
          <img src={login} alt='Imagen de inicio de sesión' />
        </div>
        <div className='containerForm'>
          <h2>!Bienvenido!</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Escribe tu email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
            <label className='contraseña' htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='***********'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
            <Link className='buttonNewPass' to="/recovery-password">Olvidaste tu contraseña?</Link>
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

export default SignInPage;