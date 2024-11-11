import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './../../assets/Components/admin/CardPieChart.scss';

const colorMap = {
  'Construcción': '#FFBB28',
  'Peluches': '#82CA9D',
  'Electronicos': '#8884D8',
  'Educativos': '#FF8042',
  'Exteriores': '#00C49F',
  'De mesa': '#FF69B4',
};

const CardPieChart = ({ name, cantidad }) => {
  const data = [
    { name: '500 o más', value: cantidad },
    { name: 'Productos en almacen', value: 200 - cantidad }
  ];

  const COLORS = [colorMap[name] || '#FFBB28', '#E0E0E0'];

  return (
    <div className="card">
      <div className="card__content-description">
        <p className="card__title">{name}</p>
        <p className="card__cantidad">{cantidad}</p>
        <p className="card__text">Productos en almacen</p>
      </div>
      <div className="card__chart">
        <ResponsiveContainer >
          <PieChart>
            <Pie
              data={data}
              innerRadius={43}
              outerRadius={55}
              startAngle={90}
              endAngle={450}
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CardPieChart;
