import {
  TBusinessDocTypes,
  TBusinessStatus,
} from "../constants/business.constants";

export interface UserProfilesItem {
  id: string;
  businessIds: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  country: string;
  profileImage: string;
  referralCode: null;
}
export interface SubscriptionsItem {
  product: Product;
  businessId: string;
  subscribed: boolean;
  subscriptionId: null;
  subscriptionStartDate: null;
  subscriptionEndDate: null;
  totalAmount: null;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  productImage: string;
}

export interface IBusiness {
  id: string;
  ownerId: string;
  name: string;
  website: string;
  status: TBusinessStatus;
  documentType: TBusinessDocTypes;
  role: string;
  profilePhoto: string;
  documentId: string;
  documentFront: string;
  documentBack: string;
  userProfiles: UserProfilesItem[];
  subscriptions: SubscriptionsItem[];
  bid: string;
  phone: string;
}
