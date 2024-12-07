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
        console.log("Devoluciones obtenidas:", response.data); 
        setReturnedProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las devoluciones:', error);
        setError('Hubo un problema al cargar las devoluciones.');
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
      return <div>{error}</div>;
    }

    const filteredReturns = returnedProducts.filter(
      product => product.status && product.status.trim().toLowerCase() === 'pendiente'
    );

    if (filteredReturns.length === 0) {
      return <div style={{fontFamily:'var(--font-family-afacad)', color:'var(--lg-text-color)'}}>No hay solicitudes de devolución pendientes</div>;
    }

    // Renderizar las devoluciones filtradas
    return filteredReturns.map((product) => (
      <CardReturn
        key={product.id_return}
        id={product.id_return}
        nameProduct={product.product_name}
        problema={product.reason}
        descripcion={product.description}
        fechaDeCompra={product.order_id}
        fechaDeSolicitud={product.return_date}
        imageUrl={product.evidence_url}
        customerName={"Marbein Cruz"} // Actualízalo si es necesario
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
