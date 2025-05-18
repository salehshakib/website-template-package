import { IBusiness } from "./business.types";

export interface IDomainByBusinessId {
  _id: string;
  name: string;
  autoRenewal: boolean;
  businessId: string;
  duration: string;
  registrationDate: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPriceModification {
  modificationType: "Premium" | "Discount";
  amount: number;
}

interface MapLocation {
  latitude: number;
  longitude: number;
}

export type TGoldPriceData = {
  bid: number;
  ask: number;
  high: number;
  low: number;
  timestamp: number;
};

// 1) Union of all your price-field names
export type PriceField =
  | "jewellery22k"
  | "gold9999Gm"
  | "tenTola"
  | "gold9999Kg"
  | "kilobar995"
  | "askPriceModification"
  | "bidPriceModification";

// 2) Record that maps each one to your modification type
export type PriceModifications = Record<PriceField, IPriceModification>;

// supporting types
export interface Domain {
  name: string;
  registrar: "Identity" | "Other";
  dnsConfigured: boolean;
  vercelConfigured: boolean;
  _id: string;
}

export interface AppUrl {
  android: null;
  ios: null;
  _id: string;
}

export interface Status {
  android: string;
  ios: string;
}

interface IBase {
  _id: string;
  id: string;
  templateInfo: {
    _id: string;
    id: string;
    templateName: string;
    category: "Website";
    __v: 0;
  };
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  businessInfo: IBusiness;
}
export interface IWebsite extends IBase, PriceModifications {
  domain: Domain;
}

export interface IMobileApps extends IBase, PriceModifications {
  appUrl: AppUrl;
}

export interface IGoogleBusiness {
  mapLocation: MapLocation;
  _id: string;
  businessId: string;
  businessName: string;
  businessDescription: string;
  photos: string[];
  businessCategory: string;
  address: string;
  phone: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  businessWebsite: string;
  businessStatus: string;
  businessRole: string;
  businessProfilePhoto: string;
  businessDocumentType: string;
  businessDocumentId: string;
  businessDocumentFront: string;
  businessDocumentBack: string;
  businessBid: string;
}

export interface ITemplate {
  _id: string;
  id: string;
  templateName: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ITemplateProps {
  webInfo: IWebsite;
  goldPriceData?: TGoldPriceData[];
}
