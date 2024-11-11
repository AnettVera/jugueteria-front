import { ThemeProvider } from './config/Theme/ThemeContext';
import Header from './components/Elements/Generales/Header';
import Footer from './components/Elements/Generales/Footer';
import ProductCard from './components/Elements/Generales/ProductCard';
import DashboarPage from './modules/admin/DashboardPage'
import './output.scss'
function App() {
  return (
    <ThemeProvider>
      <div>
      <Header isAuthenticated={true}/>
       <DashboarPage/>
      </div>
    </ThemeProvider>
  );
}

export default App;
