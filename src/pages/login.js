import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../stylecss/login.css';

function Login() {
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState('');
    const navigate = useNavigate();

    const evehandler = async (e) => {
        e.preventDefault();
        try {
            const data={email , password };
            console.log(data);
            const response = await axios.post('http://localhost:5000/api/signin', data);
            console.log("posted");
            if (response.data.auth === true) {
                console.log(response.data.message);
                localStorage.setItem('token', response.data.authtoken);
                navigate('/home');
            } else {
                console.log(response.data.message);
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error.response?.data || error.message);
            alert("Error logging in. Please check your credentials and try again.");
        }



    }
    return (
        <div>
            <h3>login here</h3>
            <form onSubmit={evehandler}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
                <br />
                <br />
                {/* <p>Dont have an Accout ?</p> */}
                <Link className="nav-link" to={'/signup'}><h6>Dont have an Accout ?</h6>  Click here</Link>

            </form>
        </div>
    )
}

export default Login
