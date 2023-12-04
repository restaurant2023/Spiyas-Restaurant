import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDelivery } from '../../context/useDelivery';
import { useAuth } from '../../context/useAuth';
import TextField from '../Form/TextField';
import { getUser } from '../../api/user.firestore';
import { saveOrUpdateUserData } from '../../api/user.firestore';

const DeliveryForm = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    address: '',
    postalCode: '',
    phoneNumber: '',
    recipientName: '',
  });
  const { setInput, setDisabled } = useDelivery();

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userData = await getUser(user.uid);
        if (userData) {
          setForm({
            address: userData.address || '',
            postalCode: userData.postalCode || '',
            phoneNumber: userData.phoneNumber || '',
            recipientName: userData.displayName || user.displayName || '',
          });
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      toast.error('User is not authenticated');
      return;
    }

    console.log('Form data before calling setInput', form);

    try {
      await saveOrUpdateUserData(user.uid, form);
      const updatedUser = await getUser(user.uid);
      if (updatedUser) {
        setInput({
          address: updatedUser.address || '',
          postalCode: updatedUser.postalCode || '',
          phoneNumber: updatedUser.phoneNumber || '',
          recipientName: updatedUser.displayName || '',
        });
        console.log('Context should be updated with:', form);
        setDisabled(false);
        toast.success('Your Information Updated Successfully');
        console.log('Form Submitted', form);
      }
    } catch (error) {
      toast.error('An error occurred while updating your information');
    }
  };
  return (
    <div className="flex flex-col mt-20">
      <h1 className="text-2xl poppins pb-4 border-b border-gray-500 text-gray-700 text-center">
        Edit Delivery Details
      </h1>
      <form className="my-4" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-3">
          <TextField
            type="text"
            placeholder="Recipient Name"
            name="recipientName"
            value={form.recipientName}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            placeholder="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />

          <button className="w-full px-6 py-3 rounded-lg bg-primary text-white poppins ring-red-300 focus:ring-4 transition duration-500">
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryForm;
