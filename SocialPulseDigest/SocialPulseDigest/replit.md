# Social Digest Platform - replit.md

## Overview

This is a modern web application for creating branded social media digests. The platform aggregates and curates social media content from YouTube and X (Twitter) to generate visually appealing, personalized digest reports for brands. The application features a colorful, animated interface designed to feel like flipping through a designer magazine, with content organized into scrollable digest pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: TailwindCSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state, React Context for theme management
- **Animation**: Framer Motion for smooth transitions and microinteractions
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API**: REST API with structured error handling
- **Development**: Hot module replacement via Vite integration
- **Session Management**: Express session middleware with PostgreSQL storage

### Project Structure
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Common TypeScript types and schemas
- `migrations/` - Database migration files

## Key Components

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (Neon serverless)
- **Schema**: Zod validation integrated with Drizzle for type-safe operations
- **Migrations**: Drizzle Kit for schema management

### UI Components
- **Design System**: Consistent component library with shadcn/ui
- **Theme**: Light/dark mode support with CSS custom properties
- **Responsive**: Mobile-first design with Tailwind breakpoints
- **Accessibility**: Radix UI ensures ARIA compliance and keyboard navigation

### Content Management
- **Digest Generation**: Mock data system for social media content simulation
- **Content Types**: Support for YouTube videos and Twitter/X posts
- **Brand Customization**: Niche-based theming and personalization
- **Export Features**: Multiple export formats (Slack, Notion, etc.)

## Data Flow

1. **User Onboarding**: Brand setup with niche selection, tone preferences, and color customization
2. **Content Aggregation**: Mock social media content generation based on brand preferences
3. **Digest Creation**: Automated digest compilation with AI-powered insights
4. **Content Display**: Animated, scrollable digest pages with embedded social content
5. **Export/Sharing**: Multiple output formats for different platforms

### Database Schema
- `users` - User authentication and profile data
- `brands` - Brand configurations with preferences and settings
- `digests` - Generated digest content with JSON structure
- `digest_metrics` - Performance and engagement metrics

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18+ with modern hooks and concurrent features
- **TypeScript**: Full type safety across frontend and backend
- **TailwindCSS**: Utility-first CSS framework with custom theme extensions
- **Radix UI**: Headless UI components for accessibility and flexibility

### Development Tools
- **Vite**: Fast development server with HMR
- **ESBuild**: Production bundling for server-side code
- **Drizzle Kit**: Database schema management and migrations
- **React Query**: Server state synchronization and caching

### Animation and Interactions
- **Framer Motion**: Advanced animations and gesture handling
- **Embla Carousel**: Touch-friendly carousel components
- **Lucide React**: Consistent icon library

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Reloading**: Full-stack HMR with Vite middleware integration
- **Database**: Local PostgreSQL or Neon serverless connection
- **Environment Variables**: `.env` file for database and API configuration

### Production Build
- **Frontend**: Static asset compilation via Vite
- **Backend**: ESBuild bundling for Node.js deployment
- **Database**: PostgreSQL with connection pooling
- **Serving**: Express serves both API routes and static frontend assets

### Key Scripts
- `npm run dev` - Start development server with HMR
- `npm run build` - Build both frontend and backend for production
- `npm run start` - Start production server
- `npm run db:push` - Apply database schema changes

### Configuration Files
- `vite.config.ts` - Frontend build configuration with path aliases
- `drizzle.config.ts` - Database connection and migration settings
- `tailwind.config.ts` - Custom theme and component styling
- `tsconfig.json` - TypeScript configuration with path mapping

The application is designed to be deployed on platforms that support Node.js with PostgreSQL, with particular optimization for Replit's environment through specialized plugins and configurations.