import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import styles from '../styles/Auth.module.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const router = useRouter();

  // Clear form data when switching between login and register
  useEffect(() => {
    setFormData({
      email: '',
      password: '',
      name: ''
    });
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success(isLogin ? 'Login successful!' : 'Registration successful!');
        router.push('/');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Authentication failed');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authForm}>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          {!isLogin && (
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                autoComplete="off"
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className={styles.authButton}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <button 
          className={styles.switchButton}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default Auth;