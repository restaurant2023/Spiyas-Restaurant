import React, { useState } from 'react';
import Brand from '../components/Form/Brand';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebase/firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { createUserProfileDocument } from '../api/user.firestore';
import { UserType } from '../types/userAuth.types';
import { getUser } from '../api/user.firestore';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  const navigate = useNavigate();

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const signInResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = signInResponse;

      await createUserProfileDocument(user, setUser);

      const userData = await getUser(user.uid);

      if (userData && userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log('Error code:', firebaseError.code);
      console.log('Error message:', firebaseError.message);

      if (
        firebaseError.code === 'auth/invalid-email' ||
        firebaseError.code === 'auth/user-not-found' ||
        firebaseError.code === 'auth/wrong-password' ||
        firebaseError.code === 'auth/invalid-login-credentials' ||
        firebaseError.code === 'auth/invalid-credential'
      ) {
        setErrorMessage('Invalid Email or Password.');
      } else if (firebaseError.code === 'auth/email-already-in-use') {
        setErrorMessage('An account with this email already exists.');
      } else {
        setErrorMessage('An error occurred during sign In.');
      }
      setEmail('');
      setPassword('');
    }
  };

  const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      await createUserProfileDocument(user, setUser);
      navigate('/');

      getAdditionalUserInfo(result);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      console.log('Error code:', firebaseError.code);
      console.log('Error message:', firebaseError.message);
    }
  };

  return (
    <main className="h-screen w-full banner ">
      <div className="flex flex-col justify-center items-center h-screen">
        {/* logo  */}
        <Brand />

        <form className="flex flex-col gap-3 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div>
            {errorMessage && <h2 className="text-primary">{errorMessage}</h2>}
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded w-full"
            />
            {showPassword ? (
              <FiEyeOff
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 my-auto h-full flex items-center cursor-pointer"
              />
            ) : (
              <FiEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 my-auto h-full flex items-center cursor-pointer"
              />
            )}
          </div>

          <button
            onClick={handleSignIn}
            className="bg-primary text-white py-3 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            SIGN IN
          </button>

          <div className="text-center mt-1">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>

          <div className="border-t border-gray-200 mt-4">
            <p className="text-center text-gray-400 py-4">OR </p>
            <button
              className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100"
              onClick={(e) => signInWithGoogle(e)}
            >
              <FcGoogle className="w-6 h-6" />
              <span className="poppins">Sign In With Google</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInScreen;
