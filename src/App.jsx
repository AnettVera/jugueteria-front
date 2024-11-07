import { useState, useContext, useEffect } from 'react'
import './output.scss'
import Header from './components/Elements/Generales/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Elements/Generales/Footer';
import ProductCard from './components/Elements/Generales/ProductCard';
import ModalUsuario from './components/Elements/Generales/ModalUsuario';
import SignInPage from './modules/auth/SignInPage';
function App() {
const [isAuthenticated, setIsAuthenticated] = useState(true);
 return(
  <div>
    <SignInPage/>
   
  </div>
 );
}

export default App
