import { FoodType } from '../types/food.types';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { firestore } from '../utils/firebase/firebase.config';

export const addFood = async (foodData: FoodType) => {
  const foodsRef = collection(firestore, 'foods');
  try {
    const docRef = await addDoc(foodsRef, foodData);
    return docRef;
  } catch (error) {
    console.error('Error adding food', error);
  }
};

export const getFoods = async () => {
  const foodsRef = collection(firestore, 'foods');
  try {
    const snapshot = await getDocs(foodsRef);
    const foods = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FoodType[];
    console.log(foods);
    return foods;
  } catch (error) {
    console.error('Error fetching foods', error);
    return [];
  }
};

export const updateFood = async (
  foodId: string,
  foodData: Partial<FoodType>
) => {
  const foodRef = doc(firestore, `foods/${foodId}`);
  try {
    await updateDoc(foodRef, foodData);
  } catch (error) {
    console.error('Error updating food', error);
  }
};

export const deleteFood = async (foodId: string) => {
  const foodRef = doc(firestore, `foods/${foodId}`);
  try {
    await deleteDoc(foodRef);
  } catch (error) {
    console.error('Error deleting food', error);
  }
};
