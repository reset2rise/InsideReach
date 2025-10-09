import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import SiteContentEditor from './SiteContentEditor';
import PageManager from './PageManager';
import ProductManager from './ProductManager';
import ServiceManager from './ServiceManager';
import OrderManager from './OrderManager';
import DashboardOverview from './DashboardOverview';

interface AdminDashboardProps {
  onBackToWebsite?: () => void;
}

export default function AdminDashboard({ onBackToWebsite }: AdminDashboardProps) {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onBackToWebsite={onBackToWebsite}
    >
      {activeTab === 'dashboard' && <DashboardOverview />}
      {activeTab === 'content' && <SiteContentEditor />}
      {activeTab === 'pages' && <PageManager />}
      {activeTab === 'products' && <ProductManager />}
      {activeTab === 'services' && <ServiceManager />}
      {activeTab === 'orders' && <OrderManager />}
    </AdminLayout>
  );
}
