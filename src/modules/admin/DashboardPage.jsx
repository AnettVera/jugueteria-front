import React from 'react'
import CardPieChart from './../../components/Admin/CardPieChart'
import SellingProducts from '../../components/Admin/SellingProducts'
import './../../assets/Pages/admin_pages/Dashboard.scss'
const DashboardPage = () => {
  return (
    <div className='dashboard'>
      <p>DASHBOARD</p>
     <div className='dashboard__content'>
        <CardPieChart name='Construcción' cantidad={100}/>
        <CardPieChart name='Peluches' cantidad={400}/>
        <CardPieChart name='Electronicos' cantidad={278}/>
        <CardPieChart name='Educativos' cantidad={100}/>
        <CardPieChart name='Exteriores' cantidad={100}/>
        <CardPieChart name='De mesa' cantidad={100}/>
     </div>
     
     <div className='dashboard__products'>
     <SellingProducts
              key={1}
              name={'Hello Kitty'}
              sales={100}
            />
     </div>
     
    </div>
  )
}

export default DashboardPage
