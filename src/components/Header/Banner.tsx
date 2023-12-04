import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFoods } from '../../api/food.firestore';
import { FoodType } from '../../types/food.types';
import { FaSearch } from 'react-icons/fa';

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<FoodType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        const foods = await getFoods();
        const filteredSuggestions = foods.filter((food) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectSuggestion = (foodName: string) => {
    navigate(`/foods/${foodName}`);
  };

  return (
    <section className="header-banner h-96 w-full bg-yellow-50">
      <div className="mx-auto flex flex-col items-center justify-center h-full md:w-1/2">
        <h1 className="text-center text-xl md:text-2xl lg:text-3xl poppins font-semibold tracking-wider uppercase leading-loose">
          "Welcome to SpiYas, Where every bite tells a story of passion and
          flavor."
        </h1>
        <div className="relative mt-8 w-96">
          <input
            type="text"
            className="rounded-full pl-10 pr-4 py-4 w-full focus:outline-none bg-white shadow-md"
            placeholder="Search here"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <ul className="absolute bg-white  w-96 max-h-60 overflow-auto shadow-lg rounded-md mt-1">
            {suggestions.map((food) => (
              <li
                key={food.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectSuggestion(food.name)}
              >
                {food.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Banner;
