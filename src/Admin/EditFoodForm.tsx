import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebase/firebase.config';
import { FoodType } from '../types/food.types';
import { updateFood } from '../api/food.firestore';
import { MdFileUpload } from 'react-icons/md';

type EditFoodProps = {
  foodId: string | null;
};

const EditFood: React.FC<EditFoodProps> = ({ foodId }) => {
  const [formData, setFormData] = useState<FoodType>({
    id: foodId || '',
    name: '',
    foodType: '',
    price: 0,
    imageUrl: '',
    description: '',
  });
  // const params = useParams<{ foodId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoodData = async () => {
      if (foodId) {
        const foodRef = doc(firestore, 'foods', foodId);

        const docSnap = await getDoc(foodRef);

        if (docSnap.exists()) {
          const foodData = docSnap.data() as FoodType;

          setFormData({ ...foodData, id: foodId });
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchFoodData();
  }, [foodId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (foodId) {
      await updateFood(foodId, formData);

      navigate(`/foods/${formData.name}`);
    } else {
      console.log('Food ID is undefined');
    }
  };

  const uploadImage = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera'],
        cropping: true,
      },
      (error, result) => {
        if (result && result.event === 'success') {
          setFormData({ ...formData, imageUrl: result.info.url });
          console.log('Image uploaded to Cloudinary:', result.info.url);
        }
        if (error) {
          console.error('Upload error:', error);
        }
      }
    );
    widget.open();
  };

  return (
    <main>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full md:w-1/2"
        >
          <div>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Food Name"
              className="px-4 py-3 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <input
              id="foodType"
              type="text"
              name="foodType"
              value={formData.foodType}
              onChange={handleInputChange}
              placeholder="Food Type (Breakfast, Lunch, Dinner)"
              className="px-4 py-3 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <input
              id="price"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="$ Price"
              className="px-4 py-3 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="px-4 py-3 border border-gray-300 rounded w-full"
              rows={4}
            />
          </div>
          <div>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Image Url"
              className="px-4 py-3 border border-gray-300 rounded w-full"
            />
          </div>
          <button
            type="button"
            onClick={uploadImage}
            className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100"
          >
            <MdFileUpload className="w-6 h-6" />
            <span className="poppins">Upload New Image</span>
          </button>
          <button
            type="submit"
            className="bg-primary text-white py-3 px-4 rounded bg-primary transition duration-300"
          >
            Update Food
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditFood;
