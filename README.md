# DigitalMave

## DigitalMave - Creative freelancing platform

DigitalMave  is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to connect freelancers especially creatives and developers with clients in a seamless and efficient platform. Inspired by popular platforms like Dribble,and Behance, DigitalMaven offers a modern, minimalistic interface that makes freelancing more accessible.

## Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Features
-

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)
- npm

### Clone the Repository
```bash
git clone https://github.com/yourusername/DigitalMave.git
cd DigitalMave
```

### Backend (API)
1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
<!--3. Configure environment variables by creating a `.env` file in the `api` directory. Example:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```-->

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
<!--3. Configure environment variables by creating a `.env` file in the `frontend` directory. Example:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```-->

## Usage

### Running the Application
1. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```
2. Start the backend API:
   ```bash
   cd ../api
   npm run start
   ```

<!--The application should now be running with the frontend accessible at `http://localhost:5173` and the backend API at `http://localhost:5000`.-->

## Project Structure
```
DigitalMave/
│
├── api/                  # Backend (Express.js) API
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route handlers
│   └── server.js         # Entry point for the backend
│
├── frontend/             # Frontend (React) application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Pages and views
│   │   └── App.js        # Entry point for the frontend
│
└── README.md             # Project documentation
```

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: TBD

## Contribution
Chiamaka Emeti[github](https://github.com/Chiamablessing/DigitalMave)
