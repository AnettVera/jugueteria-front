import React, { useEffect, useState } from 'react';
import CardReturn from '../../components/Admin/CardReturn';
import '../../assets/Pages/admin_pages/ReturnPage.scss';

const ReturnPage = () => {
  const [returnedProducts, setReturnedProducts] = useState([]);

  useEffect(() => {
    const returnedProductsData = {
      "returned_products": [
        {
          "id": 1,
          "name": "Robot de Cocina",
          "problema": "No funciona",
          "fechaDeCompra": "2021-12-12",
          "fechaDeSolicitud": "2021-12-12",
          "image_url": "https://example.com/imagenes/robot_cocina.jpg"
        },
        {
          "id": 2,
          "name": "Licuadora",
          "problema": "Ruidosa",
          "fechaDeCompra": "2021-11-15",
          "fechaDeSolicitud": "2021-11-20",
          "image_url": "https://example.com/imagenes/licuadora.jpg"
        },
        {
          "id": 3,
          "name": "Plancha",
          "problema": "No calienta",
          "fechaDeCompra": "2021-10-05",
          "fechaDeSolicitud": "2021-10-10",
          "image_url": "https://example.com/imagenes/plancha.jpg"
        }
      ]
    };

    setReturnedProducts(returnedProductsData.returned_products);
  }, []);

  return (
    <div className='returnPage'>
      <p>DEVOLUCIONES</p>
      <div className='returnPage__content'>
      {returnedProducts.map((product) => (
  <CardReturn
    key={product.id}
    id={product.id}
    nameProduct={product.name}
    problema={product.problema}
    fechaDeCompra={product.fechaDeCompra}
    fechaDeSolicitud={product.fechaDeSolicitud}
    imageUrl={product.image_url}
    customerName={"Marbein Cruz"} 
  />
))}

      </div>
    </div>
  );
};

export default ReturnPage;
