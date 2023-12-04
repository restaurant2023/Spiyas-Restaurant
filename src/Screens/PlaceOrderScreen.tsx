import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert2';
import DeliveryForm from '../components/PlaceOrder/DeliveryForm';
import OrderPrice from '../components/PlaceOrder/OrderPrice';
import OrderCard from '../components/PlaceOrder/OrderCard';
import { useDelivery } from '../context/useDelivery';
import { useOrder } from '../context/useOrder';
import Back from '../routes/Back';
import { addOrder } from '../api/order.firestore';
import { useAuth } from '../context/useAuth';

const PlaceOrderScreen = () => {
  const { order, clearOrder } = useOrder();
  const { input, disabled } = useDelivery();
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    console.log('Updated delivery input:', input);
  }, [input]);

  console.log(order);
  console.log('Delivery Input', input);

  const handlePlaceOrder = async () => {
    if (!user) {
      console.log('No user logged in');
      return;
    }

    try {
      await addOrder(user.uid, order, input);
      swal.fire({
        text: 'Order Placed Successfully',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'my-confirm-button',
        },
      });
      navigate('/order-successful');
      clearOrder();
    } catch (error) {
      console.log('Something went wrong');
    }
  };

  return (
    <main className=" h-screen banner">
      <div className="max-w-screen-xl py-20 mx-auto px-6">
        <Back />
        {order.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              <div className="col-span-1">
                <DeliveryForm />
              </div>
              <div className="col-span-1">
                <div className="glass p-6 box-border rounded-lg">
                  <div className="flex flex-col space-y-4 mb-3">
                    <p className="poppins text-gray-700">
                      Delivery Address :{' '}
                      <span className="font-semibold text-black">
                        {input.address ? `${input.address}` : ''}
                      </span>
                    </p>
                    <p className="poppins text-gray-700">
                      Postal Code :{' '}
                      <span className="font-semibold text-black">
                        {input.postalCode ? `${input.postalCode}` : ''}
                      </span>{' '}
                    </p>
                    <p className="poppins text-gray-700">
                      Contact Number :{' '}
                      <span className="font-semibold text-black">
                        {input.phoneNumber ? `${input.phoneNumber}` : ''}
                      </span>
                    </p>
                    <p className="poppins text-gray-700">
                      Recipient Name :{' '}
                      <span className="font-semibold text-black">
                        {input.recipientName ? `${input.recipientName}` : ''}
                      </span>{' '}
                    </p>
                  </div>

                  <div className=" flex flex-col space-y-3 h-64 overflow-y-scroll orderContainer ">
                    {order.map((item) => (
                      <OrderCard key={item.id} {...item} />
                    ))}
                  </div>
                  <OrderPrice order={order} />

                  <div>
                    {disabled ? (
                      <button
                        disabled={true}
                        className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500 opacity-40"
                      >
                        Place Order
                      </button>
                    ) : (
                      <button
                        className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="pt-24">
            <h1 className="text-center text-5xl text-primary poppins">
              No Order has been added!!
            </h1>
          </div>
        )}
      </div>
    </main>
  );
};

export default PlaceOrderScreen;
