<div align="center">

![Asset Sync Logo](https://i.ibb.co/Kp3bghpR/asset-verse.png)

# Asset Sync: Enterprise Asset Management System

[![Live Website](https://img.shields.io/badge/Live%20Demo-asset--verse.web.app-brightgreen?style=for-the-badge&logo=google-chrome)](https://asset-verse.web.app/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

**Live Site:** [https://asset-verse.web.app/](https://asset-verse.web.app/)

</div>

## Table of Contents

- [Project Overview](#project-overview)
- [Business Value](#business-value)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation & Setup](#installation--setup)
- [Project Architecture](#project-architecture)
- [API Documentation](#api-documentation)
- [Authentication & Authorization](#authentication--authorization)
- [Deployment](#deployment)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

## Project Overview

**Asset Sync** is an enterprise-grade B2B HR & Asset Management Web Application designed to streamline corporate asset tracking and management. The platform provides a comprehensive solution for companies to efficiently manage physical assets (laptops, keyboards, chairs, etc.) and maintain accurate records of asset assignments to employees.

### Business Problem Solved

- **Asset Loss Prevention**: Eliminates the common problem of misplaced or untracked company assets
- **Operational Efficiency**: Reduces manual tracking overhead for HR departments
- **Audit Compliance**: Maintains detailed records for financial and compliance audits
- **Cost Optimization**: Improves asset utilization and reduces unnecessary purchases

## Business Value

| Metric | Impact |
|--------|--------|
| **Asset Visibility** | 100% tracking of all company assets |
| **Administrative Efficiency** | 60% reduction in asset management overhead |
| **Employee Accountability** | Clear ownership and responsibility tracking |
| **Cost Savings** | Reduced asset loss and improved utilization |

## Key Features

### 👥 Role-Based Access Control

#### For HR Managers:
- **Asset Lifecycle Management**: Complete CRUD operations for company assets
- **Request Workflow System**: Streamlined approval/rejection process for employee requests
- **Team Management**: View and manage affiliated employees with detailed analytics
- **Subscription Management**: Tiered package system with Stripe payment integration
- **Business Intelligence**: Interactive analytics dashboard with Recharts visualizations
- **Direct Asset Assignment**: Bypass request workflow for existing employees

#### For Employees:
- **Multi-Company Support**: Work with assets from multiple employers simultaneously
- **Asset Request Portal**: Browse and request available assets across companies
- **Team Collaboration**: View team members with birthday notifications and contact info
- **Asset Reporting**: Generate PDF reports for personal asset inventory
- **Return Management**: Self-service asset return process

### 🏢 System Capabilities

- **Multi-Tenant Architecture**: Secure data isolation between companies
- **Real-Time Synchronization**: Instant updates across all connected clients
- **Automated Affiliation**: Smart employee-company relationship management
- **Package Enforcement**: Dynamic employee limits based on subscription tiers
- **Responsive Design**: Optimized experience across all device form factors

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | Core UI framework with hooks and context |
| **Vite** | 5.0.0 | Next-generation build tool and dev server |
| **TypeScript** | 5.0.0 | Type-safe JavaScript development |
| **TanStack Query** | 4.0.0 | Server state management and data fetching |
| **React Hook Form** | 7.0.0 | Form state management with validation |
| **Recharts** | 2.0.0 | Data visualization and charting library |
| **Tailwind CSS** | 3.0.0 | Utility-first CSS framework |
| **DaisyUI** | 4.0.0 | Component library built on Tailwind |
| **Framer Motion** | 10.0.0 | Production-ready animations library |

### Backend & Services

| Service | Purpose |
|---------|---------|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | RESTful API framework |
| **MongoDB** | NoSQL database for scalable data storage |
| **Firebase Auth** | Authentication and user management |
| **Stripe** | Payment processing and subscription management |
| **ImgBB** | Cloud image hosting and optimization |

### Development Tools

| Tool | Purpose |
|------|---------|
| **ESLint** | Code quality and consistency |
| **Prettier** | Code formatting and style |
| **Git** | Version control and collaboration |
| **Firebase Hosting** | Production deployment and CDN |

## Installation & Setup

### Prerequisites

- Node.js 18.0+ and npm
- MongoDB database connection
- Firebase project configuration
- Stripe account for payment processing

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/your-username/asset-verse-client.git
cd asset-verse-client

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Firebase Configuration
VITE_apiKey=your-firebase-api-key
VITE_authDomain=your-firebase-auth-domain
VITE_projectId=your-firebase-project-id
VITE_storageBucket=your-firebase-storage-bucket
VITE_messagingSenderId=your-firebase-messaging-sender-id
VITE_appId=your-firebase-app-id

# API Configuration
VITE_API_URL=http://localhost:3000
VITE_IMGBB_API_KEY=your-imgbb-api-key

# Payment Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
```

### 3. Development Server

```bash
# Start the development server
npm run dev

# Application will be available at:
# http://localhost:5173 (or as shown in terminal)
```

### 4. Production Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## Project Architecture

### Directory Structure

```
asset-verse-client/
├── public/                     # Static assets and icons
├── src/
│   ├── assets/                 # Images, logos, and media files
│   ├── components/             # Reusable UI components
│   │   ├── homePage/          # Landing page sections
│   │   ├── shared/            # Cross-page components
│   │   └── ui/                # Base UI components
│   ├── context/               # React context providers
│   ├── firebase/              # Firebase configuration
│   ├── hooks/                 # Custom React hooks
│   ├── layout/                # Layout wrapper components
│   ├── pages/                 # Route-based page components
│   │   ├── auth/              # Authentication flows
│   │   ├── dashboard/         # Dashboard implementations
│   │   │   ├── hr/            # HR-specific features
│   │   │   └── employee/      # Employee features
│   │   └── home/              # Landing page
│   └── utils/                 # Utility functions and helpers
├── .env.example               # Environment template
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configuration
```

### Component Architecture

The application follows a modular component architecture with clear separation of concerns:

- **Presentational Components**: Pure UI components without business logic
- **Container Components**: Smart components that manage state and data fetching
- **Layout Components**: Page structure and navigation
- **Shared Components**: Reusable components across multiple pages

## API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | User registration with role assignment |
| GET | `/users/me` | Get current user profile |
| GET | `/users/:email` | Get user information by email |

### Asset Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/assets` | Retrieve assets with filtering |
| POST | `/assets` | Create new asset (HR only) |
| PUT | `/assets/:id` | Update asset information |
| DELETE | `/assets/:id` | Remove asset (HR only) |

### Payment Processing

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/create-checkout-session` | Initialize Stripe checkout |
| GET | `/payments/session/:id` | Verify payment status |

## Authentication & Authorization

### User Roles

1. **HR Manager**: Full access to company assets and employee management
2. **Employee**: Limited access to personal assets and request functionality

### Security Features

- **JWT Token Authentication**: Secure session management
- **Role-Based Access Control**: Granular permission system
- **Firebase Integration**: Enterprise-grade authentication
- **API Security**: Request validation and sanitization

## Deployment

### Production Deployment

The application is deployed on Firebase Hosting with automatic CI/CD:

```bash
# Build for production
npm run build

# Deploy to Firebase
firebase deploy
```

### Environment Configuration

- **Development**: Local development with hot reload
- **Staging**: Preview environment for testing
- **Production**: Optimized build with CDN distribution

## Contributing Guidelines

### Development Workflow

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards

- Follow ESLint configuration for code quality
- Use Prettier for consistent formatting
- Write meaningful commit messages
- Include tests for new features
- Update documentation for API changes

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for efficient asset management**

[![Asset Sync](https://img.shields.io/badge/Asset Sync-Enterprise%20Asset%20Management-4B5BFF?style=for-the-badge)](https://asset-verse.web.app/)

> **Asset Sync** – Transforming corporate asset management through innovative technology

</div>
