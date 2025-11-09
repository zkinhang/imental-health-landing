This is a fully vibe coding project, for the JUMPSTARTER ZPIRE competition.

Landing Page hosted on: https://imental-health-landing-osrg.vercel.app/

# iMental Health Landing Page

A modern, responsive landing page for the iMental State Tracker application, featuring AI-powered mental health monitoring and wellness tracking.

## Project Structure

```
imental_landing/
├── app/
│   ├── fonts/              # Custom font files
│   ├── favicon.ico         # Site favicon
│   ├── globals.css         # Global styles and animations
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main landing page
├── components/
│   ├── dashboard/
│   │   └── metric-chart.tsx        # Detailed metric visualization with forecasts
│   ├── sections/
│   │   ├── hero.tsx               # Hero section
│   │   ├── features.tsx           # Main features section
│   │   ├── symptomarker.tsx       # SymptoMARKER indicators table
│   │   ├── how-it-works.tsx       # Step-by-step process
│   │   ├── dashboard-preview.tsx  # Weekly wellness dashboard preview
│   │   ├── benefits.tsx           # Benefits cards section
│   │   └── cta-section.tsx        # Call-to-action section
│   ├── ui/
│   │   ├── alert.tsx              # Alert component (shadcn)
│   │   ├── badge.tsx              # Badge component (shadcn)
│   │   ├── button.tsx             # Button component (shadcn)
│   │   ├── card.tsx               # Card component (shadcn)
│   │   ├── dialog.tsx             # Dialog/Modal component (shadcn)
│   │   ├── progress.tsx           # Progress component (shadcn)
│   │   └── separator.tsx          # Separator component (shadcn)
│   ├── guided-scroll.tsx          # GSAP ScrollTrigger animations
│   ├── scroll-trigger-wrapper.tsx # Reusable scroll animation wrapper
│   ├── scroll-animation.tsx       # Intersection Observer animations
│   ├── navigation.tsx             # Fixed navigation bar
│   └── footer.tsx                 # Footer component
├── lib/
│   ├── report-data.ts             # Mock data for dashboard metrics
│   └── utils.ts                   # Utility functions
└── public/                        # Static assets
```

## Tech Stack

### Core Framework
- **Next.js 15.5.6** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript** - Type-safe development

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **CSS Custom Properties** - Theme variables
- **Responsive Design** - Mobile-first approach

### UI Components
- **shadcn/ui** - Accessible, customizable component library
  - Alert, Badge, Button, Card, Dialog, Progress, Separator
- **Radix UI** - Headless UI primitives
  - @radix-ui/react-dialog
  - @radix-ui/react-separator
  - @radix-ui/react-progress

### Data Visualization
- **Recharts 2.12.7** - Composable chart library
  - ComposedChart with Area and Line components
  - Custom tooltips and gradients

### Animation
- **GSAP 3.12+** - Professional-grade animation library
  - ScrollTrigger plugin for scroll-based animations
  - Section transitions (fade, slide, scale)
  - Card stagger animations
- **Intersection Observer API** - Native scroll detection
- **CSS Animations** - Floating elements and transitions

### Icons
- **Lucide React** - Beautiful icon library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - Automatic vendor prefixes