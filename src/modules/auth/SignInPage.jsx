import React, {useState} from 'react'
import Header from '../../components/Elements/Generales/Header'
import '../../assets/Pages/SignInPage.scss'

function SignInPage() {
  return (
    <div className='containerPadre'>
        <Header/>
        <div className='containerPrincipal'>
            <div className='containerImage'>
                Aqui va una imagen xd
            </div>
            <div className='containerForm'>
                <h2>!Bienvenido!</h2>
                <form action="">
                    <label htmlFor="text">Nombre de Usuario</label>
                    <input type="text" id="text" name="username" placeholder='Escribe tu nombre de usuario' />
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" placeholder='***********'/>
                    <button className='buttonForm' type="submit">Ingresar</button>
                </form>
            </div>
        </div>
        <div className='circulo1'></div>
        <div className='circulo2'></div>
    </div>
    
  )
}

export default SignInPage