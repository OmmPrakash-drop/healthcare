# Healthcare Support Web Application

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

## Setup Instructions

### 1. Clone/Extract the project

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in server folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Start frontend:
```bash
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Project Structure

```
healthcare-support/
├── server/
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Volunteer.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── patientRoutes.js
│   │   ├── volunteerRoutes.js
│   │   ├── contactRoutes.js
│   │   └── chatbotRoutes.js
│   ├── controllers/
│   │   ├── patientController.js
│   │   ├── volunteerController.js
│   │   ├── contactController.js
│   │   └── chatbotController.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Environment Variables

### Server (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/healthcare
GEMINI_API_KEY=your_gemini_api_key_here
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/patient | Submit patient support request |
| POST | /api/volunteer | Register as volunteer |
| POST | /api/contact | Submit contact form |
| POST | /api/chatbot | AI chatbot message |

## Features

- Landing Page with hero, features, how it works, testimonials
- Patient Support Form
- Volunteer Registration Form
- Contact Form
- AI Chatbot (Gemini-powered)
- Responsive design
- Form validation
- MongoDB storage

## Tech Stack

**Frontend:**
- React.js + Vite
- Tailwind CSS
- React Router DOM

**Backend:**
- Node.js
- Express.js
- Mongoose

**Database:**
- MongoDB

**AI:**
- Google Gemini API