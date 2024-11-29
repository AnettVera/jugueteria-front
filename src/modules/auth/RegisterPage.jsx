import React, { useState } from 'react'
import Header from '../../components/Elements/Generales/Header'
import * as yup from 'yup'
import { useFormik } from 'formik'
import '../../assets/Pages/RegisterPage.scss'
import Register from '../../assets/images/Register.svg'

const RegisterPage = () => {

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
            name: yup.string().required('El nombre es obligatorio'),
            lastname: yup.string().required('El apellido es obligatorio'),
            email: yup.string().email('El email no es valido').required('El email es obligatorio'),
            tel: yup.string()
                .matches(/^[0-9]{10}$/, 'El telefono debe tener exactamente 10 números')
                .required('El telefono es obligatorio'),
            password: yup.string().required('La contraseña es obligatoria'),
            passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es obligatoria')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:6868/toystore/register', {
                    name: values.name,
                    lastname: values.lastname,
                    email: values.email,
                    phone_number: values.tel,
                    password: values.password
                });
                console.log('Usuario creado:', response.data);
            } catch (error) {
                console.error('Error al crear el usuario:', error.response.data);
            }
        }
    });

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
                            type="tel"
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

