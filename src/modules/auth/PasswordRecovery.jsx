import React from 'react'
import Header from '../../components/Elements/Generales/Header';
import login from '../../assets/images/login.svg';
import '../../assets/Pages/PaswordRecovery.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';

const PasswordRecovery = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object({
            email: yup.string().email('El email no es valido').required('El email es obligatorio'),
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    });

    return (
        <div className='containerPadreCorreo'>
            <Header />
            <div className='containerPrincipal'>
                <div className='containerImage'>
                    <img src={login} alt='Imagen de inicio de sesión' />
                </div>
                <div className='containerForm'>
                    <h2>Ya casi lo logramos!</h2>
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
                            {
                            ...formik.errors.email || !formik.values.email
                                ? { disabled: true }
                                : null
                            }
                        >Mandar correo</button>
                    </form>
                </div>
            </div>
            <div className='circulo1'></div>
            <div className='circulo2'></div>
        </div>
    );
}

export default PasswordRecovery