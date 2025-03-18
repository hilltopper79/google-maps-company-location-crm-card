# Google Maps Company Location CRM Card

This project creates a custom CRM card for HubSpot that displays a company's location on Google Maps. When viewing a company record in HubSpot, the card will show a map of the company's location based on its address information.

## Overview

This card uses:
- HubSpot Private App API
- Google Maps JavaScript API
- Serverless architecture (deployable to Netlify or similar)

## Requirements

- A HubSpot account with admin access to create private apps
- A Google Maps API key
- Node.js and npm for local development
- A Netlify account (or similar) for deployment

## Setup Instructions

### Step 1: Clone this repository

```bash
git clone https://github.com/hilltopper79/google-maps-company-location-crm-card.git
cd google-maps-company-location-crm-card
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Create a HubSpot Private App

1. In your HubSpot account, go to Settings → Integrations → Private Apps
2. Click "Create private app"
3. Fill in the basic information:
   - App name: Google Maps Company Location
   - Description: Displays company locations on Google Maps
4. Set the required scopes:
   - `crm.objects.companies.read`
5. Create the app and copy your private app access token

### Step 4: Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create an API key and restrict it to your domains for security

### Step 5: Configure environment variables

Create a `.env` file in the root directory with:

```
HUBSPOT_API_KEY=your_hubspot_private_app_token
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Step 6: Deploy to Netlify

1. Create a Netlify account if you don't have one
2. Deploy your app to Netlify:
   - Connect your GitHub repository
   - Set the build command to `npm run build`
   - Set the publish directory to `dist`
   - Add your environment variables in the Netlify settings

Alternatively, you can use the Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify deploy
```

### Step 7: Create a CRM Card in HubSpot

1. In HubSpot, go to Settings → Properties → Create property
2. Select "Company" as the object type
3. Choose "CRM Card" as the field type
4. Set up the card:
   - Label: Company Location
   - URL: Your Netlify URL (e.g., https://your-app.netlify.app)
   - Location: Record sidebar
5. Save the card

## Usage

Once installed, the CRM card will appear in the sidebar of company records in HubSpot. If the company has address information, it will display a Google Map showing the location.

## Local Development

For local development, you can run:

```bash
npm run dev
```

This will start a local server at http://localhost:3000.

## Troubleshooting

- **Map not displaying**: Check that the company record has complete address information
- **API errors**: Verify your API keys are correctly set in the environment variables
- **Card not appearing**: Make sure the CRM card is configured correctly in HubSpot

## License

This project is open source and available under the MIT License.