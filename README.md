# **Scholarship Management System**

## **Overview**

The **Scholarship Management System** is a web application designed to streamline the process of managing scholarships for college and university students. It enables students to view available scholarships, apply, and track their applications, while providing administrators with tools to manage scholarship applications effectively.

## **Live Project**

[Scholarship Management System](https://scholarshipsite.netlify.app)

## **Screenshot**

![Scholarship Management System](https://i.ibb.co.com/tMCTCp18/scholarship2.png)

## **Technologies Used**

- **Frontend:** React.js, Vite, Tailwind CSS, DaisyUI
- **Backend:** Firebase Authentication
- **Payment Processing:** Stripe
- **State Management:** TanStack Query
- **UI Enhancements:** SweetAlert2, React Icons

## **Core Features**

✅ View available scholarships  
✅ Apply for scholarships  
✅ Track application status  
✅ Secure authentication using Firebase  
✅ Payment processing with Stripe

## **Dependencies Used**

- `react`, `react-dom`
- `react-router-dom`
- `firebase`
- `@tanstack/react-query`
- `@stripe/react-stripe-js`, `@stripe/stripe-js`

## **How to Run the Project Locally**

### **1. Clone the Repository**

```sh
git clone https://github.com/sharifulalam-dev/scholarshipclient.git
cd scholarship-management
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the project root and add the following variables:

```sh
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### **4. Start the Development Server**

```sh
npm run dev
```

The application should now be running at `http://localhost:5173/`.

## **Live Project**

- **Live Demo:** [Scholarship Management System](https://test-982fe.web.app)
