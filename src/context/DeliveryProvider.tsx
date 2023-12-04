import React, { createContext, useState, useEffect } from 'react';

interface DeliveryInputType {
  address: string;
  phoneNumber: string;
  recipientName: string;
  postalCode: string;
}

interface DeliveryContextType {
  input: DeliveryInputType;
  disabled: boolean;
  setInput: React.Dispatch<React.SetStateAction<DeliveryInputType>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultDeliveryContext: DeliveryContextType = {
  input: {
    address: '',
    phoneNumber: '',
    recipientName: '',
    postalCode: '',
  },
  disabled: true,
  setInput: () => {},
  setDisabled: () => {},
};

export const DeliveryContext = createContext<DeliveryContextType>(
  defaultDeliveryContext
);

interface DeliveryProviderProps {
  children: React.ReactNode;
}

const DeliveryProvider: React.FC<DeliveryProviderProps> = ({ children }) => {
  const [input, setInput] = useState<DeliveryInputType>({
    address: '',
    phoneNumber: '',
    recipientName: '',
    postalCode: '',
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    console.log('Current context input state:', input);
  }, [input]);

  const value = {
    input,
    disabled,
    setInput,
    setDisabled,
  };
  console.log(setInput);
  return (
    <DeliveryContext.Provider value={value}>
      {children}
    </DeliveryContext.Provider>
  );
};

export default DeliveryProvider;
