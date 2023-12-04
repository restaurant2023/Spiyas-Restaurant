import { useEffect, useState } from 'react';
import { MdVerified } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import GridLoader from 'react-spinners/GridLoader';
import orderSuccessful from '../assets/ordersuccess.png';

const OrderSuccessfulScreen = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <main className=" h-screen banner">
      <div className="max-w-screen-xl mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-3/4 pt-24">
            <GridLoader
              color="#ce193c"
              loading={loading}
              size={35}
              style={{ display: 'block', margin: '0 auto', borderColor: 'red' }}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-3/4 pt-24">
              <h1 className="text-3xl text-center text-primary font-semibold poppins flex space-x-6 items-center ">
                <MdVerified className="text-primary green-500 text-3xl" />{' '}
                You're all set! Your tasty order is on its way to being
                prepared.
              </h1>
              <img
                className="w-96 object-contain"
                src={orderSuccessful}
                alt="orderSuccessful"
              />

              <button
                className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
                onClick={() => navigate('/')}
              >
                BACK TO HOME
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default OrderSuccessfulScreen;
