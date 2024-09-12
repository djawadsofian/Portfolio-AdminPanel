import React from 'react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import Logo from '../img/logo.png';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-blue-400 to-blue-600 fixed w-full px-8 lg:px-20 z-30 h-20 lg:h-24 flex items-center justify-between shadow-lg">
            {/* Logo Section */}
            <Link to={'/'} className='max-w-[170px]'>
                <img src={Logo} alt='logo' />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
                <ul className="flex space-x-8 text-lg">
                    <li>
                        <Link
                            className="text-white hover:text-yellow-300 transition duration-300"
                            to="/Portfolio"
                        >
                            Portfolio
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-white hover:text-yellow-300 transition duration-300"
                            to="/Contact"
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-white hover:text-yellow-300 transition duration-300"
                            to="/About"
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>

            <MobileNav />
            
        </header>
    );
};

export default Header;
