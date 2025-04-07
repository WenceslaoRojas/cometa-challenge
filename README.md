# Cometa Code Challenge - Beer Market

## Screenshots
![Página principal](/public/screenshots/sreenshot.png)

## Overview
[Live demo](https://www.youtube.com/watch?v=your_video_id)
This is a coding challenge in which I developed a beer marketplace app that displays a list of beers and offers features such as filtering, searching, creating orders with different rounds, and the option to mark an order as paid.

Additionally, I implemented a basic login system using Firebase and simple middleware for superficial verification, providing a more complete experience, simulating a real app. The project is designed exclusively for mobile devices.

One of the challenges I faced, which I couldn't implement but would be a great improvement for the app, is the use of server-side components, especially for the beer[id] and order[id] routes. The main obstacle was my limited knowledge of Firebase. Enabling SSR (Server-Side Rendering) with Firebase would have required installing firebase-admin, but time didn't allow for this, and I believe that at this stage, it might have been an overly complex or over-engineered solution.

## Features

- ⚡️ **Next.js 15** - The latest version of the React framework
- 🔥 **App Router** - Using the new file-based routing system
- 🎨 **Shadcn UI** - Beautiful UI components built with Radix UI and Tailwind CSS
- 💅 **Tailwind CSS 4** - For utility-based styling
- 📊 **TypeScript** - Type safety for your codebase
- 🔄 **Zustand** - Simple state management
- 🔐 **Firebase Integration** - Authentication and database
- 📱 **Responsive Design** - Mobile-first approach

## Project Structure

```
src/
├── app/               # App Router folders and layouts
│   ├── (auth)/        # Authentication routes
│   ├── (private)/     # Protected routes
│   │   ├── home/      # Home page
│   │   ├── profile/   # User profile
│   │   └── ...
├── components/        # Shared UI components - functionality based
│   ├── navigation/    # Navigation components
│   ├── ui/            # Shadcn UI components
│   └── ...
├── shadcn/            # Shadcn UI components
│   ├── button/        # Button component
│   ├── card/          # Card component
│   └── ...
├── lib/               # Utility functions, hooks, etc.
│   ├── constants/     # Application constants
│   ├── providers/     # Context providers or wrappers
│   ├── types/         # TypeScript types and interfaces
│   └── utils.ts       # Utility functions
├── services/          # Firebase services
│   ├── firebase.tsx  # Firebase configuration and initialization
│   ├── beer.service.ts # Beer-related API calls
│   └── ...
├── store/             # Zustand stores
│   ├── authStore.ts    # Zustand store for authentication
│   └── ...
└── ...
```

## Getting Started

### Prerequisites

- Node.js 22.x.x or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

2. Install dependencies:

3. Create a `.env.local` file in the root directory and add your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_CONFIG={your_firebase_config}
NEXT_PUBLIC_STOCK_ID={your_stock_id}
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
```

### Starting Production Server

```bash
pnpm start
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm format` - Format code with Prettier

## Dependencies

This project uses various libraries including:

- **Next.js 15**: React framework
- **React 19**: UI library
- **Tailwind CSS 4**: Utility-first CSS framework
- **Shadcn UI**: Component library
- **Firebase 11**: Authentication and backend services
- **Zustand 5**: State management
- **Sonner 2**: Toast notifications
- **Auto-animate**: Animation library

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
