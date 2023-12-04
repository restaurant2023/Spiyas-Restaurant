import React, { createContext, useState } from 'react';
import { FoodType } from '../types/food.types';

interface OrderContextType {
  order: FoodType[];
  handleOrder: (food: FoodType) => void;
  removeOrder: (id: string) => void;
  clearOrder: () => void;
}

const defaultOrderContext: OrderContextType = {
  order: [],
  handleOrder: () => {},
  removeOrder: () => {},
  clearOrder: () => {},
};

export const OrderContext =
  createContext<OrderContextType>(defaultOrderContext);

interface OrderProviderProps {
  children: React.ReactNode;
}

const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [order, setOrder] = useState<FoodType[]>([]);

  const handleOrder = (food: FoodType) => {
    setOrder((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (item) => item.id === food.id
      );
      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        const existingOrder = updatedOrders[existingOrderIndex];
        existingOrder.quantity = (existingOrder.quantity || 0) + 1;
        return updatedOrders;
      } else {
        return [...prevOrders, { ...food, quantity: 1 }];
      }
    });
  };
  const removeOrder = (id: string) => {
    setOrder((prevOrders) => prevOrders.filter((item) => item.id !== id));
  };

  const clearOrder = () => {
    setOrder([]);
  };

  const value = {
    order,
    handleOrder,
    removeOrder,
    clearOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export default OrderProvider;
