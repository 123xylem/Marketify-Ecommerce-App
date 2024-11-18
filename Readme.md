Marketify - Ecommerce App
Marketify is a full-stack e-commerce application designed for both users and admins. It features an extensive authentication system, a responsive frontend for multiple viewports, and integration with popular payment systems like Stripe.

Features
Full Authentication System: Secure login and registration for users and admin.
Admin Panel: Admins can manage products, view orders, and update store settings.
Product Management: Ability to add, update, and delete products.
Cart and Checkout: Users can add items to their cart and proceed with checkout.
Payment Integration: Integrated with Stripe for handling payments securely.
Responsive Design: Optimized for multiple screen sizes.
Tech Stack
Frontend
ReactJS: A JavaScript library for building user interfaces.
Redux: State management for React applications.
Material UI: React components that implement Google's Material Design.
Backend
Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
Express.js: Web framework for Node.js to build RESTful APIs.
MongoDB: NoSQL database for storing products, user information, and orders.
Stripe: Payment gateway integration for handling transactions.
Getting Started
Prerequisites
Node.js (v14+)
MongoDB (for local development) or a MongoDB Atlas account
Stripe Account for payment processing
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/123xylem/Marketify-Ecommerce-App.git
cd Marketify-Ecommerce-App
Install backend dependencies:

bash
Copy code
cd backend
npm install
Install frontend dependencies:

bash
Copy code
cd frontend
npm install
Set up environment variables for both frontend and backend:

Create .env files in both the frontend and backend directories and add the necessary variables (e.g., MONGO_URI, STRIPE_SECRET_KEY).
Run the backend server:

bash
Copy code
cd backend
npm start
Run the frontend development server:

bash
Copy code
cd frontend
npm start
Open the app in your browser at http://localhost:3000.

Usage
Admin Dashboard: Accessible after login as an admin. Manage products, orders, and user data.
User Features: Users can browse products, add items to their cart, and checkout using Stripe.
Contributing
We welcome contributions! To contribute, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
ReactJS
Node.js
ExpressJS
MongoDB
Stripe
Material UI



Optimisations:
https://docs.google.com/spreadsheets/d/1gLrCL0gAWDsrZ189KZGL4mUkvLbqoEGv0Bd3UmXVJuQ/edit?pli=1&gid=0#gid=0
