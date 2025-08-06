# Glassmorphism Styles Documentation

## **Navbar Glassmorphism**

### **Desktop Navbar** (`NavBody` component):
```css
/* Glass morphism layers applied in order */
<div className="glass-filter-nav absolute inset-0"></div>
<div className="glass-overlay absolute inset-0"></div>
<div className="glass-specular absolute inset-0"></div>
```

### **Mobile Navbar** (`MobileNav` component):
```css
/* Same glass morphism layers as desktop */
<div className="glass-filter-nav absolute inset-0"></div>
<div className="glass-overlay absolute inset-0"></div>
<div className="glass-specular absolute inset-0"></div>
```

## **Hero Section Picture Glassmorphism**

### **Both Mobile and Desktop Picture Card**:
```css
/* Applied to .glass-picture-card container */
<div className="glass-filter"></div>
<div className="glass-overlay"></div>
<div className="glass-specular"></div>
```

## **CSS Implementation Details**

### **Layer 1: Backdrop Filter** (Base blur effect)
```css
.glass-filter {
  backdrop-filter: blur(2px);
  filter: url(#lg-dist) saturate(150%);
}

.glass-filter-nav {
  backdrop-filter: blur(4px);  /* Slightly stronger blur for navbar */
  filter: url(#lg-dist) saturate(150%);
}
```

### **Layer 2: Semi-transparent Background**
```css
.glass-overlay {
  background: var(--lg-bg-color);  /* rgba(255, 255, 255, 0.045) */
}
```

### **Layer 3: Specular Highlights** (Glass reflection effect)
```css
.glass-specular {
  box-shadow: inset 1px 1px 0 var(--lg-highlight),
              inset 0 0 5px var(--lg-highlight);
}
/* --lg-highlight: rgba(255, 255, 255, 0.596) */
```

### **Picture Card Container**
```css
.glass-picture-card {
  border-radius: 2rem;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 
              0 0 20px rgba(0, 0, 0, 0.1);
}
```

## **SVG Noise Filter**

**Applied via `filter: url(#lg-dist)`:**
```svg
<filter id="lg-dist">
  <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" 
                numOctaves="2" seed="92" result="noise" />
  <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
  <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" 
                     xChannelSelector="R" yChannelSelector="G" />
</filter>
```

## **CSS Variables Used**
```css
--lg-bg-color: rgba(255, 255, 255, 0.045);      /* Semi-transparent white */
--lg-highlight: rgba(255, 255, 255, 0.596);     /* Bright highlight */
--lg-hover-glow: rgba(255, 255, 255, 0.534);    /* Hover effect */
```

## **Key Differences**

1. **Navbar** uses `glass-filter-nav` with **4px blur**
2. **Picture** uses `glass-filter` with **2px blur**
3. **Layering system**: Filter → Overlay → Specular → Content (z-index 0-3)
4. **SVG noise filter** adds subtle texture distortion to both elements

The glassmorphism effect is achieved through a sophisticated 3-layer system that creates the authentic frosted glass appearance with proper depth and lighting effects.

## **Complete CSS Classes**

### **Full CSS Definitions from globals.css**

```css
/* ========== GLASS LAYERS ========== */
.glass-filter {
  position: absolute;
  inset: 0;
  z-index: 0;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  filter: url(#lg-dist) saturate(150%);
  isolation: isolate;
}

.glass-filter-nav {
  position: absolute;
  inset: 0;
  z-index: 0;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  filter: url(#lg-dist) saturate(150%);
  isolation: isolate;
}

.glass-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: var(--lg-bg-color);
}

.glass-specular {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  overflow: hidden;
  box-shadow: inset 1px 1px 0 var(--lg-highlight),
    inset 0 0 5px var(--lg-highlight);
}

.glass-content {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 1rem 1.5rem 0.9rem;
}

/* ========== PICTURE CARD SPECIFIC ========== */
.glass-picture-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 420px;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.glass-picture-content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: end;
  overflow: hidden;
  border-radius: inherit;
}

@supports (backdrop-filter: blur(2px)) {
  .glass-filter {
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }
}
```

## **Implementation in Components**

### **Navbar Implementation** (src/components/ui/resizable-navbar.tsx)
```tsx
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-2xl bg-transparent px-4 py-2 lg:flex overflow-hidden",
        className,
      )}
    >
      {/* Glass morphism layers */}
      <div className="glass-filter-nav absolute inset-0"></div>
      <div className="glass-overlay absolute inset-0"></div>
      <div className="glass-specular absolute inset-0"></div>
      
      {/* Content layer */}
      <div className="relative z-10 flex w-full items-center justify-between">
        {children}
      </div>
    </motion.div>
  );
};
```

### **Hero Picture Implementation** (src/app/page.tsx)
```tsx
<div className="glass-picture-card">
  <div className="glass-filter"></div>
  <div className="glass-overlay"></div>
  <div className="glass-specular"></div>
  <div className="glass-picture-content">
    <div className="relative w-full h-full">
      <Image
        src="/me.png"
        alt="Luke Richardson"
        fill
        className="object-contain object-bottom"
        style={{ 
          objectPosition: 'center bottom',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
        priority
      />
    </div>
  </div>
</div>
```

### **SVG Filter Definition** (src/app/layout.tsx)
```tsx
{/* SVG FILTER DEFINITION for glassmorphism */}
<svg style={{ display: 'none' }}>
  <defs>
    <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
      <feDisplacementMap in="SourceGraphic" in2="blurred" scale="70" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
``` 