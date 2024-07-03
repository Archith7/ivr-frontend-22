import React from 'react'
// import { useNavigate } from 'react-router-dom'
import '../stylecss/navbar.css'
import { Link } from 'react-router-dom'

function Navbar() {
  // const navigate = useNavigate();
  //  let Shift=()=>{
  // navigate('/customercare');
  //  }
  return (
    <div>
      {/* <h1>this is navbar page</h1> */}
      {/* <button onClick={Shift}> customer services</button> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        
        <div className="container-fluid">
          {/* <div classNameName='xyz'> */}
          <Link to="/home" className="navbar-brand" >ShopEase</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/home" className="nav-link active" aria-current="page" >Home</Link>
              <Link to="/orders" className="nav-link" >Orders</Link>
              <Link className="nav-link" to="/customercare">Customer Care</Link>
              <Link className="nav-link" to="/aboutus">About Us</Link>
              <Link className="nav-link" to="/">Login</Link>
              
              

            </div>
          </div>
        </div>
        {/* </div> */}
      </nav>

    </div>
  )
}

export default Navbar;
