import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  Truck, 
  ShieldCheck, 
  X, 
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const { 
    products, 
    addNewProduct, 
    updateExistingProduct, 
    deleteExistingProduct, 
    fetchAllOrders, 
    fetchAllUsers, 
    markOrderDelivered, 
    deleteUserAccount 
  } = useShop();

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'users'
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loadingAdminData, setLoadingAdminData] = useState(false);

  // Add / Edit Product Modal State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState('10');
  const [description, setDescription] = useState('');

  const loadOrdersAndUsers = async () => {
    setLoadingAdminData(true);
    const fetchedOrders = await fetchAllOrders();
    const fetchedUsers = await fetchAllUsers();
    setOrders(fetchedOrders);
    setUsersList(fetchedUsers);
    setLoadingAdminData(false);
  };

  useEffect(() => {
    loadOrdersAndUsers();
  }, []);

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = usersList.length;

  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setName('');
    setPrice('89.99');
    setCategory('Electronics');
    setImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400');
    setCountInStock('15');
    setDescription('High-quality premium product item.');
    setShowProductModal(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProductId(prod._id || prod.id);
    setName(prod.name);
    setPrice(prod.price);
    setCategory(prod.category);
    setImage(prod.image);
    setCountInStock(prod.countInStock);
    setDescription(prod.description || '');
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const productPayload = {
      name,
      price: Number(price),
      category,
      image,
      countInStock: Number(countInStock),
      description
    };

    if (editingProductId) {
      await updateExistingProduct(editingProductId, productPayload);
    } else {
      await addNewProduct(productPayload);
    }
    setShowProductModal(false);
  };

  const handleDeliverClick = async (orderId) => {
    const res = await markOrderDelivered(orderId);
    if (res) {
      loadOrdersAndUsers();
    }
  };

  const handleDeleteUserClick = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user account?')) {
      const res = await deleteUserAccount(userId);
      if (res) {
        loadOrdersAndUsers();
      }
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '32px auto', padding: '0 24px' }}>
      
      {/* Top Banner & Title */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '20px',
            background: 'rgba(2, 132, 199, 0.1)',
            border: '1px solid rgba(2, 132, 199, 0.25)',
            color: '#0284c7',
            fontSize: '12px',
            fontWeight: '700',
            marginBottom: '8px'
          }}>
            <ShieldCheck size={14} /> Store Manager Control Panel
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
            Lumina Luxe <span className="gradient-text">Admin Panel</span>
          </h2>
        </div>

        <button
          onClick={loadOrdersAndUsers}
          className="glass-button-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
        >
          <RefreshCw size={16} /> Refresh Data
        </button>
      </div>

      {/* Analytics Metric Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '36px'
      }}>
        <MetricCard icon={<DollarSign size={24} color="#0284c7" />} label="Total Store Revenue" value={`$${totalRevenue.toFixed(2)}`} subtext="Combined Orders Total" />
        <MetricCard icon={<ShoppingBag size={24} color="#6366f1" />} label="Customer Orders" value={totalOrders} subtext="Placed by Customers" />
        <MetricCard icon={<Package size={24} color="#e11d48" />} label="Active Products" value={totalProducts} subtext="Catalog Items in DB" />
        <MetricCard icon={<Users size={24} color="#10b981" />} label="Registered Users" value={totalUsers} subtext="Store Customers & Admins" />
      </div>

      {/* Navigation Tabs Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '24px',
        borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
        paddingBottom: '12px'
      }}>
        <button
          onClick={() => setActiveTab('products')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: activeTab === 'products' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
            background: activeTab === 'products' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.8)',
            color: activeTab === 'products' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Package size={16} /> Manage Products ({totalProducts})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: activeTab === 'orders' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
            background: activeTab === 'orders' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.8)',
            color: activeTab === 'orders' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ShoppingBag size={16} /> Customer Orders ({totalOrders})
        </button>

        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            borderRadius: '12px',
            border: activeTab === 'users' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(203, 213, 225, 0.8)',
            background: activeTab === 'users' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.8)',
            color: activeTab === 'users' ? '#fff' : 'var(--text-muted)',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Users size={16} /> Manage Users ({totalUsers})
        </button>
      </div>

      {/* --- TAB 1: PRODUCTS MANAGEMENT --- */}
      {activeTab === 'products' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>Catalog Product Inventory</h3>
            <button
              onClick={handleOpenCreateModal}
              className="glass-button"
              style={{ padding: '10px 18px', fontSize: '13px' }}
            >
              <Plus size={16} /> Add New Product
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '12px' }}>Product</th>
                  <th style={{ padding: '12px' }}>Category</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Stock</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => {
                  const pId = prod._id || prod.id;
                  return (
                    <tr key={pId} style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }}>
                      <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={prod.image} alt={prod.name} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{prod.name}</span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--primary)', fontWeight: '600' }}>{prod.category}</td>
                      <td style={{ padding: '12px', fontWeight: '800', color: '#0284c7' }}>${Number(prod.price).toFixed(2)}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{prod.countInStock || 10} in stock</td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="glass-button-secondary"
                          style={{ padding: '6px 12px', marginRight: '8px', fontSize: '12px' }}
                        >
                          <Edit3 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => deleteExistingProduct(pId)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: 'rgba(239, 68, 68, 0.08)',
                            border: '1px solid rgba(239, 68, 68, 0.25)',
                            color: '#dc2626',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TAB 2: ORDERS MANAGEMENT --- */}
      {activeTab === 'orders' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: 'var(--text-main)' }}>Customer Orders List</h3>

          {loadingAdminData ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading orders from MongoDB...</p>
          ) : orders.length === 0 ? (
            <p style={{ color: 'var(--text-dim)' }}>No customer orders placed yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Order ID</th>
                    <th style={{ padding: '12px' }}>Customer</th>
                    <th style={{ padding: '12px' }}>Total Price</th>
                    <th style={{ padding: '12px' }}>Payment Status</th>
                    <th style={{ padding: '12px' }}>Delivery Status</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord._id} style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }}>
                      <td style={{ padding: '12px', fontWeight: '700', fontFamily: 'monospace', color: 'var(--text-main)' }}>
                        #{ord._id.substring(18)}
                      </td>
                      <td style={{ padding: '12px', color: 'var(--text-main)' }}>
                        {ord.user ? ord.user.name : 'Customer'}
                      </td>
                      <td style={{ padding: '12px', fontWeight: '800', color: 'var(--primary)' }}>
                        ${ord.totalPrice.toFixed(2)}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '20px',
                          fontSize: '11px',
                          fontWeight: '700',
                          background: 'rgba(16, 185, 129, 0.12)',
                          color: '#059669',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                          Paid (PayPal)
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {ord.isDelivered ? (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: 'rgba(2, 132, 199, 0.12)',
                            color: '#0284c7',
                            border: '1px solid rgba(2, 132, 199, 0.3)'
                          }}>
                            Delivered
                          </span>
                        ) : (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: 'rgba(245, 158, 11, 0.12)',
                            color: '#d97706',
                            border: '1px solid rgba(245, 158, 11, 0.3)'
                          }}>
                            Processing
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        {!ord.isDelivered && (
                          <button
                            onClick={() => handleDeliverClick(ord._id)}
                            className="glass-button"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            <Truck size={14} /> Mark Delivered
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: USERS MANAGEMENT --- */}
      {activeTab === 'users' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px 0', color: 'var(--text-main)' }}>Registered Store Accounts</h3>

          {loadingAdminData ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading user list from MongoDB...</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.9)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>User Name</th>
                    <th style={{ padding: '12px' }}>Email Address</th>
                    <th style={{ padding: '12px' }}>Role / Status</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((usr) => (
                    <tr key={usr._id} style={{ borderBottom: '1px solid rgba(226, 232, 240, 0.6)' }}>
                      <td style={{ padding: '12px', fontWeight: '700', color: 'var(--text-main)' }}>{usr.name}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{usr.email}</td>
                      <td style={{ padding: '12px' }}>
                        {usr.isAdmin ? (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: 'rgba(99, 102, 241, 0.12)',
                            color: 'var(--primary)',
                            border: '1px solid rgba(99, 102, 241, 0.3)'
                          }}>
                            Admin User
                          </span>
                        ) : (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            background: 'rgba(241, 245, 249, 0.8)',
                            color: 'var(--text-muted)',
                            border: '1px solid rgba(203, 213, 225, 0.8)'
                          }}>
                            Customer
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        {!usr.isAdmin && (
                          <button
                            onClick={() => handleDeleteUserClick(usr._id)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: 'rgba(239, 68, 68, 0.08)',
                              border: '1px solid rgba(239, 68, 68, 0.25)',
                              color: '#dc2626',
                              cursor: 'pointer',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}
                          >
                            <Trash2 size={14} /> Remove User
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT GLASS MODAL */}
      {showProductModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(10px)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel animate-fadeIn" style={{
            width: '100%',
            maxWidth: '520px',
            padding: '30px',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)'
          }}>
            <button
              onClick={() => setShowProductModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(241, 245, 249, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                color: 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <h3 style={{ fontSize: '22px', fontWeight: '800', margin: '0 0 20px 0', color: 'var(--text-main)' }}>
              {editingProductId ? 'Edit Product Details' : 'Create New Product'}
            </h3>

            <form onSubmit={handleProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Product Name</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="glass-input" style={{ width: '100%' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Price ($)</label>
                  <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} className="glass-input" style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="glass-input" style={{ width: '100%', background: '#ffffff' }}>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Image URL</label>
                <input type="url" required value={image} onChange={(e) => setImage(e.target.value)} className="glass-input" style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Stock Quantity</label>
                <input type="number" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="glass-input" style={{ width: '100%' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: '600' }}>Description</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="glass-input" style={{ width: '100%', resize: 'none' }} />
              </div>

              <button type="submit" className="glass-button" style={{ width: '100%', marginTop: '10px' }}>
                {editingProductId ? 'Save Changes' : 'Create Product in MongoDB'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const MetricCard = ({ icon, label, value, subtext }) => (
  <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: '#ffffff' }}>
    <div style={{
      padding: '12px',
      borderRadius: '14px',
      background: 'rgba(241, 245, 249, 0.8)',
      border: '1px solid rgba(226, 232, 240, 0.9)'
    }}>
      {icon}
    </div>
    <div>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', fontWeight: '600' }}>{label}</span>
      <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)' }}>{value}</strong>
      <span style={{ fontSize: '11px', color: 'var(--text-dim)', display: 'block' }}>{subtext}</span>
    </div>
  </div>
);

export default AdminDashboard;
