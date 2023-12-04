import { FoodType } from './food.types';

export type DeliveryDetailsType = {
  address: string;
  postalCode: string;
  phoneNumber: string;
  recipientName: string;
};

export type OrderType = {
  id: string;
  items: FoodType[];
  deliveryInfo: DeliveryDetailsType;
};
