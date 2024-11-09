import React from 'react'

const CardPieChart = ({name,cantidad, }) => {
  return (
    <div className='card'>
        <div className='card__content-description'>
            <p className='card__title'></p>
            <p className='card__cantidad'></p>
            <p className='card__text'>Productos en almacen</p>
        </div>
        <div className='card__chart'>

        </div>
    </div>
  )
}

export default CardPieChart
