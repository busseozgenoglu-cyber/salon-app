import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { getAppointments, getCustomers } from '../api';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({ appointments: 0, customers: 0 });

  useEffect(() => {
    Promise.all([getAppointments(), getCustomers()])
      .then(([resA, resC]) => {
        setStats({
          appointments: resA.data?.length || 0,
          customers: resC.data?.length || 0,
        });
      })
      .catch(() => setStats({ appointments: 0, customers: 0 }));
  }, []);

  const chartData = {
    labels: ['Randevular', 'Müşteriler'],
    datasets: [
      {
        data: [stats.appointments, stats.customers],
        backgroundColor: ['#6366f1', '#8b5cf6'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.appointments}</span>
          <span className="stat-label">Toplam Randevu</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.customers}</span>
          <span className="stat-label">Toplam Müşteri</span>
        </div>
      </div>
      <div className="chart-container">
        <Doughnut data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}
