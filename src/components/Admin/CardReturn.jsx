import React from 'react'
import '../../assets/Components/admin/CardReturn.scss'

const CardReturn = ({ nameProduct, problema, fechaDeCompra, fechaDeSolicitud }) => {



    return (
        <div class="cardReturn">
            <div class="cardReturn__content-description">
                <div class="cardReturn__image">
                    <img src="https://via.placeholder.com/150" alt="product" />
                </div>
                <div>
                    <p class="cardReturn__title">{nameProduct}</p>
                    <p class="cardReturn__problema"><span>Problema:</span>{problema}</p>
                </div>
            </div>
            <div class="cardReturn__content-date">
                <div>
                    <p class="cardReturn__fechaDeCompra"><span>Fecha de compra:</span>{fechaDeCompra}</p>
                    <p class="cardReturn__fechaDeSolicitud"><span>Fecha de solicitud:</span>{fechaDeSolicitud}</p>
                </div>
                <div class="cardReturn__buttonVer">
                    <button>Ver</button>
                </div>
            </div>
        </div>

    )
}

export default CardReturn