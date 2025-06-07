import React, { useEffect, useState } from 'react';
import statisticsService from '../../services/statisticsService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import '../../styles/Dashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC', '#33B5E5'];


const formatMonth = (monthString) => {
  if (!monthString) return '';
  const [year, month] = monthString.split('-');
  return `Tháng ${month}/${year}`;
};

const Dashboard = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [orderStatusCount, setOrderStatusCount] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const [monthlyRes, orderStatusRes, topProductsRes] = await Promise.all([
        statisticsService.getMonthlyRevenue(),
        statisticsService.getOrderStatusCount(),
        statisticsService.getTopProducts()
      ]);
     const formattedMonthly = monthlyRes.map(item => ({
        ...item,
        month: formatMonth(item.month)
      }));

      setMonthlyRevenue(formattedMonthly);
      setOrderStatusCount(orderStatusRes);
      setTopProducts(topProductsRes);

    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };


  const revenueFormatter = (value) => {
    const num = Number(value);
    if (isNaN(num)) return value;
    return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  return (
    <div className="dashboard-container">

    
      <div className="card chart-card">
        <h3>Doanh thu theo tháng</h3>
        <LineChart width={1100} height={350} data={monthlyRevenue} margin={{ left: 80}} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={revenueFormatter} />
          <Tooltip formatter={(value) => revenueFormatter(value)} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} />
        </LineChart>

        <div style={{ marginTop: 20 }}>
          <h4>Kiểm tra doanh thu</h4>
          {monthlyRevenue.length === 0 && <p>Không có dữ liệu doanh thu.</p>}
          {monthlyRevenue.map((item, idx) => (
            <p key={idx}>{item.month}: {revenueFormatter(item.revenue)}</p>
          ))}
        </div>
      </div>

      <div className="card chart-card">
        <h3>Trạng thái đơn hàng</h3>
        <PieChart width={1000} height={400}>
          <Pie
            data={orderStatusCount}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ payload, percent }) => `${payload.status} ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
            nameKey="status"
          >
            {orderStatusCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>


      <div className="card chart-card">
        <h3>Top sản phẩm bán chạy</h3>
        <BarChart width={1000} height={350} data={topProducts} >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantitySold" fill="#82ca9d" />
        </BarChart>
      </div>

    </div>
  );
};

export default Dashboard;
