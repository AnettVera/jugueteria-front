import React from 'react';
import './../../assets/Pages/user/PurchaseHistory.scss';

const PurchaseHistory = () => {
  const purchases = [
    {
      id: '65000500',
      images: [
        "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300",
        "https://via.placeholder.com/300"
      ],
      items: 2,
      message: 'Estimado cliente tu compra ha sido entregada',
      deliveryDate: '07/11/30',
    },
    {
      id: '65000500',
      images: [
    "https://manuals.plus/wp-content/uploads/2024/06/ENERGIZE-LAB-Eilik-Cute-Robot-Pet-product.png?ezimgfmt=rs:368x447/rscb1/ngcb1/notWebP",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300"
  ],
      items: 2,
      message: 'Estimado cliente tu compra ha sido entregada',
      deliveryDate: '07/11/30',
    },
  ];

  return (
    <div className="purchase-history">
      <h2>Historial de compras</h2>
      <div className="purchase-list">
        {purchases.map((purchase, index) => (
          <div className="purchase-card" key={index}>
            <div className="purchase-image">
              <img src={purchase.images[0]}/>
            </div>
            <div className="purchase-details">
              <p className="purchase-id">Compra #{purchase.id}</p>
              <p className="purchase-items">{purchase.items} artículos</p>
              <p className="purchase-message">{purchase.message}</p>
            </div>
            <div className="purchase-delivery">
              <p className="delivery-date">Fecha de entrega:</p>
              <p>{purchase.deliveryDate}</p>
            </div>
            <button className="purchase-button">Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
