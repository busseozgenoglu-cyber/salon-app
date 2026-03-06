import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Appointments from './components/Appointments';
import Customers from './components/Customers';
import Settings from './components/Settings';
import InstagramCampaign from './components/InstagramCampaign';
import './App.css';

const PAGES = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'appointments', label: 'Randevular', icon: '📅' },
  { id: 'customers', label: 'Müşteriler', icon: '👥' },
  { id: 'settings', label: 'Ayarlar', icon: '⚙️' },
  { id: 'instagram', label: 'Instagram Kampanya', icon: '📸' },
];

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'appointments':
        return <Appointments />;
      case 'customers':
        return <Customers />;
      case 'settings':
        return <Settings />;
      case 'instagram':
        return <InstagramCampaign />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>💇 Salon</h1>
        </div>
        <nav className="sidebar-nav">
          {PAGES.map((page) => (
            <button
              key={page.id}
              className={`nav-item ${activePage === page.id ? 'active' : ''}`}
              onClick={() => setActivePage(page.id)}
            >
              <span className="nav-icon">{page.icon}</span>
              <span>{page.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

export default App;
