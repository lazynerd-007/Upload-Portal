export interface MerchantData {
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  contactPersonRelation: string;
  incorporationDate: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
} 