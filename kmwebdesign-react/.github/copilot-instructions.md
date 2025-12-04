# Kmwebdesign React Copilot Instructions

## Project Overview
A React + Vite portfolio site for Kmwebdesign featuring immersive 3D experiences using Three.js, real-time scroll animations with GSAP, and a modern UI built with Tailwind CSS. The site combines full-screen 3D background visuals with scrollable content sections.

## Architecture

### Core Stack
- **Framework**: React 19.2 with Vite 7.2 (ESM modules)
- **3D Rendering**: Three.js 0.181 with postprocessing (bloom, film effects)
- **Animations**: GSAP 3.13 with ScrollTrigger plugin
- **Styling**: Tailwind CSS 4.1 + custom CSS (Syncopate/Outfit fonts)

### Component Structure (`src/components/`)
- **ThreeWorld.jsx**: Full-screen Three.js scene with particles, rotating core, and rings. Uses `useEffect` + `useRef` to manage Three.js lifecycle. Creates canvas dynamically in a fixed container. State object tracks mouse, scroll, and rotation targets for smooth interactive animations.
- **Loader.jsx**: Dual useEffect: (1) progress bar animation with GSAP fade-out, (2) ScrollTrigger setup for glass-panel scroll animations
- **Navigation.jsx**: Fixed nav with IntersectionObserver to detect when home section scrolls out of view, adds backdrop blur dynamically
- **Hero.jsx** to **Footer.jsx**: Individual section components, mostly presentational. Use CSS classes and Tailwind for styling.

### Layout Flow (`src/App.jsx`)
```
<>
  <Loader /> (renders progress bar, sets up animations)
  <ThreeWorld /> (fixed canvas background)
  <Navigation /> (fixed nav, dynamic styling based on scroll)
  <main>
    <Hero /> → <About /> → <Services /> → <Work /> → <Testimonials /> → <Contact /> → <Footer />
  </main>
</>
```
The main content scrolls over the fixed 3D background. Z-index layering: Three.js canvas (-z-10), nav (z-40), content (z-10).

## Critical Patterns

### Three.js Integration
- Three.js World class instantiated inside `useEffect` hook to avoid re-renders
- State variables stored outside component (in closure) to persist across renders without React
- `animate` method bound with arrow function to maintain `this` context in requestAnimationFrame
- Canvas created dynamically: `document.createElement('canvas')` → appended to ref container
- Cleanup: dispose renderer and remove canvas on unmount
- **Key insight**: Three.js code should NOT trigger React re-renders; it runs independently in the animation loop

### Styling Conventions
- **CSS Variables** (`index.css`): `--color-bg`, `--color-primary`, `--color-secondary`, font families. Used in both CSS and Tailwind
- **Tailwind Patterns**: 
  - `glass-panel` class for frosted glass effect (backdrop blur + semi-transparent bg)
  - Neon effects: `neon-text-cyan` / `neon-text-pink` for text-shadow glows
  - Glitch animation: `.glitch-wrapper` with pseudo-elements and clip-path animations
  - Layout: `relative z-10` for content, `fixed inset-0` for full-screen backgrounds
- **Custom Animations**: All defined in `index.css` (@keyframes)—update here, not in Tailwind config

### GSAP + ScrollTrigger Usage
- **Loader.jsx**: Registers ScrollTrigger plugin globally with `gsap.registerPlugin(ScrollTrigger)`
- **Pattern**: `gsap.from(element, { scrollTrigger: { trigger, start, toggleActions }, ...props })`
- `toggleActions: "play none none reverse"` = play on enter, reverse on scroll back
- Selector queries (`document.querySelectorAll('.glass-panel')`) run in useEffect to target rendered DOM elements

### Component Data Flow
- **Stateless sections**: Most components (Hero, About, Services, etc.) accept no props—data is hardcoded
- **Contact.jsx**: Only stateful component, uses `useState` for form data
- **No context/Redux**: Each component manages its own behavior via useEffect
- **Scroll state**: Managed implicitly via browser scroll + event listeners in ThreeWorld, Navigation, Loader

## Development Workflow

### Commands
- `npm run dev` – Start Vite dev server (http://localhost:5173)
- `npm run build` – Production build to `dist/`
- `npm run lint` – Run ESLint (config: `eslint.config.js`)
- `npm run preview` – Preview production build locally

### Adding New Sections
1. Create component in `src/components/` (e.g., `Gallery.jsx`)
2. Import in `App.jsx` and add to `<main>` JSX
3. Use id-based anchor links for navigation (e.g., `id="gallery"`)
4. Apply Tailwind + glass-panel classes for consistency
5. If animation needed: add CSS keyframes to `index.css` OR useEffect with GSAP in Loader

### Modifying 3D Scene
- Edit ThreeWorld.jsx: adjust `CONFIG` object for colors/bloom, modify `initObjects()` for geometries, `initLights()` for lighting
- Keep `animate()` method clean—avoid complex logic; use state object for reactive values
- Test on different screen sizes: `onWindowResize()` handles canvas scaling

### Styling a New Component
- Use Tailwind classes first (tailwind.config.js has `font-display` and `font-body` extensions)
- For complex effects, add CSS to `index.css` with custom classes
- Reference color variables: `--color-primary` (#00f3ff cyan), `--color-secondary` (#ff0055 pink)
- Glass effect: wrap in `glass-panel` class

## Key Files & Configurations

| File | Purpose |
|------|---------|
| `src/App.jsx` | Entry point, orchestrates component layout |
| `src/components/ThreeWorld.jsx` | Three.js scene setup, interactive background |
| `src/index.css` | Global styles, CSS variables, animations, Tailwind directives |
| `tailwind.config.js` | Font extensions (Syncopate, Outfit) |
| `postcss.config.js` | Tailwind + autoprefixer pipeline |
| `vite.config.js` | Vite + React plugin setup |
| `index.html` | Meta tags (SEO), Google Fonts link, root div |

## Common Tasks

### Adjust 3D Scene Colors
Edit `ThreeWorld.jsx` → `CONFIG.colors` (hex values) or `CONFIG.bloom` for post-processing strength

### Change Primary Accent Color
Update CSS variable in `src/index.css:root` (e.g., `--color-primary: #00f3ff`), propagates to all Tailwind cyan-400 references

### Add Scroll-Triggered Animation to New Element
Add `glass-panel` class to trigger GSAP animation (registered in Loader.jsx), OR add custom GSAP code in Loader's second useEffect

### Debug Three.js Issues
- Check if canvas is appended: `document.querySelector('canvas')`
- Verify renderer size: open DevTools → check canvas dimensions vs window
- Monitor FPS: add `stats.js` or check browser performance profiler

## Edge Cases & Gotchas

1. **Three.js Cleanup**: Must dispose of renderer, geometry, and material to prevent memory leaks. Currently handled on unmount but verify if adding WebGL extensions.

2. **Canvas Overlap**: Three.js canvas is `z-index: -1`, so it doesn't receive clicks. Content must be layered above (z-10+). Never reduce navigation z-index below 40.

3. **Scroll Performance**: ScrollTrigger queries DOM on every scroll event. Limit number of animated elements or use event delegation.

4. **Font Loading**: Google Fonts linked in `index.html`. If adding new fonts, update both HTML link AND `tailwind.config.js` `fontFamily` extensions.

5. **Responsive Canvas**: `onWindowResize()` in ThreeWorld scales canvas—test on mobile to ensure 3D scene renders at correct aspect ratio.

## Testing & Validation

- **Visual**: Open `http://localhost:5173`, scroll through all sections, verify 3D background animates smoothly
- **Interactive**: Move mouse to confirm rotation, check scroll animations trigger at correct breakpoints
- **Responsive**: Test mobile, tablet, desktop viewports in DevTools
- **Performance**: Check DevTools Performance tab during scroll—target 60 FPS
- **Lint**: `npm run lint` before commits (ESLint configured in `eslint.config.js`)
