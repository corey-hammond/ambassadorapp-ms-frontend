import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RedirectToUsers } from './components/RedirectToUsers';
import Links from './pages/Links';
import Login from './pages/Login';
import Orders from './pages/Orders';
import ProductForm from './pages/products/ProductForm';
import Products from './pages/products/Products';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Users from './pages/Users';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<RedirectToUsers />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
          <Route path={'/profile'} element={<Profile />} />
          <Route path={'/users/:id/links'} element={<Links />} />
          <Route path={'/users'} element={<Users />} />
          <Route path={'/products'} element={<Products />} />
          <Route path={'/products/create'} element={<ProductForm />} />
          <Route path={'/products/:id/edit'} element={<ProductForm />} />
          <Route path={'/orders'} element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
