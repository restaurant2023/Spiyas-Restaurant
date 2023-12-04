import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import NavLogo from '../../assets/logo2.svg';
import { useOrder } from '../../context/useOrder';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../../context/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { order } = useOrder();
  const auth = getAuth();
  const { user } = useAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Swal.fire({
          text: "Can't wait to welcome you back soon.",
          confirmButtonColor: '#f91945',
        });
        navigate('/signin');
      })
      .catch((error) => console.error('Error signing out: ', error));
  };

  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  window.addEventListener('scroll', onChangeHeader);

  return (
    <header
      className={`fixed z-50 top-0 left-0 w-full transition duration-500 ${
        changeHeader ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center">
          <img
            className="w-36 cursor-pointer"
            src={NavLogo}
            alt="NavLogo"
            onClick={() => navigate('/')}
          />
          {user?.displayName && location.pathname !== '/admin' && (
            <button
              className="ml-3 lg:ml-5 text-sm lg:text-base bg-primary text-white px-3 lg:px-5 py-1 lg:py-2 focus:outline-none rounded-full transition duration-300 hover:bg-red-600"
              onClick={() => navigate('/order-history')}
            >
              Order History
            </button>
          )}

          {user?.displayName &&
            user.role === 'admin' &&
            location.pathname !== '/admin' && (
              <button
                className="text-sm lg:text-base bg-primary text-white px-3 py-1 lg:px-5 lg:py-2 ml-3 rounded-full transition duration-300 hover:bg-red-600"
                onClick={() => navigate('/admin')}
              >
                Admin Dashboard
              </button>
            )}
        </div>

        {/* Right Section */}
        {user?.displayName ? (
          <div className="flex items-center justify-end space-x-4">
            <div
              className="relative flex cursor-pointer"
              onClick={() => navigate('/orders')}
            >
              <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white poppins absolute -right-2 -top-2">
                {order.length}
              </span>
              <BsCart2 className="cursor-pointer w-6 h-6 text-gray-700 mx-2" />
            </div>
            <div style={{ fontSize: '1.5em' }}>
              <FaUserAlt />
            </div>
            <p className="text-gray-700 poppins hidden md:block lg:block">
              {user?.displayName}
            </p>
            <FiLogOut
              className="cursor-pointer w-6 h-6 text-primary"
              onClick={handleSignOut}
            />
          </div>
        ) : (
          <div className="flex items-center justify-end space-x-6">
            <button className="poppins" onClick={() => navigate('/signin')}>
              Sign In
            </button>
            <button
              className=" bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
