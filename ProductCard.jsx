import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { useStateContext } from '../context/StateContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useStateContext();

  return (
    <div className="product-card">
      <Link href={`/product/${product.slug.current}`}>
        <div className="product-card-image">
          <img src={urlFor(product.image && product.image[0])} alt={product.name} />
        </div>
        <div className="product-card-details">
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      </Link>
      <button type="button" className="add-to-cart" onClick={() => addToCart(product, 1)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;