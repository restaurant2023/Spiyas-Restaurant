import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const AuthNavigation = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error('Error signing out: ', error));
  };

  return (
    <ul className="flex space-x-4">
      {!isUserLoggedIn && (
        <>
          <li>
            <Link
              to="/signin"
              className="text-black-500 hover:text-gray-600 transition duration-300"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-black-500 hover:text-gray-600 transition duration-300"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
      {isUserLoggedIn && (
        <li>
          <Link
            to="/"
            className="text-black-500 hover:text-gray-600 transition duration-300"
          >
            <button
              onClick={handleSignOut}
              className="text-black-500 hover:text-gray-600 transition duration-300"
            >
              Sign Out
            </button>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default AuthNavigation;
