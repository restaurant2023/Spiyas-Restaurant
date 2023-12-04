import { useEffect, useState } from 'react';
import { getFoods } from '../api/food.firestore';
import { FoodType } from '../types/food.types';

const useFetch = (): [FoodType[], boolean, unknown] => {
  const [data, setData] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foods = await getFoods();
        setData(foods);
        console.log(foods);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, loading, error];
};

export default useFetch;
