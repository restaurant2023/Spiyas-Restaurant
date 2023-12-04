import { AiOutlineDelete } from 'react-icons/ai';
import { useOrder } from '../../context/useOrder';
import { FoodType } from '../../types/food.types';

const OrderCard: React.FC<FoodType> = ({
  id,
  imageUrl,
  name,
  price,
  foodType,
  quantity,
}) => {
  const { removeOrder } = useOrder();

  return (
    <div className="rounded-lg p-4 flex space-x-3">
      <div className="flex">
        <img className="w-24 object-contain" src={imageUrl} alt={name} />
      </div>
      <div className="flex flex-col space-y-3 flex-grow">
        <h5 className="text-base poppins text-gray-700">{name}</h5>
        <h1 className="font-semibold text-lg text-primary poppins">
          ${price.toFixed(2)}
        </h1>
        <p className="text-sm poppins text-gray-400">{foodType}</p>
      </div>

      <div className="flex items-center px-4 py-2 space-x-3">
        <span className="text-lg text-gray-700 poppins select-none">
          {quantity} item(s)
        </span>
      </div>

      <div className="flex flex-col items-center justify-center">
        <AiOutlineDelete
          className="w-6 h-6 text-primary transform transition hover:scale-105 duration-500 cursor-pointer"
          onClick={() => removeOrder(id)}
        />
      </div>
    </div>
  );
};

export default OrderCard;
