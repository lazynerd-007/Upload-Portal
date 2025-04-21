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
  data?: Record<string, unknown>;
  statusCode?: number;
  errors?: Array<{ message: string; [key: string]: unknown }>;
  status?: number;
} 