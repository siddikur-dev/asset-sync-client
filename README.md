# AssetVerse
![AssetVerse Screenshot](https://i.ibb.co/Kp3bghpR/asset-verse.png)

[![Live Website](https://img.shields.io/badge/Live%20Demo-asset--verse.web.app-brightgreen?style=for-the-badge&logo=google-chrome)](https://asset-verse.web.app/)

**Live Site:** [https://asset-verse.web.app/](https://asset-verse.web.app/)

---

## 🚀 Project Overview

**AssetVerse** is a comprehensive B2B (Business-to-Business) HR & Asset Management Web Application designed to help companies efficiently manage their physical assets (laptops, keyboards, chairs, etc.) and track which employee has which equipment. It solves the common problem of companies losing track of valuable assets and streamlines the entire asset management process.

### Key Benefits:
- **Prevents asset loss** and improves accountability
- **Streamlines asset assignment** and return processes
- **Provides clear visibility** into company asset inventory
- **Reduces administrative overhead** for HR departments
- **Ensures proper tracking** of returnable vs non-returnable items

---

## 🌟 Key Features

### For HR Managers:
- **Asset Management**: Add, edit, delete, and track company assets
- **Request Management**: Approve/reject employee asset requests
- **Employee Management**: View and manage affiliated employees
- **Package Management**: Upgrade subscription packages with Stripe payment
- **Analytics Dashboard**: View asset distribution and top requested assets with Recharts
- **Direct Assignment**: Assign assets directly to already-affiliated employees

### For Employees:
- **Asset Viewing**: View all assigned assets from all companies
- **Asset Requests**: Request new assets from multiple companies
- **Team View**: View team members per company with upcoming birthdays
- **Asset Returns**: Return returnable assets (optional)
- **PDF Reports**: Generate and print asset reports

### System Features:
- **Role-Based Access Control**: Separate dashboards for HR and Employees
- **Multi-Company Support**: Employees can work with multiple companies simultaneously
- **Auto-Affiliation**: Employees automatically affiliated when HR approves first request
- **Package Limits**: Enforced employee limits per subscription package
- **Real-time Updates**: Instant updates on asset availability and assignments
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

---

## 🛠️ Tech Stack & Main Packages

| Package                        | Purpose/Description                                 |
| ------------------------------ | --------------------------------------------------- |
| **React**                      | UI library for building interactive interfaces      |
| **Vite**                       | Fast build tool and dev server                      |
| **@tanstack/react-query**      | Data fetching, caching, and state management        |
| **recharts**                   | Beautiful, customizable charts and graphs           |
| **react-hook-form**            | Form state management and validation                |
| **axios**                      | Promise-based HTTP client for API requests          |
| **firebase**                   | Authentication and backend integration              |
| **@stripe/stripe-js**          | Stripe payment integration                         |
| **@stripe/react-stripe-js**    | React bindings for Stripe                          |
| **react-to-print**             | PDF generation for asset reports                    |
| **tailwindcss** & **daisyui**  | Utility-first CSS and UI components                 |
| **framer-motion**              | Animations and transitions                          |
| **react-icons**                | Popular icon packs for React                        |
| **sweetalert2**                | Beautiful, responsive alerts and modals             |

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/asset-verse-client.git
cd asset-verse-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory and add the following:

```env
VITE_apiKey=your-firebase-api-key
VITE_authDomain=your-firebase-auth-domain
VITE_projectId=your-firebase-project-id
VITE_storageBucket=your-firebase-storage-bucket
VITE_messagingSenderId=your-firebase-messaging-sender-id
VITE_appId=your-firebase-app-id
VITE_API_URL=your-backend-api-url
VITE_IMGBB_API_KEY=your-imgbb-api-key
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
```

### 4. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

---

## 📁 Project Structure

```
asset-verse-client/
  ├── public/                # Static assets
  ├── src/
  │   ├── assets/            # Images, logos, animations
  │   ├── components/        # Reusable UI components
  │   │   ├── homePage/      # Home page sections
  │   │   ├── shared/        # Shared components (Navbar, Footer)
  │   │   └── ui/            # UI components (Button, Spinner)
  │   ├── context/           # React context providers
  │   ├── firebase/          # Firebase config
  │   ├── hooks/             # Custom React hooks
  │   ├── layout/            # Layout components
  │   ├── pages/             # Page components
  │   │   ├── auth/          # Authentication pages
  │   │   ├── dashboard/     # Dashboard pages
  │   │   │   ├── hr/        # HR dashboard pages
  │   │   │   └── employee/  # Employee dashboard pages
  │   │   └── home/          # Home page
  │   ├── routes/            # Route definitions and guards
  │   └── utils/             # Utility functions
  ├── package.json
  └── vite.config.js
```

---

## 🔐 Authentication

### Registration:
- **HR Manager**: Register with company details (name, logo), gets default Basic package (5 employees)
- **Employee**: Self-register with personal details, initially unaffiliated

### Login:
- Email & Password authentication
- Google Social Login (with role selection for new users)

---

## 📊 Dashboard Features

### HR Dashboard:
1. **Asset List**: View all company assets with search, filter, and pagination
2. **Add Asset**: Add new assets with image upload (ImgBB)
3. **All Requests**: View and approve/reject employee requests
4. **Employee List**: View affiliated employees with asset counts
5. **Upgrade Package**: Upgrade subscription with Stripe payment
6. **Analytics**: View asset distribution (Pie chart) and top requested assets (Bar chart)

### Employee Dashboard:
1. **My Assets**: View all assigned assets with search, filter, and return functionality
2. **Request Asset**: Browse and request available assets from all companies
3. **My Team**: View team members per company with upcoming birthdays
4. **Profile**: Update personal information and view company affiliations

---

## 🎨 Design Features

- **Professional UI**: Clean, modern design with proper spacing and alignment
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **DaisyUI Components**: Consistent UI components throughout
- **Smooth Animations**: Framer Motion animations for better UX
- **Color Contrast**: Pleasing color scheme with proper visual hierarchy

---

## 🚀 Deployment

The application is deployed on Firebase Hosting. To deploy:

```bash
npm run build
firebase deploy
```

---

## 🤝 Contributing

Contributions are welcome! Please open issues or pull requests for suggestions, bug fixes, or improvements.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/)
- [Firebase](https://firebase.google.com/)
- [Stripe](https://stripe.com/)
- And all other amazing open-source libraries used!

---

> **AssetVerse** – Efficiently manage your corporate assets, one asset at a time.
