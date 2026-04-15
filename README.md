# Fresh Touch Event

Luxury event planning and decoration portfolio featuring a sophisticated gallery, service showcase, and a full-featured administration panel.

## Features

- **Dynamic Portfolio**: Manage your gallery and realizations directly from the admin panel.
- **Service Showcase**: Present your expertise with elegant design.
- **Admin Panel**: Secure access (Google Auth) to manage products, gallery, testimonials, and messages.
- **Contact System**: Integrated contact form with real-time message notifications for the admin.
- **Site Settings**: Customize your logo and social media links without touching the code.

## Tech Stack

- **React 19**
- **Vite**
- **Tailwind CSS**
- **Firebase** (Firestore, Storage, Auth)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

## Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Firebase Setup**:
   - Create a Firebase project.
   - Enable Firestore, Storage, and Google Authentication.
   - Create a `firebase-applet-config.json` in the root directory with your Firebase credentials:
     ```json
     {
       "apiKey": "YOUR_API_KEY",
       "authDomain": "YOUR_AUTH_DOMAIN",
       "projectId": "YOUR_PROJECT_ID",
       "storageBucket": "YOUR_STORAGE_BUCKET",
       "messagingSenderId": "YOUR_SENDER_ID",
       "appId": "YOUR_APP_ID"
     }
     ```
4. **Start the development server**: `npm run dev`

## Project Structure

- `pages/Admin.tsx`: The heart of the site management.
- `context/DataContext.tsx`: Handles all real-time data synchronization with Firebase.
- `firestore.rules`: Security rules for your database.
- `firebase-blueprint.json`: Data structure definition.
