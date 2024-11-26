import React from 'react'
import CardReturn from '../../components/Admin/CardReturn'
import '../../assets/Pages/admin_pages/ReturnPage.scss'
import Header from '../../components/Elements/Generales/Header'

const RetunrPage = () => {
  return (
    <div className='returnPage'>
      <Header />
      <p>DEVOLUCIONES</p>

      <div className='returnPage__content'>
        <CardReturn nameProduct='Robot'
          problema='No funciona'
          fechaDeCompra='12/12/2021'
          fechaDeSolicitud='12/12/2021'
        />
        <CardReturn nameProduct='Robot'
          problema='No funciona'
          fechaDeCompra='12/12/2021'
          fechaDeSolicitud='12/12/2021'
        />
        <CardReturn nameProduct='Robot'
          problema='No funciona'
          fechaDeCompra='12/12/2021'
          fechaDeSolicitud='12/12/2021'
        />
        <CardReturn nameProduct='Robot'
          problema='No funciona'
          fechaDeCompra='12/12/2021'
          fechaDeSolicitud='12/12/2021'
        />
      </div>

    </div>
  )
}

export default RetunrPage