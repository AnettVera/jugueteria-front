import React, { useState } from 'react'
import Header from '../../components/Elements/Generales/Header'
import '../../assets/Pages/RegisterPage.scss'
function SignInPage() {
    return (
        <div className='containerPadreR'>
            <Header />
            <div className='containerPrincipalR'>
                <div className='containerFormR'>
                    <h2>!Bienvenido!</h2>
                    <form className='FormR' action="">
                        <label className='LabelR' htmlFor="text">Nombre de Usuario</label>
                        <input className='inputR' type="text" id="text" name="username" placeholder='Escribe tu nombre de usuario' />
                        <label className='LabelR' htmlFor="email">Email</label>
                        <input className='inputR' type="email" id='email' name='email' placeholder='example@gmail.com' />
                        <label className='LabelR' htmlFor="password">Contraseña</label>
                        <input className='inputR' type="password" id="password" name="password" placeholder='***********' />
                        <label className='LabelR' htmlFor="password">Repetir contraseña</label>
                        <input className='inputR' type="password" id="password" name="password" placeholder='***********' />
                        <button className='buttonFormR' type="submit">Ingresar</button>
                    </form>
                </div>
                <div className='containerImageR'>
                    <div className='containerImageText'>
                        <h1>!Encuentra un mundo lleno de diversión!</h1>
                    </div>
                    <div className='image'>Aqui va una imagen xd</div>
                </div>
            </div>
            <div className='circulo1'></div>
            <div className='circulo2'></div>
        </div>

    )
}

export default SignInPage