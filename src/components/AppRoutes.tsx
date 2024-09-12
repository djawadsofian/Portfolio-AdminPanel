
import { Routes, Route , Navigate} from 'react-router-dom';

import About from '../pages/About';
import Home from '../pages/Home';
import Portfolio from '../pages/Portfolio';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import { ReactNode, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


interface RequiredAuthProps {
    children: ReactNode;
} 
const AppRoutes: React.FC = () => {
    const{currentUser} = useContext(AuthContext);

    const RequiredAuth: React.FC<RequiredAuthProps> = ({ children }) => {
        return currentUser ? children : <Navigate to="/login" />;
    };
    

    return (
        <Routes>
            <Route path='/Login' element={<Login/>} />
            <Route path="/" element={<RequiredAuth><Home /></RequiredAuth>} />
            <Route path="/about" element={<RequiredAuth><About /></RequiredAuth> } />
            <Route path="/portfolio" element={<RequiredAuth> <Portfolio /></RequiredAuth>} />
            <Route path="/contact" element={<RequiredAuth> <Contact /></RequiredAuth>} />
        </Routes>
    );
}

export default AppRoutes;