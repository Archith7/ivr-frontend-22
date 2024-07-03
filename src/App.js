 import { BrowserRouter, Routes , Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home"
import Navbar from "./pages/navbar"
import Orders from "./pages/orders"
import Product1 from "./pages/product1"
import Custserv from "./pages/customerservice"
import Conford from "./pages/confirmorder"
import Invalid from "./pages/invalid"
import Aboutus from "./pages/aboutus"
import Signup from "./pages/signup"
import Login from "./pages/login"
import Logins from "./pages/logincomponent"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />

     <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/p1" element={<Product1/>} />
      <Route path="/customercare" element={<Custserv/>} />
      <Route path="/confirmorder" element={<Conford/>} />
      <Route path="/aboutus" element={<Aboutus/>}></Route>
      <Route path="/orders" element={<Orders/>} />
      <Route path="*" element={<Invalid/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/" element={<Login/>} />
      <Route path='/logins' element={<Logins/>} />
     </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
