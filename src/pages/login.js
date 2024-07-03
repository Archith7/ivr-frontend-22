import React from 'react'
import {Link} from 'react-router-dom';
function login() {
    return (
        <div>
            <h3>login here</h3>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                </div>
            
                <button type="submit" class="btn btn-primary">Submit</button>
                <br/>
                <br/>
                {/* <p>Dont have an Accout ?</p> */}
                <Link className="nav-link" to={'/signup'}><h6>Dont have an Accout ?</h6>  Click here</Link>
                
            </form>
        </div>
    )
}

export default login
