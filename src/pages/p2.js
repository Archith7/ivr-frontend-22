import React from 'react';
import '../stylecss/p2.css';
// import phoneImage from './image.png'; // Make sure to save the uploaded image as image.png in the src folder






function p2() {
  return (
    <div>
      <div className="App">
      <div className="product-grid">
        <div className="product-image">
          <img src="images/stati1.jpg" alt="Product" />
        </div>
        <div className="product-details">
          <h1>Apple iPhone 15 (128 GB) - Black</h1>
          <div className="product-price">
            <span className="discounted-price">₹70,999</span>
            <span className="original-price">₹79,900</span>
          </div>
          <p>Inclusive of all taxes</p>
          <button className="buy-now-button">Buy Now</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default p2
