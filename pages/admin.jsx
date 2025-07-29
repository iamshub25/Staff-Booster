import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Settings, LogOut, Phone, Mail, MapPin } from 'lucide-react';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchServices();
      fetchContactInfo();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        alert('Invalid password');
      }
    } catch (error) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    const res = await fetch('/api/admin/services');
    const data = await res.json();
    setServices(data);
  };

  const fetchContactInfo = async () => {
    const res = await fetch('/api/admin/contact-info');
    const data = await res.json();
    setContactInfo(data);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const url = `/api/admin/${type}`;
    const method = editingItem ? 'PUT' : 'POST';
    
    if (editingItem) data.id = editingItem.id;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    fetchServices();
    setEditingItem(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE' });
    fetchServices();
  };

  const handleContactUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    await fetch('/api/admin/contact-info', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    fetchContactInfo();
    alert('Contact information updated successfully!');
  };

  const availableIcons = [
    'FaChartLine', 'FaUsers', 'FaLaptopCode', 'FaBullhorn', 'FaFileAlt', 'FaHandshake',
    'FaCog', 'FaRocket', 'FaShieldAlt', 'FaGlobe', 'FaDatabase', 'FaMobile',
    'FaCloud', 'FaSearch', 'FaHeart', 'FaStar', 'FaThumbsUp', 'FaLightbulb'
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Settings className="text-blue-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter password to access admin panel</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'services'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Contact Info
            </button>
          </div>
        </div>

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Manage Services</h2>
              <button
                onClick={() => { setShowForm(true); setEditingItem(null); }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus size={16} /> Add Service
              </button>
            </div>

            {showForm && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">{editingItem ? 'Edit' : 'Add'} Service</h3>
                <form onSubmit={(e) => handleSubmit(e, 'services')}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      name="title"
                      placeholder="Service Title"
                      defaultValue={editingItem?.title}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      name="icon"
                      defaultValue={editingItem?.icon || ''}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select an Icon</option>
                      {availableIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    name="description"
                    placeholder="Service Description"
                    defaultValue={editingItem?.description}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
                    rows="3"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Save size={16} /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => { setEditingItem(null); setShowForm(false); }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                    >
                      <X size={16} /> Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid gap-4">
              {services.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800">{item.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">Icon: {item.icon}</p>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => { setEditingItem(item); setShowForm(true); }}
                        className="text-blue-600 hover:text-blue-800 p-2"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Info Tab */}
        {activeTab === 'contact' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <form onSubmit={handleContactUpdate}>
                <div className="grid gap-6">
                  <div className="flex items-center gap-3">
                    <Phone className="text-blue-600" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        defaultValue={contactInfo.phone}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="text-blue-600" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        name="email"
                        type="email"
                        defaultValue={contactInfo.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="text-blue-600 mt-2" size={20} />
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        name="address"
                        defaultValue={contactInfo.address}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        rows="3"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={16} /> Update Contact Info
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}