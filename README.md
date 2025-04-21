# Merchant Upload Portal

A React application for updating merchant information individually or in bulk using an Excel spreadsheet.

## Features

- Update a single merchant's details via form submission
- Bulk update multiple merchants via Excel file upload
- Excel template download for bulk updates
- Data validation for both individual and bulk uploads
- Preview data from uploaded Excel files

## Technology Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form with Yup validation
- XLSX for Excel file handling
- Axios for API communication
- React Hot Toast for notifications

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd upload-portal
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=<your-api-url>
NEXT_PUBLIC_API_KEY=<your-api-key>
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

The application communicates with the following API endpoints:

### Single Merchant Update
- **URL**: `{API_URL}/merchant/update/:merchantId`
- **Method**: PUT
- **Auth**: Bearer token (API Key)
- **Body**:
```json
{
  "contactPersonName": "",
  "contactPersonEmail": "",
  "contactPersonPhone": "",
  "contactPersonRelation": "",
  "incorporationDate": ""
}
```

### Multiple Merchants Update
- **URL**: `{API_URL}/merchant/update-multiple`
- **Method**: POST
- **Auth**: Bearer token (API Key)
- **Body**: Excel file (multipart/form-data)

## Excel Template Format

The Excel file for bulk updates should contain the following columns:
- merchantId
- contactPersonName
- contactPersonEmail
- contactPersonPhone
- contactPersonRelation
- incorporationDate (YYYY-MM-DD format)

## Build

To build the application for production:
```bash
npm run build
```

## License

[MIT](LICENSE)
