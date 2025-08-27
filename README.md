# Frontend Technical Test - User Profile Management

A React application for managing user profiles built with TypeScript and Vite.

## 🚀 Features

- **User Management**: View, create, and delete user profiles
- **Search & Filtering**: Search users by name, email, or location
- **Sorting**: Sort users by name, age, or location
- **Infinite Scroll**: Automatically load more users
- **Local Persistence**: Data saved in localStorage
- **Responsive Design**: Adaptive design with Tailwind CSS
- **Detail Modal**: View complete user information

## 🛠️ Technologies

- **React 19** - UI Library
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons
- **Fetch API** - HTTP requests

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd prueba-tecnica-react
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**

   ```
   http://localhost:5173
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

## 📁 Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom hooks
├── services/      # API services
├── types/         # TypeScript definitions
├── utils/         # Utilities and helpers
├── constants/     # Configuration constants
└── context/       # React contexts
```

## ✅ Technical Test Checklist

### Basic Requirements

- [x] **Load 3 random users on startup** (Random User Generator API)
- [x] **Display user information**: photo, full name, country, city, email, phone
- [x] **Attractive grid/card design** with modern UI
- [x] **"Generate new profile" button** that ADDS (doesn't replace) new users
- [x] **Infinite scroll OR "Load more" button** (groups of 3 users)

### Filtering and Sorting

- [x] **Search by name or country** (instant search)
- [x] **Sort by name** (ascending/descending) and country (alphabetical)
- [x] **Real-time filtering** with search results

### Detail Modal

- [x] **Click on card opens modal** with additional information
- [x] **Display complete address**, date of birth, timezone
- [x] **Button/way to close modal** (X button and click outside)
- [x] **Smooth modal animations**

### Persistence

- [x] **localStorage/sessionStorage** for profiles and filters
- [x] **Restore state on page reload**
- [x] **Persistent search terms and sorting preferences**

### UX/UI

- [x] **Smooth animations** for loading and modal transitions
- [x] **Visible loading indicators** for all async operations
- [x] **Responsive design** for mobile, tablet, and desktop
- [x] **Error handling** for API errors and no search results
- [x] **Loading states** with minimum duration for better UX

### Code Quality

- [x] **TypeScript implementation** with proper typing
- [x] **Custom hooks** for state management
- [x] **Component separation** and reusability
- [x] **Clean code structure** with proper organization
- [x] **ESLint configuration** for code quality

### Performance

- [x] **Optimized re-renders** with useCallback and useMemo
- [x] **Efficient state management** with consolidated state object
- [x] **Lazy loading** with infinite scroll
- [x] **Minimal dependencies** (removed axios in favor of fetch)

## 🔧 Main Functionality

### User Management

- **Generate Profile**: Creates a new random user profile
- **Load More**: Loads 3 additional users
- **Delete User**: Removes a specific user
- **Delete All**: Clears all users

### Search and Filtering

- **Real-time search** by name, email, or location
- **Sorting** by name (A-Z, Z-A), age, and location
- **Automatic filtering** of results

### Data Persistence

- Users are automatically saved to localStorage
- Search and sorting preferences are maintained
- Data persists between sessions

## 🌐 API

The application uses the [Random User API](https://randomuser.me/) to generate random user profiles.

## 📱 Responsive Design

The application is optimized for mobile devices, tablets, and desktop.

## 🚀 Deployment

To build the application for production:

```bash
npm run build
```

Files will be generated in the `dist/` folder and are ready to deploy on any static web server.

## 📝 Implementation Notes

- **State Management**: Consolidated all states into a single object for better maintainability
- **API Integration**: Uses native fetch API instead of external libraries
- **Performance**: Implements infinite scroll with proper loading states
- **User Experience**: Smooth animations and loading indicators throughout the app
- **Error Handling**: Comprehensive error handling for API failures and edge cases
