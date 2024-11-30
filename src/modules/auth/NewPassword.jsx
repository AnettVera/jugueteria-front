import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/Elements/Generales/Header'
import login from '../../assets/images/login.svg'
import '../../assets/Pages/NewPassword.scss'
import { useFormik } from 'formik'
import * as yup from 'yup'

const NewPassword = () => {
    const [ searchParams ] = useSearchParams();
    const [loading, setLoading] = useState(false); // Estado para la carga
    const token = searchParams.get('token');

    useEffect(() => {
        console.log('SearchParams:', searchParams.toString());  
        console.log('Token:', token);
        if (!token) {
            alert('No se ha proporcionado un token para actualizar la contraseña');
        }
    }, [searchParams, token]);

    const formik = useFormik({
        initialValues: {
            password: '',
            passwordConfirm: '',
        },
        validationSchema: yup.object({
            password: yup.string().required('La contraseña es obligatoria'),
            passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('La confirmación de la contraseña es obligatoria')
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post('http://localhost:6868/toystore/users/update-password', {
                    token,
                    password: values.password
                });
                if (response.status === 200) {
                    alert('Contraseña actualizada correctamente');
                } else {
                    alert('Error al actualizar contraseña');
                }
            } catch (error) {
                console.error('Error al actualizar contraseña:', error.response || error.message);
                alert('Error al actualizar contraseña');
            } finally {
                setLoading(false);
            }
        }
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
                        <button
                            className='buttonForm'
                            type="submit"
                            disabled={formik.errors.password || formik.errors.passwordConfirm || loading}
                        >
                            {loading ? 'Cargando...' : 'Actualizar contraseña'}
                        </button>

                    </form>
                </div>
            </div>
            <div className='circulo1'></div>
            <div className='circulo2'></div>
        </div>
    )
}

export default NewPassword