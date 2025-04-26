import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineShopping, AiOutlineUser, AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { FaFilter } from 'react-icons/fa';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, setSearchQuery, setCategory } = useStateContext();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/auth');
  };

  if (router.pathname === '/auth') return null;

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <p className="logo">
          <Link href="/">Balamurugan E-Shopping</Link>
        </p>

        {user && (
          <div className="search-filter-container">
            <div className="search-bar">
              <AiOutlineSearch />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>
          </div>
        )}

        <div className="nav-buttons">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link href="/admin/dashboard">
                  <button className="nav-button admin">
                    <AiOutlineUser />
                    Admin
                  </button>
                </Link>
              )}
              <Link href="/profile">
                <button className="nav-button profile">
                  <AiOutlineUser />
                  Profile
                </button>
              </Link>
              <button onClick={handleLogout} className="nav-button logout">
                <AiOutlineLogout />
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth">
              <button className="nav-button login">
                <AiOutlineUser />
                Login
              </button>
            </Link>
          )}
          <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
            <AiOutlineShopping />
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>
        </div>

        {showCart && <Cart />}
      </div>

      {showFilters && (
        <div className="filters-dropdown">
          <div className="filter-options">
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="headphones">Headphones</option>
              <option value="speakers">Speakers</option>
              <option value="earbuds">Earbuds</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;