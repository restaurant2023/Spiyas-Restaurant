import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebase/firebase.config';
import { MdFileUpload } from 'react-icons/md';

export type FoodType = {
  name: string;
  foodType: string;
  price: string;
  imageUrl: string;
  description: string;
};

const AddFood: React.FC = () => {
  const [formData, setFormData] = useState<FoodType>({
    name: '',
    foodType: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, 'foods'), formData);
      console.log('Food item added with ID:', docRef.id);
      setFormData({
        name: '',
        foodType: '',
        price: '',
        imageUrl: '',
        description: '',
      });
    } catch (error) {
      console.error('Error adding food item:', error);
    }
  };

  return (
    <main>
      <div className="flex flex-col  items-center  ">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-3 w-full sm:w-3/4 md:w-1/2 lg:w-1/2"
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
            <button
              type="button"
              onClick={uploadImage}
              className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100"
            >
              <MdFileUpload className="w-6 h-6" />
              <span className="poppins">Upload Image</span>
            </button>
            {formData.imageUrl && (
              <div className="mt-4">
                <p>Uploaded Image:</p>
                <img
                  src={formData.imageUrl}
                  alt="Uploaded"
                  style={{ maxWidth: '100px' }}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-3 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Add Food
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddFood;
