# Overview

This is a full-stack project management dashboard application built with React, Express, and TypeScript. The application allows users to manage projects and their associated pipelines through a clean, modern interface. It features a main dashboard for viewing all projects and detailed project pages for managing individual pipelines. The application uses mock data for development and is designed with a dark theme and professional SaaS-style UI.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with functional components and hooks for UI state management
- **Vite** as the build tool and development server for fast hot module replacement
- **Wouter** for client-side routing (lightweight alternative to React Router)
- **TanStack Query** for server state management and data fetching
- **TypeScript** for type safety across the entire frontend codebase

## Styling and UI Components
- **Tailwind CSS** for utility-first styling with custom CSS variables for theming
- **Shadcn/ui** component library built on Radix UI primitives for accessible, customizable components
- **Dark theme** implementation using CSS custom properties
- **Responsive design** with mobile-first approach using Tailwind breakpoints

## Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **ESM modules** throughout the codebase for modern JavaScript support
- **Middleware setup** for JSON parsing, URL encoding, and request logging
- **Error handling** middleware for centralized error management
- **Development/production** environment detection for conditional middleware

## Data Management
- **Drizzle ORM** configured for PostgreSQL database interactions
- **Zod schemas** for runtime validation and type inference
- **Database schema** includes Users, Projects, and Pipelines tables with proper relationships
- **Mock data** system for development using in-memory storage interface
- **Type-safe** database operations with full TypeScript integration

## Development Tools and Configuration
- **TSConfig** with path mapping for clean imports (@/, @shared/, @assets/)
- **ESBuild** for production bundling of server code
- **Drizzle Kit** for database migrations and schema management
- **PostCSS** with Autoprefixer for CSS processing
- **Replit integration** with development banner and cartographer plugin

## Project Structure
- **Monorepo structure** with separate client, server, and shared directories
- **Shared schema** definitions between frontend and backend
- **Component-based architecture** with reusable UI components
- **Page-based routing** with dashboard and project detail views
- **Asset management** with attached assets directory for static files

# External Dependencies

## Database and ORM
- **Neon Database** serverless PostgreSQL for cloud database hosting
- **Drizzle ORM** for type-safe database operations and migrations
- **connect-pg-simple** for PostgreSQL session storage

## UI and Styling
- **Radix UI** primitives for accessible component foundations
- **Tailwind CSS** for utility-first styling
- **Lucide React** for consistent SVG icons
- **class-variance-authority** for component variant management
- **clsx** and **tailwind-merge** for conditional class name handling

## Development and Build Tools
- **Vite** for fast development server and build tooling
- **TypeScript** for static type checking
- **ESBuild** for fast JavaScript bundling
- **TSX** for TypeScript execution in development

## React Ecosystem
- **React Hook Form** with Hookform Resolvers for form management
- **TanStack React Query** for server state management
- **Wouter** for lightweight client-side routing
- **React Day Picker** for date selection components

## Utilities and Helpers
- **date-fns** for date manipulation and formatting
- **nanoid** for unique ID generation
- **cmdk** for command palette functionality
- **embla-carousel-react** for carousel components