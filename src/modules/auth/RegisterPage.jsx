import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import Header from '../../components/Elements/Generales/Header'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import '../../assets/Pages/RegisterPage.scss'
import Register from '../../assets/images/Register.svg'
import { AuthContext } from '../../config/context/auth-context'

const RegisterPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            tel: '',
            password: '',
            passwordConfirm: ''
        },
        validationSchema: yup.object({
            name: yup.string().required('El nombre es obligatorio').test('no-whitespace', 'El nombre no puede contener espacios', (value) => value && value.trim() !== ''),
            lastname: yup.string().required('El apellido es obligatorio').test('no-whitespace', 'El apellido no puede contener espacios', (value) => value && value.trim() !== ''),
            email: yup.string().email('El email no es valido').required('El email es obligatorio').test('no-whitespace', 'El correo no puede contener espacios', (value) => value && value.trim() !== ''),
            tel: yup.string()
                .matches(/^[0-9]{10}$/, 'El telefono debe tener exactamente 10 números')
                .required('El telefono es obligatorio'),
            password: yup.string().required('La contraseña es obligatoria').test('no-whitespace', 'La contraseña no puede contener espacios', (value) => value && value.trim() !== ''),
            passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es obligatoria').test('no-whitespace', 'La contraseña no puede contener espacios', (value) => value && value.trim() !== ''),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:6868/toystore/register', {
                    name: values.name,
                    last_name: values.lastname,
                    email: values.email,
                    phone_number: values.tel,
                    password: values.password
                });
                const { token, userId, role } = response.data;
                localStorage.setItem('jwt_token', token);
                localStorage.setItem('user_id', userId);
                localStorage.setItem('role', 'user');
                dispatch({ type: 'SIGNIN', payload: { roles: [{ type: role }] } });
                navigate('/', { replace: true });
                window.location.reload();

                           
            } catch (error) {
                if (error.response) {
                    console.error('Error al crear el usuario:', error.response.data);
                } else {
                    console.error('Error al crear el usuario:', error.message);
                }
            }
        }
    });

    useEffect(() => {
        formik.validateForm();
    }, [formik.values]);

    return (
        <div className='containerPadreR'>
            <Header />
            <div className='containerPrincipalR'>
                <div className='containerFormR'>
                    <h2>!Bienvenido!</h2>
                    <form className='FormR' onSubmit={formik.handleSubmit}>
                        <label className='LabelR' htmlFor="name">Nombre(s)</label>
                        <input className='inputR'
                            type="text"
                            id="name"
                            name="name"
                            placeholder='Escribe tu nombre'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <span>{formik.errors.name}</span>
                        ) : null}

                        <label className='LabelR' htmlFor="lastname">Apellido(s)</label>
                        <input className='inputR'
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder='Escribe tu apellido'
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastname && formik.errors.lastname ? (
                            <span>{formik.errors.lastname}</span>
                        ) : null}

                        <label className='LabelR' htmlFor="email">Email</label>
                        <input className='inputR'
                            type="email"
                            id='email'
                            name='email'
                            placeholder='example@domain.com'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span>{formik.errors.email}</span>
                        ) : null}

                        <label className='LabelR' htmlFor="tel">Telefono</label>
                        <input className='inputR'
                            type="number"
                            id='tel'
                            name='tel'
                            placeholder='000-000-00-00'
                            value={formik.values.tel}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.tel && formik.errors.tel ? (
                            <span>{formik.errors.tel}</span>
                        ) : null}

                        <label className='LabelR' htmlFor="password">Contraseña</label>
                        <input className='inputR'
                            type="password"
                            id="password"
                            name="password"
                            placeholder='***********'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <span>{formik.errors.password}</span>
                        ) : null}

                        <label className='LabelR' htmlFor="passwordConfirm">Repetir contraseña</label>
                        <input className='inputR'
                            type="password"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder='***********'
                            value={formik.values.passwordConfirm}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                            <span>{formik.errors.passwordConfirm}</span>
                        ) : null}

                        <button
                            className='buttonFormR'
                            type="submit"
                            {
                            ...formik.errors.username || formik.errors.email || formik.errors.tel || formik.errors.password || formik.errors.passwordConfirm ? { disabled: true } : null
                            }

                        >Registrarse</button>
                    </form>
                </div>
                <div className='containerImageR'>
                    <div className='containerImageText'>
                        <h1>!Encuentra un mundo lleno de diversión!</h1>
                    </div>
                    <div className='image'>
                        <img src={Register} alt="imagenRegister" />
                    </div>
                </div>
            </div>
            <div className='circulo1'></div>
            <div className='circulo2'></div>
        </div>

    )
}

export default RegisterPage

