import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Elements/Generales/Header';
import login from '../../assets/images/login.svg';
import '../../assets/Pages/NewPassword.scss';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';

const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { alert, showAlert } = useCustomAlert();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      showAlert({
        title: "Error",
        text: "No se ha proporcionado un token para actualizar la contraseña.",
        icon: "error",
      }).then(() => {
        navigate('/');
      });
    }
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required('La contraseña es obligatoria')
        .test('no-whitespace', 'La contraseña no puede contener espacios', (value) => value && value.trim() !== ''),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden')
        .required('La confirmación de la contraseña es obligatoria')
        .test('no-whitespace', 'La contraseña no puede contener espacios', (value) => value && value.trim() !== ''),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:6868/toystore/users/update-password', {
          token,
          password: values.password,
        });
        if (response.status === 200) {
          showAlert({
            title: "Éxito",
            text: "La contraseña se ha actualizado correctamente.",
            icon: "success",
          }).then(() => {
            navigate('/login');
          });
        } else {
          showAlert({
            title: "Error",
            text: "No se pudo actualizar la contraseña. Inténtalo nuevamente.",
            icon: "error",
          }).then(() => {
            navigate('/');
          });
        }
      } catch (error) {
        console.error('Error al actualizar contraseña:', error.response || error.message);
        showAlert({
          title: "Error",
          text: "Ocurrió un error al intentar actualizar la contraseña.",
          icon: "error",
        }).then(() => {
          navigate('/');
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className='containerPadrePassword'>
      <Header />
      <div className='containerPrincipal'>
        <div className='containerImage'>
          <img src={login} alt='Imagen de inicio de sesión' />
        </div>
        <div className='containerForm'>
          <h2>Escribe tu nueva contraseña</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="password">Nueva contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='***********'
              required
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
            <label htmlFor="passwordConfirm">Confirma tu nueva contraseña</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder='***********'
              required
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
              <span>{formik.errors.passwordConfirm}</span>
            ) : null}
            {formik.errors.passwordConfirm && <div>{formik.errors.passwordConfirm}</div>}
            <button
              className='buttonForm'
              type="submit"
              disabled={formik.errors.password || formik.errors.passwordConfirm || isLoading}>
              {isLoading ? <BeatLoader size={15} color={"#EF1A23"} /> : 'Actualizar contraseña'}
            </button>
          </form>
        </div>
      </div>
      <div className='circulo1'></div>
      <div className='circulo2'></div>
      {alert}
    </div>
  );
};

export default NewPassword;
