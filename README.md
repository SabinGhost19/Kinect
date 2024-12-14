# Kinect - Centralized and Simplified Profile Sharing

web application designed to centralize and simplify the sharing of contact information and profiles across various platforms

## Tech Stack

- **Backend**: TypeScript with a REST API and full CRUD operations.
- **Frontend**: React + TypeScript styled with **Tailwind CSS**.
- **Database**: MongoDB data storage.
- **Authentication**: JWT (JSON Web Token) for secure user authentication

## Features

- **Profile Creation**: Users can create accounts and set up profiles with a profile picture, description, and multiple contact methods like email, phone, or social media links
- **QR Code Generation**: Each profile has a unique QR code for fast and easy sharing
- **Contact Centralization**: Profiles consolidate contact and platform details in one location for better accessibility
- **Customizable Profiles**: Users can add, edit, or remove profile information as needed
- **Modern UI**: Developed with React and Tailwind CSS for a responsive and user-friendly interface

## How It Works

1. Users register, authenticate, and set up their profiles
2. Profiles include contact details, links, and an auto-generated QR code
3. The QR code provides direct access to the user’s profile
4. Profiles can be shared easily with anyone

## Example Use Cases

- **Personal**: Share your LinkedIn, email, and phone number with colleagues or friends via a single QR code
- **Professional**: Centralize all your platform links (e.g., GitHub, Portfolio, Social Media) for easier client access

## Setup and Run Locally

### 1. Clone the repository:
```bash
git clone <repository-url>
cd ProfileHub
```

Create a .env file in the root directory and add:
```bash
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```
