"use client";

import { useState } from 'react';
import * as XLSX from 'xlsx';

export default function ExcelTemplateDownload() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadTemplate = () => {
    setIsGenerating(true);
    
    try {
      // Define column headers with clear naming
      const headers = [
        'merchantId',
        'contactPersonName',
        'contactPersonEmail',
        'contactPersonPhone',
        'contactPersonRelation',
        'incorporationDate'
      ];
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      
      // Create a worksheet with just the headers first
      // This ensures headers are clearly separated
      const ws = XLSX.utils.aoa_to_sheet([headers]);
      
      // Add data rows
      const data = [
        [
          '1480000493',
          'John Doe',
          'john.doe@example.com',
          '+2348012345678',
          'CEO',
          '2022-05-15'
        ],
        [
          '1480000789',
          'Jane Smith',
          'jane.smith@example.com',
          '0592345678',
          'Manager',
          '2023-01-20'
        ],
        [
          '', // Empty row template for user data
          '',
          '',
          '',
          '',
          ''
        ]
      ];
      
      // Append the data starting from row 1 (after headers)
      XLSX.utils.sheet_add_aoa(ws, data, { origin: 1 });
      
      // Set column widths for better readability
      const columnWidths = [
        { wch: 15 }, // merchantId
        { wch: 25 }, // contactPersonName
        { wch: 30 }, // contactPersonEmail
        { wch: 20 }, // contactPersonPhone
        { wch: 20 }, // contactPersonRelation
        { wch: 18 }, // incorporationDate
      ];
      
      ws['!cols'] = columnWidths;
      
      // Style headers - make them bold and add background color
      // Removing unused range variable
      // const range = { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } };
      
      // Set header row height
      if (!ws['!rows']) ws['!rows'] = [];
      ws['!rows'][0] = { hpt: 25 }; // Set height for header row
      
      // Format date cell specifically
      const dateCellRef = XLSX.utils.encode_cell({ r: 1, c: 5 }); // Second row, sixth column (incorporationDate)
      if (ws[dateCellRef]) {
        ws[dateCellRef].z = 'yyyy-mm-dd'; // Set date format
      }
      
      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, ws, 'MerchantData');
      
      // Generate Excel file
      XLSX.writeFile(workbook, 'merchant-template.xlsx');
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
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleDownloadTemplate();
          }
        }}
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
      <p className="mt-1 text-xs text-gray-500">
        Download a template with the exact columns needed for bulk merchant updates
      </p>
    </div>
  );
} 