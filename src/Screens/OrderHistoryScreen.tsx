import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../utils/firebase/firebase.config';
import { collection, query, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/useAuth';
import { OrderType } from '../types/order.types';
import { deleteOrder } from '../api/order.firestore';
import Swal from 'sweetalert2';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(firestore, 'users', user.uid, 'orders');
        const q = query(ordersRef);
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            items: data.items,
          } as OrderType;
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const handleReorder = (itemName: string) => {
    navigate(`/foods/${itemName}`);
  };

  const handleDelete = async (orderId: string) => {
    // Display the confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f91945',
      cancelButtonColor: '#EE7214',
      confirmButtonText: 'Delete',
      iconColor: 'orange',
    });

    if (result.isConfirmed) {
      try {
        if (user) {
          await deleteOrder(user.uid, orderId);
          setOrders((orders) => orders.filter((order) => order.id !== orderId));
          Swal.fire({
            text: 'Your order has been deleted.',
            confirmButtonColor: '#EE7214',
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error deleting your order.',
          icon: 'error',
          confirmButtonColor: '#EE7214',
        });
      }
    }
  };

  return (
    <div className="flex justify-center mt-20">
      {' '}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6">
        {' '}
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order.id}
              className="order-card bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative max-w-sm"
            >
              {order.items.map((item) => (
                <div key={item.id} className="food-card mb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-48 mx-auto transform transition duration-300 hover:scale-105"
                  />
                  <div className="flex flex-col items-center my-3 space-y-2">
                    <h2 className="text-gray-900 poppins text-xl">
                      {item.name}
                    </h2>
                    <p> {item.foodType}</p>
                    <p className="font-bold"> ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-center space-x-2 mt-2">
                    <button
                      onClick={() => handleReorder(item.name)}
                      className="bg-primary text-white px-4 py-2 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105"
                    >
                      Reorder
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-primary text-white px-4 py-2 focus:outline-none poppins rounded-full transform transition duration-300 hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="flex justify-center items-center text-center font-bold text-3xl text-primary">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryScreen;
