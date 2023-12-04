import { useContext } from 'react';
import { OrderContext } from './OrderProvider';

export const useOrder = () => {
  return useContext(OrderContext);
};
