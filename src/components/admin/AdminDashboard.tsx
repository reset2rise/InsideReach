import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import ContentManager from './ContentManager';
import PageManager from './PageManager';
import ProductManager from './ProductManager';
import ServiceManager from './ServiceManager';
import OrderManager from './OrderManager';
import DashboardOverview from './DashboardOverview';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardOverview />}
      {activeTab === 'content' && <ContentManager />}
      {activeTab === 'pages' && <PageManager />}
      {activeTab === 'products' && <ProductManager />}
      {activeTab === 'services' && <ServiceManager />}
      {activeTab === 'orders' && <OrderManager />}
    </AdminLayout>
  );
}
