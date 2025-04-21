"use client";

import { useState } from 'react';
import SingleUploadForm from './SingleUploadForm';
import MultipleUploadForm from './MultipleUploadForm';

type TabType = 'single' | 'multiple';

export default function UploadTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('single');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex" aria-label="Tabs">
          <button
            onClick={() => handleTabChange('single')}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'single'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-current={activeTab === 'single' ? 'page' : undefined}
            aria-label="Single upload tab"
            tabIndex={0}
          >
            Single Upload
          </button>
          <button
            onClick={() => handleTabChange('multiple')}
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'multiple'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-current={activeTab === 'multiple' ? 'page' : undefined}
            aria-label="Multiple upload tab"
            tabIndex={0}
          >
            Bulk Upload (Excel)
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === 'single' ? (
          <SingleUploadForm />
        ) : (
          <MultipleUploadForm />
        )}
      </div>
    </div>
  );
} 