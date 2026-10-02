import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import ProductDetail from './pages/productDetails';
import Shop from './pages/Shop';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import EmailVerification from './pages/EmailVerification';
import PublicRoute from './context/PublicRoute';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './admin/AdminDashboard';
import CreateProduct from './admin/CreateProduct';
import ManageProducts from './admin/ManageProduct';
import ManageOrders from './admin/ManageOrders';
import ManageUsers from './admin/ManageUsers';
import PrivateRoute from './context/PrivateRoute';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Deals from './pages/Deals';
import UserProfile from './pages/UserProfile';
import ContactSupport from './pages/ContactSupport';

function App(){
     return(
       <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element = {<PublicRoute><Login/></PublicRoute>} />
          <Route path="/Register" element = {<PublicRoute><Register/></PublicRoute>}/>
          <Route path="/product/:id" element = {<ProductDetail/>}/>
          <Route path="/Shop" element = {<Shop/>}/>
          <Route path="/Shop/:category" element = {<CategoryPage/>}/>
          <Route path="/cart" element = {<Cart/>}/>
          <Route path="/EmailVerification" element = {<PublicRoute><EmailVerification/></PublicRoute>}/>
          <Route path='/Checkout' element = {<Checkout/>}/>
          <Route path='/OrderSuccess' element={<OrderSuccess/>}/>
          <Route path='/MyOrders'element={<MyOrders/>}/>
          <Route path='/terms'element={<TermsOfService/>}/>
          <Route path='/privacy' element={<PrivacyPolicy/>}/>
          <Route path='/deals' element = {<Deals/>}/>
          <Route path='/profile'element={<UserProfile/>}/>
          <Route path='/contact'element={<ContactSupport/>}/>

          {/* Admin Routes */}
          <Route path='/admin/dashboard' element={<PrivateRoute><AdminDashboard/></PrivateRoute>}/>
          <Route path='/admin/add-product' element={<PrivateRoute><CreateProduct/></PrivateRoute>}/>
          <Route path='/admin/products' element={<PrivateRoute><ManageProducts/></PrivateRoute>}/>
          <Route path='/admin/orders' element={<PrivateRoute><ManageOrders/></PrivateRoute>}/>
          <Route path='/admin/users' element={<PrivateRoute><ManageUsers/></PrivateRoute>}/>
        </Routes>
      <Footer />
     </Router>
     );
}

export default App;