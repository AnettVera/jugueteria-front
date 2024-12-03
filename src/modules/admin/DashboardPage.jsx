import React, { useEffect, useState } from 'react';
import CardPieChart from './../../components/Admin/CardPieChart';
import SellingProducts from '../../components/Admin/SellingProducts';
import './../../assets/Pages/admin_pages/Dashboard.scss';
import axios from 'axios';

const DashboardPage = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:6868/toystore/products/totalStock');
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dashboard'>
      <p>DASHBOARD</p>
      <div className='dashboard__content'>
        {stockData.map((category) => (
          <CardPieChart key={category.category_id} name={category.category_name} cantidad={category.total_stock} />
        ))}
      </div>
     
      <div className='dashboard__products'>
        <SellingProducts
          key={1}
          name={'Hello Kitty'}
          sales={100}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
