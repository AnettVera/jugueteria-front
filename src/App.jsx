import { ThemeProvider } from './config/Theme/ThemeContext';
import { AuthProvider } from './config/context/auth-context';
import AppRouter from './router/AppRouter';
import './output.scss';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
