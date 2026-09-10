import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Introduction from './Introduction';
import Biryanis from './Biryanis';
import VegCurries from './VegCurries';
import NonVegCurries from './NonVegCurries';
import Juices from './Juices';
import Rates from './Rates';
import OrderList from './OrderList';
import AdminLogin from './AdminLogin';
import Footer from './Footer';
import './App.css'


function App() {
  return (
    <div className='back'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/biryanis" element={<Biryanis />} />
        <Route path="/veg-curries" element={<VegCurries />} />
        <Route path="/non-veg-curries" element={<NonVegCurries />} />
        <Route path="/juices" element={<Juices />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/orderlist" element={<OrderList />} /> 
      </Routes>
      <Footer /> {/* 👈 Add footer here */}
    </div>
  );
}

export default App;
