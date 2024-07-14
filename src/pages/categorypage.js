import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../products.json'; // Import the JSON file
import '../stylecss/category.css';
const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Filter products based on the category
    const filteredProducts = productsData.filter(product => product.category === categoryName);
    setProducts(filteredProducts);
  }, [categoryName]);

  return (
    <div>
      <h1>{categoryName}</h1>
      <div className="product-cards">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Buy Now</button>
    </div>
  );
};

export default CategoryPage;
