import React from 'react';
import Header from '../../components/Elements/Generales/Header';
import login from '../../assets/images/Forgot password-amico.svg';
import '../../assets/Pages/PaswordRecovery.scss';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useCustomAlert } from '../../components/Elements/Generales/CustomAlert';

const PasswordRecovery = () => {
  const { alert, showAlert } = useCustomAlert(); // Hook para manejar las alertas

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object({
      email: yup.string().email('El email no es válido').required('El email es obligatorio'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:6868/toystore/users/recovery-password', {
          email: values.email,
        });
        if (response.status === 200) {
          showAlert({
            title: "Éxito",
            text: "El correo de recuperación fue enviado exitosamente.",
            icon: "success",
          });
        } else {
          showAlert({
            title: "Error",
            text: "No se pudo enviar el correo de recuperación. Inténtalo nuevamente.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error('Error al enviar correo:', error.response || error.message);
        showAlert({
          title: "Error",
          text: "Ocurrió un error al intentar enviar el correo de recuperación.",
          icon: "error",
        });
      }
    },
  });

  return (
    <div className='containerPadreCorreo'>
      <Header />
      <div className='containerPrincipal'>
        <div className='containerImage'>
          <img src={login} alt='Imagen de inicio de sesión' />
        </div>
        <div className='containerForm'>
          <h2>¡Ya casi lo logramos!</h2>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Escribe tu email'
              required
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
            <button
              className='buttonForm'
              type="submit"
              disabled={formik.errors.email || !formik.values.email}
            >
              Mandar correo
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

export default PasswordRecovery;
