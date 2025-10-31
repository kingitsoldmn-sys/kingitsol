
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "swiper/swiper-bundle.min.css";
import "./index.css";
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio'
import Login from "../pages/Login";
import Order from '../pages/Order'
import Career from "../pages/Career";
import Enroll from "../pages/Enroll";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AddEnrollment from '../pages/AddEnrollment/AddEnrollment';
import CareerDetails from '../pages/CareerDetails';
import EnrollDetails from "../pages/EnrollDetails";
import OrderDetails from "../pages/OrderDetails";
import ContactDetails from '../pages/ContactDetails';
import UserDetails from '../pages/UserDetails';
import Alert from '../pages/Alert.jsx';

import "typeface-teko";
// import Header from './components/Header/Header';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/careers' element={<Career/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/enroll' element={<Enroll/>}/>
        <Route path='/admin' element={<Login/>} />
        <Route path='/add-enrollment' element={<AddEnrollment/>} />
        <Route path='/career' element={<CareerDetails/>}/>
        <Route path='/enrolls' element={<EnrollDetails/>}/>
        <Route path='/orders' element={<OrderDetails/>}/>
        <Route path='/contacts' element={<ContactDetails/>}/>
        <Route path='/userDetails' element={<UserDetails/>}/>
        <Route path='/alerts'  element={<Alert/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
