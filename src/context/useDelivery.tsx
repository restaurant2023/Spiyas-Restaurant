import { useContext } from 'react';
import { DeliveryContext } from './DeliveryProvider';

export const useDelivery = () => {
  return useContext(DeliveryContext);
};
