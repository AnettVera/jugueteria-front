import React, { useState, useEffect } from 'react';
import './../../assets/Pages/user/PurchaseDetails.scss';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { useCart } from '../../config/context/useCart';
import Header from '../../components/Elements/Generales/Header';

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchData = async () => {

      if (!sessionId) {
        setError('No session ID found in URL.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:6868/toystore/success?session_id=${sessionId}`);
        console.log(response.data);
        clearCart();
      } catch (error) {
        console.error("Error al obtener los detalles de la compra:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sessionId]);

  if (loading) return <div className='loading'><BeatLoader color='#EF1A23' loading={loading} size={15} /></div>;
  if (error) return <div>Error: {error}</div>;

  const handleReturnLandig = () => {
    navigate('/');
  }

  return (
    <>
    <Header/>
      <div className='success'>
        <h1>¡Gracias por tu compra!</h1>
        <h2>Te hemos enviado un correo confirmando tu compra</h2>
        <h3>¡Vuelve pronto!</h3>
        {/*Botón de regreso a la landing */}
        <button onClick={handleReturnLandig} className='button'>
          OK
        </button>
      </div>
    </>
  );
};

export default Success;
