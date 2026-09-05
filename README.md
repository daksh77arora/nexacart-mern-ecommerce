# NexaCart — Full-Stack MERN E-Commerce App

Built and maintained by Daksh Arora.

NexaCart is a production-style e-commerce platform built with the MERN stack. It includes user authentication, product browsing, cart management, checkout flow, admin product management, order tracking, refund requests, and Razorpay integration.

---

## Project Overview

This project is designed to work as a strong portfolio or interview-ready full-stack application.

### Core Stack

- Frontend: React + React Router + Redux Toolkit + CRA
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Auth: Clerk + verified Clerk sessions
- Payments: Razorpay
- File/Image Uploads: Cloudinary + Multer

### Key Features

- User registration and login
- Product listing and detail pages
- Cart and checkout flow
- Order creation and order history
- Admin dashboard for products and orders
- Role-based access control for admin users
- Payment order creation with Razorpay test keys

---

## Local Setup

### Prerequisites

1. Install Node.js 18+
2. Install MongoDB locally and run it on:
   `mongodb://127.0.0.1:27017/nexacart`
3. Ensure the backend `.env` file exists with the required keys

### Environment Variables

The app expects the following values in `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/nexacart
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
RAZORPAY_KEY_ID=rzp_test_TYRktrmAurrml7
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:3000
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

> The Razorpay values shown are test credentials for local development and demo use. These are required only for real checkout initialization.

---

## Running the Project

From the project root:

```bash
npm install
npm run seed
npm run dev
```

This starts:

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

If port 3000 is occupied, the frontend can be started manually with:

```bash
cd frontend
PORT=3001 npm start
```

---

## Database Seed Data

The seed script populates sample products and creates an admin user.

Admin login credentials:

- Email: `admin@nexacart.com`
- Password: `password123`

This is useful for admin demo flow and testing the dashboard.

---

## API Keys You May Need

### Frontend authentication

The frontend uses Create React App, so the publishable key must be stored in `frontend/.env` with the `REACT_APP_` prefix:

```env
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
```

The backend uses:

```env
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key
```

After a successful Clerk sign-in, the backend verifies the session and creates or updates the matching user in MongoDB. Clerk remains responsible for passwords and email verification; MongoDB stores the application profile, Clerk ID, and admin role.

### Required for local checkout

These are the only keys that matter for the payment flow:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

They are read in `backend/controllers/paymentController.js` when creating a Razorpay order.

### Optional for email features

- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`

These are used by the email utility for notifications.

### Optional for deployment

- `NODE_ENV`
- `FRONTEND_URL`

These help control runtime behavior between development and production setup.

---

## Important Notes

- MongoDB must be running before starting the app.
- The project uses a local MongoDB database at `mongodb://127.0.0.1:27017/nexacart`.
- If the Razorpay keys are missing, the app can still be used in a demo-safe fallback mode, but real checkout will not work without valid keys.
- Sensitive files such as `.env` are intentionally ignored by Git for safety.

---

## Deployment Notes

The backend serves the production frontend build when `NODE_ENV=production` is set, which makes deployment simpler for a single-host setup.

### Render Configuration

- Root directory: leave blank
- Build command: `npm run render-build`
- Start command: `npm start`
- Add the environment variables listed above in Render's Environment settings
- Set `NODE_ENV=production`
- Use a MongoDB Atlas connection string instead of the local MongoDB URI

Typical deployment flow:

1. Host the repo on GitHub
2. Deploy the backend on Render / Railway / VPS
3. Set environment variables in the hosting platform
4. Build the frontend before deployment

---

## Postman Collection

The repository includes a Postman export file: `NexaCart_Postman_Collection.json`.

Import it into Postman to test:

- Authentication
- Product APIs
- Order APIs
- Admin actions
- Payment endpoints

---

## Project Status

This project is fully set up for local development and interview/demo workflows with working seed data, admin access, and a test-payment-ready backend configuration.
