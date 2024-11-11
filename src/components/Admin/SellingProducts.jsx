import React from 'react'
import './../../assets/Components/admin/SellingsProducts.scss'

const SellingProducts = ({name,sales}) => {
  const maxSales = 200;
  const percentage = Math.min((sales / maxSales) * 100, 100); 

  return (
    <div className="top-selling-product">
      <h3>Productos más vendidos</h3>
      <div className="top-selling-product__info">
        <span className="top-selling-product__name">{name}</span>
        <span className="top-selling-product__sales">{sales} articulos vendidos</span>
      </div>
      <div className="top-selling-product__bar">
        <div
          className="top-selling-product__fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default SellingProducts