import './App.css';
import './'

import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Logout from './components/Logout.js'
import Home from './components/Home.js'
import Header from './components/Header.js'
import Userpage from './components/Userpage.js';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './components/Admin.js';

function App() {
  return (
    
      <BrowserRouter>
      <Header />
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/api/auth/signin' element={<Login />} />
        <Route path='/api/auth/signup' element={<Signup />} />
        <Route path='/api/userinfo' element={<Userpage />} />
        <Route path='/api/admin' element={<Admin />} />
        <Route path='/api/logout' element={<Logout />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
