"use client";

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ExcelTemplateDownload() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadTemplate = () => {
    setIsGenerating(true);
    
    try {
      // Create template data
      const templateData = [
        {
          merchantId: 'merchant-123',
          contactPersonName: 'John Doe',
          contactPersonEmail: 'john.doe@example.com',
          contactPersonPhone: '+1234567890',
          contactPersonRelation: 'CEO',
          incorporationDate: '2023-01-01'
        },
        {
          merchantId: 'merchant-456',
          contactPersonName: '',
          contactPersonEmail: '',
          contactPersonPhone: '',
          contactPersonRelation: '',
          incorporationDate: ''
        }
      ];
      
      // Create workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(templateData);
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, 'MerchantData');
      
      // Generate Excel file
      XLSX.writeFile(workbook, 'merchant-update-template.xlsx');
    } catch (error) {
      console.error('Failed to generate template:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleDownloadTemplate}
        disabled={isGenerating}
        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
        aria-label="Download Excel template"
        tabIndex={0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        {isGenerating ? 'Generating...' : 'Download Excel Template'}
      </button>
    </div>
  );
} 