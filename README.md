# Contact Management Web App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing contacts with a clean, modern UI.

## Features

✅ **Contact Form**
- Name (required), Email (required with validation), Phone (required), Message (optional)
- Client-side validation with real-time error messages
- Submit button disabled when form is invalid
- Success notifications

✅ **Backend API**
- POST `/api/contacts` - Create a new contact
- GET `/api/contacts` - Fetch all contacts
- DELETE `/api/contacts/:id` - Delete a contact

✅ **Contact Display**
- List/table view of all contacts
- Dynamic updates without page reload
- Responsive design for all devices

✅ **Bonus Features**
- Delete contact with confirmation
- Success/error messages
- Sorting by name or date
- Clean, modern UI with Tailwind CSS

## Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hooks** - State management (useState, useEffect)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Project Structure

```
contact/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js  # Contact CRUD operations
│   ├── models/
│   │   └── Contact.js            # Contact schema
│   ├── routes/
│   │   └── contacts.js           # Contact routes
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling middleware
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx   # Contact form component
│   │   │   └── ContactList.jsx   # Contact list component
│   │   ├── services/
│   │   │   └── api.js            # API service functions
│   │   ├── App.jsx               # Main app component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── PROJECT_PHASES.md             # Project phase breakdown
└── README.md                     # This file
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

### 1. Clone or Navigate to Project Directory
```bash
cd contact
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contactapp
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contactapp
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

**Local MongoDB:**
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**Or use MongoDB Atlas (Cloud)** - No local setup needed!

### 5. Run the Application

#### Option A: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:3000`

#### Option B: Install Concurrently (Recommended)

Install concurrently globally:
```bash
npm install -g concurrently
```

Create a root `package.json`:
```json
{
  "name": "contact-app",
  "scripts": {
    "dev": "concurrently \"npm run dev --prefix backend\" \"npm run dev --prefix frontend\"",
    "install-all": "npm install --prefix backend && npm install --prefix frontend"
  }
}
```

Then run:
```bash
npm run dev
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Create Contact
```
POST /contacts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, this is a test message"
}
```

#### Get All Contacts
```
GET /contacts
```

#### Delete Contact
```
DELETE /contacts/:id
```

## Usage

1. **Add a Contact:**
   - Fill in the contact form (Name, Email, Phone are required)
   - Message field is optional
   - Click "Submit Contact"
   - See success message and contact added to the list

2. **View Contacts:**
   - All contacts are displayed in a table below the form
   - Contacts are sorted by date (newest first) by default

3. **Sort Contacts:**
   - Click "Sort by Name" or "Sort by Date" buttons
   - Toggle ascending/descending order

4. **Delete Contact:**
   - Click the "Delete" button next to any contact
   - Confirm deletion in the popup
   - Contact is removed from the list

## Validation Rules

- **Name:** Required, minimum 2 characters
- **Email:** Required, valid email format
- **Phone:** Required, valid phone format (at least 10 digits)
- **Message:** Optional

## Development

### Backend Scripts
```bash
cd backend
npm start        # Start server
npm run dev      # Start with nodemon (auto-reload)
```

### Frontend Scripts
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if using local)
- Check `.env` file has correct `MONGODB_URI`
- For MongoDB Atlas, ensure your IP is whitelisted

### Port Already in Use
- Change `PORT` in backend `.env`
- Update proxy in `frontend/vite.config.js` if needed

### CORS Errors
- Ensure backend has CORS enabled (already configured)
- Check that backend is running before starting frontend

## License

This project is open source and available under the MIT License.

