# Frontend Developer Technical Assignment

This repository contains the completed technical assignment with three tasks demonstrating proficiency in React Native (Expo), Next.js, and TypeScript with Axios integration.

## 📋 Project Overview

### Task 1: React Native (Expo) - Movie Catalogue App
A mobile movie catalogue application built with React Native, Expo, and TypeScript, featuring movie listings and detailed views using The Movie Database (TMDB) API.

### Task 2: Next.js Web Application
A pixel-perfect recreation of a project management dashboard with a functional Kanban board, built using Next.js, TypeScript, and TailwindCSS.

### Task 3: Backend Logic with Axios + TypeScript
Clean, type-safe API integration demonstrating proper network communication patterns and TypeScript usage.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (for React Native task)
- Android Studio or Xcode (for mobile simulators)

## 📱 Task 1: Movie Catalogue (React Native + Expo)

### Setup Instructions
```bash
cd task1_moviecatalogue
npm install
npm start
```

### Running on Simulators
```bash
# iOS (requires Xcode)
npm run ios

# Android (requires Android Studio)
npm run android
```

### Features
- ✅ Movie Carousel with Now Playing movies
- ✅ Movie detail screen with comprehensive information
- ✅ Navigation between screens using Tabs Navigation and Expo App Router
- ✅ TMDB API integration with proper error handling

### API Configuration
1. Register for a free API key at [TMDB](https://developer.themoviedb.org/docs/getting-started)
2. Create a `.env` file in the project root:
```
EXPO_PUBLIC_API_KEY=your_api_key_here
```

### Key Files
- `(tabs)/_layout.tsx` - Main navigation setup
- `movies/index.tsx` - Movie details page
- `(tabs)/index.tsx` - Home page with Movie Carousel
- `services/movieService.ts` - API service layer with TypeScript interfaces
- `types/api.ts` - TypeScript apiresponse type definitions
- `types/domain.ts` - TypeScript domain type definitions
- `store/moveStore.ts` - Zustand Movie Store for Global state management

## 🌐 Task 2: Project Management Dashboard (Next.js)

### Setup Instructions
```bash
cd task2_kanbanboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Features
- ✅ Pixel-perfect Figma design implementation
- ✅ Fully responsive layout (mobile, tablet, desktop)
- ✅ Functional Kanban board with drag & drop
- ✅ State persistence across navigation
- ✅ TailwindCSS for styling
- ✅ TypeScript throughout
- ✅ Modular component architecture

### Drag & Drop Implementation
- Uses `react-beautiful-dnd FORK` for smooth drag and drop functionality
- State management via Local Storage
- Persistent state across page navigation

### Key Files
- `src/pages/index.tsx` - Main dashboard page
- `src/components/Kanban/KanbanBoard.tsx` - Drag & drop board implementation
- `src/components/Kanban/KanbanColumn.tsx` - Individual Columns for each KanbanBoard (Handles droppable areas)
- `src/components/Kanban/KanbanCard/KanbanCard.tsx` - Individual task components (Handles indivdual drag)
- `src/hooks/useLocalStorage.ts` - Custom hook for managing state when coming back to page


## 🔌 Task 3: Axios + TypeScript Integration

### Implementation Location
The Axios integration is implemented across both tasks but can also be found as a standalone example in `/shared/services/`.

### Setup Instructions
```bash
cd task3_backendlogic
npm install
npm run dev
```

### Usage
Open [http://localhost:3000/api/pokemon/list?limit=50&offset=100] for pagination example
Open [http://localhost:3000/api/pokemon/3] for individual pokemon example

### Features
- ✅ Clean API service architecture
- ✅ Proper TypeScript interfaces for requests/responses
- ✅ Error handling and loading states
- ✅ Reusable service patterns
- ✅ Environment variable configuration
- ✅ Interceptors for common functionality

### Key Files
- `src/services/pokemon.service.ts` - 
- `src/types/api.ts` - Request/response type definitions
- `src/utils/errorHandler.ts` - Centralized error handling

## 🏗️ Architecture & Design Decisions

### Code Organization
- **Modular Structure**: Each task is organized with clear separation of concerns
- **TypeScript First**: Comprehensive typing throughout all projects
- **Reusable Components**: Built with extensibility and reusability in mind
- **Service Layer Pattern**: Clean abstraction for API communication

### State Management
- **Task 1**: Local component state with React hooks
- **Task 2**: React Context API for Kanban board state
- **Global**: Centralized error handling and loading states

### Styling Approach
- **Task 1**: React Native StyleSheet with responsive design, themes to keep styles uniform and consistent
- **Task 2**: TailwindCSS utility classes with custom components

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Network failure resilience
- Loading states and skeleton screens

## 🧪 Testing & Quality Assurance

### Tested Platforms
- **Mobile**: Android emulator
- **Web**: Chrome, Firefox, Safari (desktop and mobile)
- **Responsive**: Multiple screen sizes from mobile to desktop

## 📝 Additional Notes & Assumptions

### Task 1 Assumptions
- Used TMDB's popular movies endpoint as the primary data source
- Implemented basic caching to improve performance
- Movie posters fallback to placeholder when unavailable
- Navigation follows iOS/Android platform conventions

### Task 2 Assumptions
- Kanban data is mocked but follows realistic data structure
- Drag & drop works on both touch and mouse interactions
- State persistence uses in-memory storage
- Responsive breakpoints follow TailwindCSS defaults

### Task 3 Implementation
- Used PokeAPI as data source
- Implemented request/response interceptors for common functionality
- Error handling includes network timeout and retry logic
- Service pattern allows easy extension for additional endpoints


## 📞 Support & Questions

If you have any questions about the implementation or need clarification on any architectural decisions, please don't hesitate to reach out.

---

**Submission Date**: [Current Date]
**Estimated Development Time**: [Your time estimate]
**Repository Structure**: Each task is in its respective folder with individual package.json files