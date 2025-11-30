# Lifestyle Spending Snapshot

## Overview

Lifestyle Spending Snapshot is a privacy-first financial insights application that estimates spending patterns based on lifestyle questions rather than bank account connections. Users answer questions about their daily habits (coffee purchases, commute methods, dining frequency, etc.), and the application uses AI-powered estimation algorithms to generate spending breakdowns, category analysis, personalized recommendations, and global cost-of-living comparisons.

The application emphasizes trust through transparency, progressive disclosure, and data storytelling - providing actionable insights without requiring sensitive financial data.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for state management and data fetching
- Tailwind CSS for utility-first styling with custom design system

**Component Structure:**
- Multi-step form flow with progressive disclosure pattern (7 steps: Food & Dining, Transportation, Fitness, Subscriptions, Shopping, Goals, Review)
- Reusable shadcn/ui component library for consistent UI primitives
- View-based state management (landing, form, dashboard, simulator, cityComparison) for navigation flow
- Client-side estimation engine (`estimationEngine.ts`) for real-time calculations without server dependency

**Design System:**
- Custom Tailwind configuration with HSL-based color system
- Shadcn/ui "new-york" style variant
- Inter font family for typography hierarchy
- Elevation system using custom CSS variables for hover/active states
- Responsive grid layouts with mobile-first approach

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript for API routing
- Development and production server configurations with different static file serving strategies
- Session-based architecture ready for future authentication needs

**Data Layer:**
- Drizzle ORM configured for PostgreSQL
- Schema defined in shared directory for type consistency between client and server
- Migration support via drizzle-kit
- Currently using in-memory storage implementation with interface-based design for easy database migration

**Database Design:**
- Prepared for Neon Database (PostgreSQL) via `@neondatabase/serverless` package
- User schema defined with UUID primary keys
- Extensible schema structure in `shared/schema.ts` for cross-application type safety

### Key Architectural Decisions

**Privacy-First Approach:**
- No bank account integration or transaction history access
- All spending estimates calculated client-side from lifestyle inputs
- No sensitive financial data stored or transmitted
- Progressive disclosure UX to build trust before data collection

**Estimation Engine Design:**
- Client-side calculation engine (`lib/estimationEngine.ts`) maps lifestyle behaviors to spending estimates
- Category-based breakdown (Food & Dining, Transportation, Fitness, Subscriptions, Shopping)
- Market price assumptions for common activities (coffee: $5.50, delivery: $30-120, etc.)
- Range-based estimates (min/max) to acknowledge uncertainty

**Form Flow Architecture:**
- Seven-step wizard with conditional logic based on user responses
- Each step component isolated in `form-steps/` directory
- Centralized FormData type definition for type safety
- Review step provides transparency before final submission
- Visual step indicators with clickable navigation on desktop
- Mobile-optimized compact header with progress tracking
- Card-style selectable options with sr-only radio/checkbox pattern
- Smooth animations for conditional questions (animate-in transitions)
- Responsive grid layouts adapting from 1 to 5 columns based on screen size

**Component Reusability:**
- shadcn/ui components customized to match design system
- Example components in `components/examples/` for development/testing
- Atomic design principles with composed layouts

**State Management Strategy:**
- Local state for form data during input collection
- View-based routing without URL parameters (privacy consideration)
- React Query prepared for future API integration
- No global state management needed due to single-page flow

**Dashboard Lifestyle Balance:**
- Lifestyle Balance chart groups spending into three categories: Essentials, Convenience, and Enjoyment
- Category mapping: Essentials (Food & Dining, Transportation), Convenience (Subscriptions, Fitness & Wellness), Enjoyment (Shopping, Social)
- Donut chart visualization with percentage breakdown for each lifestyle group
- Subtitle explains the purpose: "See how your spending balances between essentials, convenience, and enjoyment"
- Replaces the detailed category pie chart for a higher-level lifestyle perspective

**Spending Simulator:**
- Interactive page for exploring "what-if" spending scenarios
- Sliders for 8 lifestyle habits: coffees, food delivery, restaurant meals, rideshare trips, shopping, subscriptions, nights out, wellness visits
- Real-time cost calculation updates as sliders change
- Baseline comparison with percentage change display
- Category breakdown pie chart and comparison bar chart
- Quick scenario buttons (Frugal Mode, Lifestyle Upgrade, etc.)
- Reset button to restore default values
- Category colors and naming consistent with main Dashboard

**City Lifestyle Comparison (Deep Dive):**
- Dedicated page for detailed multi-city cost comparisons
- Multi-city selection with checkboxes (up to 4 cities)
- Tabbed interface: Overview, Categories, Housing, Transport
- Overview tab: City cards with totals, radar chart for cost index comparison
- Categories tab: Horizontal bar chart comparison, per-category breakdown cards with progress bars
- Housing tab: Rent comparison table (studio, 1-bed, 2-bed), city-specific housing tips
- Transport tab: Monthly pass costs, gas prices, rideshare base fares comparison
- 15 global cities with detailed data: category multipliers, rent estimates, transport costs
- Uses user's baseline spending data for personalized comparisons
- Accessible from Global Cost Comparison section via "Explore" button

### External Dependencies

**UI Component Libraries:**
- @radix-ui/* primitives for accessible, unstyled UI components (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, slot, switch, tabs, toast, toggle, tooltip)
- cmdk for command palette functionality
- react-simple-maps and world-atlas for global cost comparison visualization
- recharts for data visualization (charts, graphs)
- embla-carousel-react for carousel components

**Data Visualization:**
- recharts for category breakdowns and spending charts
- react-simple-maps for geographic cost-of-living comparisons
- jsPDF and html2canvas for dashboard PDF export functionality

**Form Management:**
- react-hook-form for form state and validation
- @hookform/resolvers for schema validation integration
- zod for runtime type validation via drizzle-zod

**Database & ORM:**
- @neondatabase/serverless for PostgreSQL connection pooling
- drizzle-orm for type-safe database queries
- drizzle-zod for schema-to-zod validation generation
- connect-pg-simple for PostgreSQL session storage (prepared for future use)

**Development Tools:**
- Vite with React plugin for fast development
- @replit/vite-plugin-* suite (runtime-error-modal, cartographer, dev-banner) for Replit integration
- esbuild for production server bundling
- tsx for TypeScript execution in development

**Styling:**
- Tailwind CSS with PostCSS and Autoprefixer
- class-variance-authority for variant-based component styling
- clsx and tailwind-merge for conditional class composition

**Date Handling:**
- date-fns for date manipulation and formatting

**Third-Party Integrations:**
- Google Fonts (Inter) for typography
- CDN-hosted world atlas data for geographic visualizations
- No external APIs for spending estimation (privacy consideration)