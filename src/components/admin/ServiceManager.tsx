import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image_url: string;
  is_active: boolean;
  stripe_price_id?: string;
  stripe_product_id?: string;
  created_at: string;
}

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncStripeProducts = async () => {
    setSyncing(true);
    setSyncMessage('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-stripe-products`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setSyncMessage(`Successfully synced ${result.synced.products} products and ${result.synced.services} services from Stripe!`);
        await loadServices();
      } else {
        throw new Error(result.error || 'Failed to sync services');
      }
    } catch (error: any) {
      setSyncMessage(`Error: ${error.message}`);
    } finally {
      setSyncing(false);
    }
  };

  const handleSave = async (service: Partial<Service>) => {
    try {
      if (service.id) {
        const { error } = await supabase
          .from('services')
          .update({
            ...service,
            updated_at: new Date().toISOString(),
          })
          .eq('id', service.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert(service);
        if (error) throw error;
      }

      await loadServices();
      setShowForm(false);
      setEditingService(null);
    } catch (error: any) {
      alert('Error saving service: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      await loadServices();
    } catch (error: any) {
      alert('Error deleting service: ' + error.message);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const { error } = await supabase
        .from('services')
        .update({ is_active: !service.is_active })
        .eq('id', service.id);

      if (error) throw error;
      await loadServices();
    } catch (error: any) {
      alert('Error updating service: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (showForm) {
    return (
      <ServiceForm
        service={editingService}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditingService(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Manage your service offerings</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={syncStripeProducts}
            disabled={syncing}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync from Stripe'}
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            <Plus className="w-5 h-5" />
            New Service
          </button>
        </div>
      </div>

      {syncMessage && (
        <div className={`p-4 rounded-lg ${syncMessage.includes('Error') ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
          {syncMessage}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No services yet. Create your first service!
          </div>
        ) : (
          services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {service.image_url && (
                <img
                  src={service.image_url}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      service.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {service.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">
                    ${Number(service.price).toFixed(2)}
                  </span>
                  {service.duration && (
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleActive(service)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm"
                  >
                    {service.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {service.is_active ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => {
                      setEditingService(service);
                      setShowForm(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ServiceForm({
  service,
  onSave,
  onCancel,
}: {
  service: Service | null;
  onSave: (service: Partial<Service>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || 0,
    duration: service?.duration || '',
    image_url: service?.image_url || '',
    is_active: service?.is_active ?? true,
    stripe_price_id: service?.stripe_price_id || '',
    stripe_product_id: service?.stripe_product_id || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(service ? { ...formData, id: service.id } : formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {service ? 'Edit Service' : 'New Service'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Marriage Counseling"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="Detailed service description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="150.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="1 hour, 6 weeks, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripe Price ID
            </label>
            <input
              type="text"
              value={formData.stripe_price_id}
              onChange={(e) => setFormData({ ...formData, stripe_price_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="price_xxxxxxxxxxxxx"
            />
            <p className="mt-1 text-xs text-gray-500">Get this from your Stripe Dashboard</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stripe Product ID (Optional)
            </label>
            <input
              type="text"
              value={formData.stripe_product_id}
              onChange={(e) => setFormData({ ...formData, stripe_product_id: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="prod_xxxxxxxxxxxxx"
            />
            <p className="mt-1 text-xs text-gray-500">For reference only</p>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
            Service is active and available for booking
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            Save Service
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
