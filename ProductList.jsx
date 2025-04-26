import React, { useState, useEffect } from 'react';
import { client } from '../lib/client';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      const query = '*[_type == "product"]';
      const products = await client.fetch(query);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'electronics' ? 'active' : ''} onClick={() => setFilter('electronics')}>Electronics</button>
        <button className={filter === 'clothing' ? 'active' : ''} onClick={() => setFilter('clothing')}>Clothing</button>
      </div>
      <div className="products-wrapper">
        {products
          .filter(product => filter === 'all' || product.category === filter)
          .map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductList;