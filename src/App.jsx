import { useState, useContext, useEffect } from 'react'
import './output.scss'
import Header from './components/Elements/Header';

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(true);
 return(
  <div>
    <Header isAuthenticated={isAuthenticated}/>
  </div>
 );
}

export default App
