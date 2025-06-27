# Comprehensive Design System Guidelines
### Table of Contents
1. [Core Philosophy](#core-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing-layout)
5. [Component Architecture](#component-architecture)
6. [Animation & Motion](#animation-motion)
7. [Shadow System](#shadow-system)
8. [Dark Mode Strategy](#dark-mode-strategy)
9. [Interactive States](#interactive-states)
10. [Component Patterns](#component-patterns)
11. [Grid Systems](#grid-systems)
12. [Visual Effects](#visual-effects)
13. [Code Standards](#code-standards)
14. [Implementation Examples](#implementation-examples)

---

## Core Philosophy

### Design Principles
1. **Modern Minimalism with Depth**: Combine clean, minimal interfaces with sophisticated depth through shadows, gradients, and layering
2. **Motion-First Design**: Every interaction should feel alive with purposeful animations
3. **Dark Mode Native**: Design with both light and dark modes as first-class citizens
4. **Subtle Sophistication**: Use restraint in visual effects while maintaining visual interest
5. **Functional Beauty**: Every design element must serve both aesthetic and functional purposes

### Visual Language
- **Geometric Precision**: Use mathematical patterns, grids, and systematic layouts
- **Layered Depth**: Create visual hierarchy through sophisticated shadow systems
- **Fluid Interactions**: Smooth, spring-based animations for all transitions
- **Neutral Dominance**: Build on neutral color foundations with selective accent usage

---

## Color System

### Primary Palette

#### Neutral Colors (Foundation)
```css
/* Light Mode Neutrals */
--neutral-50: rgb(250, 250, 250);   /* Backgrounds */
--neutral-100: rgb(245, 245, 245);  /* Subtle backgrounds */
--neutral-200: rgb(229, 229, 229);  /* Borders, dividers */
--neutral-300: rgb(212, 212, 212);  /* Disabled states */
--neutral-400: rgb(163, 163, 163);  /* Placeholder text */
--neutral-500: rgb(115, 115, 115);  /* Secondary text */
--neutral-600: rgb(82, 82, 82);     /* Icon colors */
--neutral-700: rgb(64, 64, 64);     /* Primary text */
--neutral-800: rgb(38, 38, 38);     /* Headings */
--neutral-900: rgb(23, 23, 23);     /* High contrast text */
--neutral-950: rgb(10, 10, 10);     /* Maximum contrast */

/* Dark Mode Neutrals */
--dark-neutral-50: rgb(10, 10, 10);
--dark-neutral-100: rgb(18, 18, 18);
--dark-neutral-200: rgb(38, 38, 38);
--dark-neutral-300: rgb(64, 64, 64);
--dark-neutral-400: rgb(82, 82, 82);
--dark-neutral-500: rgb(115, 115, 115);
--dark-neutral-600: rgb(163, 163, 163);
--dark-neutral-700: rgb(212, 212, 212);
--dark-neutral-800: rgb(229, 229, 229);
--dark-neutral-900: rgb(245, 245, 245);
--dark-neutral-950: rgb(250, 250, 250);
```

#### Accent Colors
```css
/* Primary Gradients */
--gradient-primary: linear-gradient(to right, #16a34a, #0ea5e9); /* green-500 to blue-500 */
--gradient-secondary: linear-gradient(to right, #8b5cf6, #ec4899); /* violet-500 to pink-500 */
--gradient-tertiary: linear-gradient(to right, #f59e0b, #ef4444); /* amber-500 to red-500 */

/* Solid Accents */
--accent-green: #16a34a;
--accent-blue: #0ea5e9;
--accent-violet: #8b5cf6;
--accent-pink: #ec4899;
--accent-amber: #f59e0b;
--accent-red: #ef4444;
```

### Color Usage Guidelines

#### Background Colors
```css
/* Primary Backgrounds */
.bg-primary-light { background-color: white; }
.bg-primary-dark { background-color: rgb(10, 10, 10); }

/* Secondary Backgrounds */
.bg-secondary-light { background-color: rgb(250, 250, 250); }
.bg-secondary-dark { background-color: rgb(18, 18, 18); }

/* Card Backgrounds */
.bg-card-light { background-color: white; }
.bg-card-dark { background-color: rgb(23, 23, 23); }

/* Interactive Backgrounds */
.bg-hover-light { background-color: rgb(245, 245, 245); }
.bg-hover-dark { background-color: rgb(38, 38, 38); }
```

#### Text Colors
```css
/* Primary Text */
.text-primary-light { color: rgb(64, 64, 64); }
.text-primary-dark { color: rgb(229, 229, 229); }

/* Secondary Text */
.text-secondary-light { color: rgb(115, 115, 115); }
.text-secondary-dark { color: rgb(163, 163, 163); }

/* Heading Text */
.text-heading-light { color: rgb(38, 38, 38); }
.text-heading-dark { color: rgb(245, 245, 245); }

/* Muted Text */
.text-muted-light { color: rgb(163, 163, 163); }
.text-muted-dark { color: rgb(115, 115, 115); }
```

---

## Typography

### Font Stack
```css
--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
```

### Type Scale
```css
/* Headings */
.text-4xl { font-size: 2.25rem; line-height: 2.5rem; }     /* 36px */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; }   /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }        /* 24px */
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }     /* 20px */
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }    /* 18px */

/* Body */
.text-base { font-size: 1rem; line-height: 1.5rem; }       /* 16px */
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }    /* 14px */
.text-xs { font-size: 0.75rem; line-height: 1rem; }        /* 12px */
```

### Font Weights
```css
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.font-extrabold { font-weight: 800; }
```

### Typography Patterns

#### Heading Styles
```css
/* Primary Heading */
.heading-primary {
  @apply text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-200;
}

/* Section Heading */
.heading-section {
  @apply text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-300;
}

/* Card Heading */
.heading-card {
  @apply text-lg font-semibold text-neutral-700 dark:text-neutral-300;
}
```

#### Body Text Styles
```css
/* Primary Body */
.body-primary {
  @apply text-base text-neutral-700 dark:text-neutral-300;
}

/* Secondary Body */
.body-secondary {
  @apply text-sm text-neutral-600 dark:text-neutral-400;
}

/* Muted Text */
.text-muted {
  @apply text-xs text-neutral-500 dark:text-neutral-500;
}
```

---

## Spacing & Layout

### Spacing Scale
```css
/* Base unit: 4px (0.25rem) */
.space-0 { 0 }           /* 0px */
.space-1 { 0.25rem }     /* 4px */
.space-2 { 0.5rem }      /* 8px */
.space-3 { 0.75rem }     /* 12px */
.space-4 { 1rem }        /* 16px */
.space-5 { 1.25rem }     /* 20px */
.space-6 { 1.5rem }      /* 24px */
.space-8 { 2rem }        /* 32px */
.space-10 { 2.5rem }     /* 40px */
.space-12 { 3rem }       /* 48px */
.space-16 { 4rem }       /* 64px */
.space-20 { 5rem }       /* 80px */
.space-24 { 6rem }       /* 96px */
.space-32 { 8rem }       /* 128px */
.space-40 { 10rem }      /* 160px */
.space-44 { 11rem }      /* 176px */
.space-48 { 12rem }      /* 192px */
.space-60 { 15rem }      /* 240px */
```

### Container Widths
```css
.max-w-xs { max-width: 20rem; }      /* 320px */
.max-w-sm { max-width: 24rem; }      /* 384px */
.max-w-md { max-width: 28rem; }      /* 448px */
.max-w-lg { max-width: 32rem; }      /* 512px */
.max-w-xl { max-width: 36rem; }      /* 576px */
.max-w-2xl { max-width: 42rem; }     /* 672px */
.max-w-3xl { max-width: 48rem; }     /* 768px */
.max-w-4xl { max-width: 56rem; }     /* 896px */
.max-w-5xl { max-width: 64rem; }     /* 1024px */
.max-w-6xl { max-width: 72rem; }     /* 1152px */
.max-w-7xl { max-width: 80rem; }     /* 1280px */
```

### Layout Patterns

#### Standard Container
```jsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

#### Card Container
```jsx
<div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
  {/* Card content */}
</div>
```

#### Section Spacing
```jsx
<section className="py-12 md:py-20">
  <div className="mb-8 md:mb-12">
    {/* Section header */}
  </div>
  <div className="space-y-8">
    {/* Section content */}
  </div>
</section>
```

---

## Component Architecture

### Base Component Structure
```tsx
import { cn } from "@/lib/utils";
import React from "react";

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  // Additional props
}

export const Component = React.forwardRef<
  HTMLDivElement,
  ComponentProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        // Base styles
        "relative",
        // Responsive styles
        "p-4 md:p-6",
        // Dark mode styles
        "bg-white dark:bg-neutral-900",
        // Custom className
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Component.displayName = "Component";
```

### Compound Component Pattern
```tsx
const Card = ({ children, className }: CardProps) => {
  return (
    <div className={cn("rounded-lg", className)}>
      {children}
    </div>
  );
};

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return (
    <div className={cn("p-6 pb-4", className)}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className }: CardContentProps) => {
  return (
    <div className={cn("p-6 pt-0", className)}>
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Content = CardContent;

export { Card };
```

---

## Animation & Motion

### Core Animation Principles

1. **Spring Physics**: Use spring animations for natural, organic movement
2. **Stagger Effects**: Cascade animations for multiple elements
3. **Entrance/Exit**: Define clear enter and exit animations
4. **Micro-interactions**: Small animations for user feedback
5. **Performance**: Use GPU-accelerated properties (transform, opacity)

### Motion Values
```tsx
// Spring configurations
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 15,
};

const bounceSpring = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

// Duration-based animations
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};
```

### Animation Patterns

#### Hover Effects
```tsx
const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: springConfig,
};

const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
  },
  transition: { duration: 0.3 },
};
```

#### Stagger Children
```tsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};
```

#### Page Transitions
```tsx
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};
```

---

## Shadow System

### Shadow Scale
```css
/* Elevation Levels */
.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### Complex Shadow System
```css
/*Signature Shadow */
.shadow-ace {
  box-shadow: 
    0 0 24px rgba(34, 42, 53, 0.06),
    0 1px 1px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(34, 42, 53, 0.04),
    0 0 4px rgba(34, 42, 53, 0.08),
    0 16px 68px rgba(47, 48, 55, 0.05),
    0 1px 0 rgba(255, 255, 255, 0.1) inset;
}

/* Card Shadow */
.shadow-card {
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
}

/* Input Shadow */
.shadow-input {
  box-shadow: 
    0px 2px 3px -1px rgba(0, 0, 0, 0.1), 
    0px 1px 0px 0px rgba(25, 28, 33, 0.02), 
    0px 0px 0px 1px rgba(25, 28, 33, 0.08);
}
```

### Shadow Usage Patterns
```jsx
// Elevated Card
<div className="rounded-lg bg-white p-6 shadow-ace dark:bg-neutral-900">
  {/* Content */}
</div>

// Hoverable Card
<div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-lg dark:bg-neutral-900">
  {/* Content */}
</div>

// Floating Element
<div className="rounded-lg bg-white p-4 shadow-2xl dark:bg-neutral-900">
  {/* Content */}
</div>
```

---

## Dark Mode Strategy

### Implementation Approach

1. **CSS Variables**: Define color variables that change based on theme
2. **Tailwind Dark Mode**: Use `dark:` prefix for all color utilities
3. **System Preference**: Respect user's system dark mode preference
4. **Manual Toggle**: Provide option to override system preference

### Dark Mode Patterns

#### Background Inversions
```css
/* Light Mode */
.bg-primary { @apply bg-white; }
.bg-secondary { @apply bg-neutral-50; }
.bg-tertiary { @apply bg-neutral-100; }

/* Dark Mode */
.dark .bg-primary { @apply bg-neutral-900; }
.dark .bg-secondary { @apply bg-neutral-800; }
.dark .bg-tertiary { @apply bg-neutral-700; }
```

#### Border Adaptations
```css
.border-default { @apply border-neutral-200 dark:border-neutral-800; }
.border-strong { @apply border-neutral-300 dark:border-neutral-700; }
.border-subtle { @apply border-neutral-100 dark:border-neutral-800/50; }
```

#### Shadow Adjustments
```css
/* Shadows in dark mode should be more subtle */
.shadow-dark-mode {
  @apply shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.5)];
}
```

---

## Interactive States

### State Definitions
```css
/* Hover States */
.hover-bg { @apply hover:bg-neutral-100 dark:hover:bg-neutral-800; }
.hover-border { @apply hover:border-neutral-300 dark:hover:border-neutral-700; }
.hover-text { @apply hover:text-neutral-900 dark:hover:text-neutral-100; }

/* Focus States */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900;
}

/* Active States */
.active-scale { @apply active:scale-95; }
.active-bg { @apply active:bg-neutral-200 dark:active:bg-neutral-700; }

/* Disabled States */
.disabled {
  @apply disabled:cursor-not-allowed disabled:opacity-50;
}
```

### Interactive Component Example
```jsx
<button
  className={cn(
    // Base styles
    "rounded-md px-4 py-2 text-sm font-medium",
    // Colors
    "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900",
    // Interactive states
    "hover:bg-neutral-800 dark:hover:bg-neutral-100",
    "focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white",
    "active:scale-95",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // Transitions
    "transition-all duration-200"
  )}
>
  Click me
</button>
```

---

## Component Patterns

### Card Patterns

#### Basic Card
```jsx
export const BasicCard = ({ children, className }) => {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white p-6",
        "dark:border-neutral-800 dark:bg-neutral-900",
        "shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
```

#### Hover Card
```jsx
export const HoverCard = ({ children, className }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-lg border border-neutral-200 bg-white p-6",
        "dark:border-neutral-800 dark:bg-neutral-900",
        "shadow-sm transition-shadow hover:shadow-lg",
        "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
```

#### Gradient Card
```jsx
export const GradientCard = ({ children, className }) => {
  return (
    <div className={cn("relative rounded-lg p-[1px]", className)}>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500 to-blue-500" />
      <div className="relative rounded-lg bg-white p-6 dark:bg-neutral-900">
        {children}
      </div>
    </div>
  );
};
```

### Button Patterns

#### Primary Button
```jsx
export const PrimaryButton = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white",
        "hover:bg-neutral-800 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200",
        "dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### Ghost Button
```jsx
export const GhostButton = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium",
        "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900",
        "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2",
        "active:scale-95",
        "transition-all duration-200",
        "dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Input Patterns

#### Text Input
```jsx
export const TextInput = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-neutral-200 bg-white px-3 py-2",
        "text-sm text-neutral-900 placeholder-neutral-400",
        "focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100",
        "dark:placeholder-neutral-500 dark:focus:border-neutral-600",
        className
      )}
      {...props}
    />
  );
};
```

---

## Grid Systems

### Bento Grid Pattern
```jsx
export const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4",
        "md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, header, icon }) => {
  return (
    <div
      className={cn(
        "group/bento row-span-1 rounded-3xl border border-transparent p-4",
        "bg-white shadow-sm transition duration-200",
        "hover:shadow-xl dark:border-white/[0.2] dark:bg-black",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mb-2 mt-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
```

### Card Grid Pattern
```jsx
export const CardGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};
```

### Masonry Grid Pattern
```jsx
export const MasonryGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4",
        "[&>*]:mb-4 [&>*]:break-inside-avoid",
        className
      )}
    >
      {children}
    </div>
  );
};
```

---

## Visual Effects

### Gradient Patterns

#### Background Gradients
```jsx
// Radial Gradient Background
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

// Linear Gradient Overlay
<div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-transparent" />

// Mesh Gradient
<div className="absolute inset-0 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200" />
```

#### Text Gradients
```jsx
<h1 className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Glassmorphism
```jsx
export const GlassCard = ({ children, className }) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-white/20",
        "bg-white/10 backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
        className
      )}
    >
      {children}
    </div>
  );
};
```

### Glow Effects
```jsx
// Subtle Glow
<div className="rounded-lg bg-white p-6 shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:bg-neutral-900 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]" />

// Colored Glow
<div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-[1px] shadow-[0_0_20px_rgba(168,85,247,0.5)]">
  <div className="rounded-lg bg-white p-6 dark:bg-neutral-900">
    {/* Content */}
  </div>
</div>
```

### Pattern Overlays
```jsx
// Dot Pattern
export const DotPattern = () => (
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    }}
  />
);

// Grid Pattern
export const GridPattern = () => (
  <svg className="absolute inset-0 h-full w-full stroke-neutral-200 dark:stroke-neutral-800">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);
```

---

## Code Standards

### File Organization
```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── layout/               # Layout components
│   ├── header.tsx
│   ├── footer.tsx
│   └── container.tsx
├── features/             # Feature-specific components
│   ├── auth/
│   ├── dashboard/
│   └── ...
└── lib/                  # Utilities and helpers
    ├── utils.ts
    └── hooks/
```

### Component Naming Conventions
```tsx
// Component files: PascalCase
Button.tsx
CardGrid.tsx
FileUpload.tsx

// Component exports: PascalCase
export const Button = () => {}
export const CardGrid = () => {}

// Props interfaces: ComponentNameProps
interface ButtonProps {}
interface CardGridProps {}

// Hook files: camelCase with 'use' prefix
useAnimation.ts
useTheme.ts

// Utility files: camelCase
formatDate.ts
generateId.ts
```

### Import Organization
```tsx
// 1. External imports
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 2. Internal imports - absolute paths
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

// 3. Type imports
import type { ButtonProps } from "@/types";

// 4. Style imports
import styles from "./Component.module.css";
```

### Props Pattern
```tsx
interface ComponentProps {
  // Required props first
  children: React.ReactNode;
  title: string;
  
  // Optional props
  className?: string;
  description?: string;
  icon?: React.ReactNode;
  
  // Event handlers
  onClick?: () => void;
  onChange?: (value: string) => void;
  
  // Variants/options
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}
```

### Utility Function (cn)
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## Implementation Examples

### Complete Component Example
```tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { IconPlus, IconX } from "@tabler/icons-react";

interface ExpandableCardProps {
  title: string;
  description: string;
  content: React.ReactNode;
  className?: string;
}

export const ExpandableCard = ({
  title,
  description,
  content,
  className,
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className={cn(
        "overflow-hidden rounded-3xl border border-neutral-200 bg-white",
        "dark:border-neutral-800 dark:bg-neutral-900",
        "shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      <motion.div
        layout
        className="cursor-pointer p-6"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {title}
            </h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          </div>
          <motion.button
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <IconPlus className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          </motion.button>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-neutral-200 p-6 dark:border-neutral-800">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
```

### Complex Animation Example
```tsx
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton = ({
  children,
  className,
  onClick,
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 0.5;
    const yPct = (mouseY / height - 0.5) * 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative rounded-lg bg-gradient-to-r from-green-500 to-blue-500",
        "px-6 py-3 font-medium text-white",
        "shadow-lg transition-shadow hover:shadow-xl",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 rounded-lg bg-white"
        style={{
          opacity: useTransform(
            [xSpring, ySpring],
            ([latestX, latestY]) =>
              Math.sqrt(
                (latestX as number) ** 2 + (latestY as number) ** 2
              ) * 0.2
          ),
        }}
      />
    </motion.button>
  );
};
```

### Advanced Layout Example
```tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  description: string;
  date: string;
  icon?: React.ReactNode;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline = ({ items, className }: TimelineProps) => {
  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      
      {/* Timeline items */}
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="relative flex items-start gap-6"
          >
            {/* Icon/Dot */}
            <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-md dark:bg-neutral-900">
              {item.icon || (
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-green-500 to-blue-500" />
              )}
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-3">
              <div className="mb-1 flex items-center gap-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {item.title}
                </h3>
                <span className="text-sm text-neutral-500 dark:text-neutral-500">
                  {item.date}
                </span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
```

---

## Final Implementation Checklist

### Component Development

- ✅ Use TypeScript for all components
- ✅ Define proper interfaces for props
- ✅ Include proper display names for debugging
- ✅ Use forwardRef when needed for DOM access
- ✅ Implement proper aria labels for accessibility

### Styling

- ✅ Use Tailwind classes exclusively
- ✅ Apply dark mode classes for all colors
- ✅ Use the cn() utility for conditional classes
- ✅ Follow the spacing scale consistently
- ✅ Apply proper responsive breakpoints

### Animation

- ✅ Use Framer Motion for complex animations
- ✅ Implement spring physics for natural movement
- ✅ Add hover and tap states for interactive elements
- ✅ Use GPU-accelerated properties
- ✅ Test animations for performance

### Accessibility

- ✅ Proper semantic HTML elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus states visible
- ✅ Color contrast meets WCAG standards

### Performance

- ✅ Lazy load heavy components
- ✅ Optimize images with next/image
- ✅ Use React.memo for expensive renders
- ✅ Implement proper loading states
- ✅ Code split where appropriate

### Testing

- ✅ Component renders without errors
- ✅ Props work as expected
- ✅ Dark mode displays correctly
- ✅ Responsive design works on all breakpoints
- ✅ Animations perform smoothly
