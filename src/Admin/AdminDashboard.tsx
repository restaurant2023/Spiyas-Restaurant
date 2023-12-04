// AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import { FoodType } from '../types/food.types';
import { getFoods } from '../api/food.firestore';
import { MdEdit } from 'react-icons/md';

type AdminDashboardProps = {
  onEditFood: (tabName: string, foodId?: string) => void;
};

type GroupedFoods = {
  [key: string]: FoodType[];
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onEditFood }) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const fetchedFoods = await getFoods();
        setFoods(fetchedFoods);
      } catch (error) {
        console.error('Error fetching foods:', error);
      }
    };

    fetchFoods();
  }, []);

  const foodsByType = foods.reduce((acc: GroupedFoods, food) => {
    const { foodType } = food;
    if (!acc[foodType]) {
      acc[foodType] = [];
    }
    acc[foodType].push(food);
    return acc;
  }, {} as GroupedFoods);

  const renderFoods = (foods: FoodType[], type: string) => (
    <div
      key={type}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg"
    >
      <h2 className="text-xl font-bold mb-3 text-center text-primary">
        {type}
      </h2>
      {foods.map((food) => (
        <div key={food.id} className="flex items-center mb-5">
          <h1 className="text-center font-bold mr-2 ">{food.name}</h1>
          <MdEdit
            className="cursor-pointer  text-primary"
            onClick={() => onEditFood('editfood', food.id)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col md:flex-row md:space-x-4 lg:space-x-6 xl:space-x-8 my-4 mx-auto px-4 justify-end">
      {Object.entries(foodsByType).map(([type, foods]) =>
        renderFoods(foods, type)
      )}
    </div>
  );
};

export default AdminDashboard;
