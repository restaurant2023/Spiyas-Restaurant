import { UserAuthType } from '../types/userAuth.types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebase/firebase.config';
import { UserType } from '../types/userAuth.types';
import { toast } from 'react-toastify';

export const createUserProfileDocument = async (
  user: UserAuthType | null,
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>
) => {
  if (!user) return undefined;

  const userRef = doc(firestore, `users/${user.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = user;
    const createdAt = new Date();
    const role = 'user';
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        role,
      });
    } catch (error) {
      console.error('Error creating user', error);
    }
  } else {
    const userData = snapShot.data();
    setUser({
      uid: user.uid,
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role,
    });
  }

  return userRef;
};

export const getUser = async (userId: string): Promise<UserType | null> => {
  try {
    const userRef = doc(firestore, `users/${userId}`);
    const snapShot = await getDoc(userRef);

    if (snapShot.exists()) {
      const userData = snapShot.data();
      return {
        uid: userId,
        displayName: userData.displayName,
        email: userData.email,
        role: userData.role,
        address: userData.address,
        postalCode: userData.postalCode,
        phoneNumber: userData.phoneNumber,
      } as UserType;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user', error);
    return null;
  }
};

interface UserFormData {
  address: string;
  postalCode: string;
  phoneNumber: string;
  recipientName: string;
}

export const saveOrUpdateUserData = async (
  userId: string,
  formData: UserFormData
) => {
  console.log(
    'Saving or updating user data for user:',
    userId,
    'Data:',
    formData
  );

  const userRef = doc(firestore, `users/${userId}`);
  try {
    await setDoc(userRef, formData, { merge: true });
    console.log('Data saved/updated successfully');
  } catch (error) {
    console.error('Error saving user data', error);
    toast.error('An error occurred while updating your information');
  }
};
