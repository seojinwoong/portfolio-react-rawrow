import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Auth from '../hoc/auth';

// components
import Header from './views/Header/Header';
import Footer from './views/Footer/Footer';
import MainPage from './views/MainPage/MainPage';

const Layout = () => {
  return (
    <>
      <Header />
      <div className='page-content'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

const AuthMainPage = Auth(MainPage, null);

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route exact path="/" element={<AuthMainPage/>} />
        </Route>
      </Routes>
  );
}

export default App;
