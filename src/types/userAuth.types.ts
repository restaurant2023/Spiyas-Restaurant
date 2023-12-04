export type UserAuthType = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
};

export type UserType = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  role: string;
  address?: string;
  postalCode?: string;
  phoneNumber?: string;
};
