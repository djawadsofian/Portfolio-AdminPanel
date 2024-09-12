import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './components/AppRoutes';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;
