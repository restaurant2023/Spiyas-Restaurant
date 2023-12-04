import { firestore } from '../utils/firebase/firebase.config';
import { doc, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { FoodType } from '../types/food.types';
import { DeliveryDetailsType } from '../types/order.types';

export const addOrder = async (
  userId: string,
  orderItems: FoodType[],
  deliveryDetails: DeliveryDetailsType
) => {
  try {
    const userDocRef = doc(firestore, 'users', userId);
    const ordersCollectionRef = collection(userDocRef, 'orders');

    const newOrder = {
      items: orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        foodType: item.foodType,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        quantity: item.quantity || 1,
      })),
      deliveryInfo: deliveryDetails,
      orderPlacedAt: new Date(),
    };

    const docRef = await addDoc(ordersCollectionRef, newOrder);

    console.log('Order added with ID:', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding order to user:', userId, e);
    throw e;
  }
};

export const deleteOrder = async (userId: string, orderId: string) => {
  try {
    const orderDocRef = doc(firestore, 'users', userId, 'orders', orderId);
    await deleteDoc(orderDocRef);

    console.log('Order deleted with ID:', orderId);
  } catch (e) {
    console.error('Error deleting order:', orderId, e);
    throw e;
  }
};
