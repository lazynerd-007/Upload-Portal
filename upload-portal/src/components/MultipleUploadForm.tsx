"use client";

import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import { updateMultipleMerchants } from '../api/merchant';
import { MerchantData } from '../types';
import ExcelTemplateDownload from './ExcelTemplateDownload';
import ResponseDialog from './ResponseDialog';

type DialogState = {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
};

export default function MultipleUploadForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [previewData, setPreviewData] = useState<MerchantData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    
    // Read and preview Excel file
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json<MerchantData>(worksheet);
        
        // Show first 5 rows as preview
        setPreviewData(jsonData.slice(0, 5));
      } catch (error) {
        setDialogState({
          isOpen: true,
          title: 'Invalid File',
          message: 'The Excel file format is invalid. Please check the file and try again.',
          type: 'error',
        });
        resetFileInput();
      }
    };
    
    reader.readAsArrayBuffer(file);
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFileName('');
    setPreviewData([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fileInputRef.current?.files?.[0]) {
      setDialogState({
        isOpen: true,
        title: 'Missing File',
        message: 'Please select an Excel file before uploading.',
        type: 'error',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const file = fileInputRef.current.files[0];
      const response = await updateMultipleMerchants(file);
      
      if (response.success) {
        setDialogState({
          isOpen: true,
          title: 'Upload Successful',
          message: 'Your merchants were successfully updated.',
          type: 'success',
        });
        resetFileInput();
      } else {
        setDialogState({
          isOpen: true,
          title: 'Upload Failed',
          message: response.message || 'Failed to update merchants. Please try again.',
          type: 'error',
        });
      }
    } catch (error) {
      setDialogState({
        isOpen: true,
        title: 'Error',
        message: 'An unexpected error occurred. Please try again later.',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="excelFile" className="block text-sm font-medium text-gray-700">
              Upload Excel File
            </label>
            <div className="mt-1 flex items-center">
              <input
                id="excelFile"
                ref={fileInputRef}
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="sr-only"
                aria-label="Upload Excel file"
              />
              <label
                htmlFor="excelFile"
                className="cursor-pointer rounded-md bg-white py-2 px-3 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Choose file
              </label>
              <span className="ml-3 text-sm text-gray-500">
                {fileName || 'No file selected'}
              </span>
              {fileName && (
                <button
                  type="button"
                  onClick={resetFileInput}
                  className="ml-2 text-sm text-red-600 hover:text-red-800"
                  aria-label="Remove file"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Upload Excel file (.xlsx, .xls) with merchant data
            </p>
            <ExcelTemplateDownload />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || !fileName}
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Upload"
            >
              {isLoading ? 'Uploading...' : 'Upload Merchants'}
            </button>
          </div>
        </form>

        {previewData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700">Data Preview (First 5 rows)</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(previewData[0]).map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {previewData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row).map((value, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          {value as string}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700">Excel Template Format</h3>
          <p className="mt-1 text-xs text-gray-500">
            Your Excel file should have the following columns:
          </p>
          <ul className="mt-1 list-disc list-inside text-xs text-gray-500 pl-4">
            <li>contactPersonName</li>
            <li>contactPersonEmail</li>
            <li>contactPersonPhone</li>
            <li>contactPersonRelation</li>
            <li>incorporationDate (YYYY-MM-DD format)</li>
            <li>merchantId (required to identify merchants)</li>
          </ul>
        </div>
      </div>

      <ResponseDialog
        isOpen={dialogState.isOpen}
        onClose={handleCloseDialog}
        title={dialogState.title}
        message={dialogState.message}
        type={dialogState.type}
      />
    </>
  );
} 