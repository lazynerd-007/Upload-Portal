import axios from 'axios';
import { MerchantData, ApiResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://staging-api.blupaytms.com/api/v1';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'PESWA-Wj0LY9mZXLXaxG6DrIZ1kX0xcHQoXxPTPfPZyU44jok';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  },
});

export const updateMerchant = async (merchantId: string, data: MerchantData): Promise<ApiResponse> => {
  try {
    const response = await apiClient.put(`/merchant/update/${merchantId}`, data);
    return {
      success: true,
      message: 'Merchant updated successfully',
      statusCode: response.status,
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Failed to update merchant',
        statusCode: error.response.status,
        errors: error.response.data.errors || []
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
      statusCode: 500
    };
  }
};

export const updateMultipleMerchants = async (file: File): Promise<ApiResponse> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await apiClient.post('/merchant/update-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return {
      success: true,
      message: 'Merchants updated successfully',
      statusCode: response.status,
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Failed to update merchants',
        statusCode: error.response.status,
        errors: error.response.data.errors || []
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
      statusCode: 500
    };
  }
}; 