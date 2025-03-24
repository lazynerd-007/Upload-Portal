"use client";

import { Toaster } from 'react-hot-toast';
import UploadTabs from '@/components/UploadTabs';

function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Merchant Upload Portal</h1>
            <p className="mt-2 text-sm text-gray-600">
              Update merchant information individually or in bulk using an Excel spreadsheet.
            </p>
          </div>
          
          <UploadTabs />
        </div>
      </div>
      <Toaster position="top-right" />
    </main>
  );
}

export default Home;
