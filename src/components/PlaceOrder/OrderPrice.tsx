import { FoodType } from '../../types/food.types';

interface OrderPriceProps {
  order: FoodType[];
}

const OrderPrice: React.FC<OrderPriceProps> = ({ order }) => {
  // Calculate the subtotal
  const subTotal = order.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Assuming a fixed tax rate (e.g., 10%) and a fixed delivery fee
  const taxRate = 0.1;
  const deliveryFee = 5.0; // Fixed delivery fee

  const tax = subTotal * taxRate;
  const total = subTotal + tax + deliveryFee;

  // Format to 2 decimal places
  const formatPrice = (price: number) => price.toFixed(2);

  return (
    <div className="flex flex-col space-y-3 my-4">
      <div className="flex items-center">
        <span className="flex-grow poppins text-gray-700">Subtotal</span>
        <span className="poppins font-semibold text-black">
          ${formatPrice(subTotal)}
        </span>
      </div>
      <div className="flex items-center">
        <span className="flex-grow poppins text-gray-700">Tax</span>
        <span className="poppins font-semibold text-black">
          ${formatPrice(tax)}
        </span>
      </div>
      <div className="flex items-center">
        <span className="flex-grow poppins text-gray-700">Delivery Fee</span>
        <span className="poppins font-semibold text-black">
          ${formatPrice(deliveryFee)}
        </span>
      </div>
      <div className="flex items-center">
        <span className="flex-grow poppins text-gray-700 text-xl">Total</span>
        <span className="poppins font-semibold text-black text-xl">
          ${formatPrice(total)}
        </span>
      </div>
    </div>
  );
};

export default OrderPrice;
