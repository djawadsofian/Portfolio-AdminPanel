import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { CgMenuRight } from 'react-icons/cg';
import { IoMdClose } from 'react-icons/io';
import { useState } from 'react';

const MenuVariants = {
  hidden: {
    x: '100%', 
    opacity: 0,
  },
  show: {
    x: 0, 
    opacity: 1,
    transition: {
      ease: [0.6, 0.05, 0.1, 0.9], 
      duration: 0.5, 
    },
  },
};

const MobileNav: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  return (
    <nav className="lg:hidden">
      {/* Menu Icon */}
      <div className="text-3xl cursor-pointer">
        <CgMenuRight className="text-blue-700" onClick={() => setOpenMenu(true)} />
      </div>

      
      <motion.div
        variants={MenuVariants}
        initial="hidden"
        animate={openMenu ? 'show' : 'hidden'}
        className="bg-gradient-to-r from-blue-500 to-blue-600 fixed h-screen top-0 right-0 z-20 flex flex-col text-2xl text-center shadow-lg w-2/3"
      >
        {/* Close Button */}
        <div className="flex justify-between items-center p-5">
          <IoMdClose className="text-white text-3xl cursor-pointer" onClick={() => setOpenMenu(false)} />
        </div>

        <Link
          to='/Portfolio'
          onClick={() => setOpenMenu(false)}
          className="p-4 text-white hover:text-gray-300 cursor-pointer border-b border-gray-400 hover:bg-blue-700 transition-all"
        >
          Portfolio
        </Link>
        <Link
          to='/Contact'
          onClick={() => setOpenMenu(false)}
          className="p-4 text-white hover:text-gray-300 cursor-pointer border-b border-gray-400 hover:bg-blue-700 transition-all"
        >
          contact
        </Link>
        <Link
          to='/About'
          onClick={() => setOpenMenu(false)}
          className="p-4 text-white hover:text-gray-300 cursor-pointer border-b border-gray-400 hover:bg-blue-700 transition-all"
        >
          About
        </Link>
      </motion.div>
    </nav>
  );
};

export default MobileNav;



