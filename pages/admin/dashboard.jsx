import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../lib/client';
import styles from '../../styles/Dashboard.module.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productsQuery = '*[_type == "product"]';
      const ordersQuery = '*[_type == "order"]';
      
      const [productsData, ordersData] = await Promise.all([
        client.fetch(productsQuery),
        client.fetch(ordersQuery)
      ]);

      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </header>

      <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.section}>
          <h2>Recent Products</h2>
          <div className={styles.productsGrid}>
            {products.map(product => (
              <div key={product._id} className={styles.productCard}>
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <p>Category: {product.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>Recent Orders</h2>
          <div className={styles.ordersList}>
            {orders.map(order => (
              <div key={order._id} className={styles.orderCard}>
                <p>Order ID: {order._id}</p>
                <p>Total: ${order.total}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;