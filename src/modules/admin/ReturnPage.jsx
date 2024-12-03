import React, { useEffect, useState } from 'react';
import CardReturn from '../../components/Admin/CardReturn';
import '../../assets/Pages/admin_pages/ReturnPage.scss';
import axios from 'axios';

const ReturnPage = () => {
  const [returnedProducts, setReturnedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get('http://localhost:6868/toystore/returns');
        setReturnedProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las devoluciones:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const renderReturns = () => {
    if (loading) {
      return <div>Cargando...</div>;
    }

    if (error) {
      return <div>Error al cargar las devoluciones</div>;
    }

    if (returnedProducts.length === 0) {
      return <div>No hay solicitudes de devolución</div>;
    }

    return returnedProducts.map((product) => (
      <CardReturn
        key={product.return_id}
        id={product.return_id}
        nameProduct={product.product_id} 
        problema={product.reason}
        fechaDeCompra={product.order_id} 
        fechaDeSolicitud={product.createdAt}
        imageUrl={product.evidence_url}
        customerName={"Marbein Cruz"} 
      />
    ));
  };

  return (
    <div className='returnPage'>
      <p>DEVOLUCIONES</p>
      <div className='returnPage__content'>
        {renderReturns()}
      </div>
    </div>
  );
};

export default ReturnPage;
