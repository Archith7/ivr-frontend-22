import React from 'react'
import { Link } from 'react-router-dom'
import '../stylecss/p1.css';
function product1() {
  return (
    <div>
      <h2>this is the page for product1 </h2>
      <div className="small-imag">
                    <Link><img src="images/stati1.jpg" alt="stationary1" /></Link>
                    <Link><img src="images/stati2.webp" alt="stationary1" /></Link>
                    <Link><img src="images/stationary.jpg" alt="stationary1" /></Link>
                    <Link><img src="images/stationary.jpg" alt="stationary1" /></Link>
                </div>
    </div>
  )
}

export default product1
