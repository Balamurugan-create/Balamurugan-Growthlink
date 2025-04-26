import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiOutlineHome } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { client } from '../../lib/client';
import styles from '../../styles/Profile.module.css';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    
    const fetchUserData = async () => {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Fetch user's orders
        const userOrders = await client.fetch(
          `*[_type == "order" && user._ref == $userId] | order(createdAt desc)`,
          { userId: parsedUser._id }
        );
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>My Profile</h1>
        <Link href="/">
          <button className={styles.homeButton}>
            <AiOutlineHome />
            Back to Home
          </button>
        </Link>
      </div>

      <div className={styles.profileContent}>
        <div className={styles.userInfo}>
          <h2>Account Information</h2>
          <div className={styles.infoCard}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Account Type:</strong> {user?.role}</p>
          </div>
        </div>

        <div className={styles.orderHistory}>
          <h2>Order History</h2>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h3>Order #{order._id.slice(-5)}</h3>
                  <span className={styles.orderStatus}>{order.status}</span>
                </div>
                <div className={styles.orderDetails}>
                  <p><strong>Date:</strong> {new Date(order._createdAt).toLocaleDateString()}</p>
                  <p><strong>Total:</strong> ${order.totalAmount}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;