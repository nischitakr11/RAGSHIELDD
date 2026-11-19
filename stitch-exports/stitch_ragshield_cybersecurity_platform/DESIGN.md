---
name: Cryptographic Obsidian
colors:
  surface: '#131316'
  surface-dim: '#131316'
  surface-bright: '#39393c'
  surface-container-lowest: '#0e0e11'
  surface-container-low: '#1b1b1e'
  surface-container: '#1f1f22'
  surface-container-high: '#2a2a2d'
  surface-container-highest: '#353438'
  on-surface: '#e4e1e6'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e4e1e6'
  inverse-on-surface: '#303033'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#e1c384'
  on-secondary: '#3f2e00'
  secondary-container: '#584411'
  on-secondary-container: '#ceb275'
  tertiary: '#acdaa6'
  on-tertiary: '#103813'
  tertiary-container: '#91be8c'
  on-tertiary-container: '#264d26'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#fedf9e'
  secondary-fixed-dim: '#e1c384'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#584411'
  tertiary-fixed: '#c0efb9'
  tertiary-fixed-dim: '#a5d29e'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#284f28'
  background: '#131316'
  on-background: '#e4e1e6'
  surface-variant: '#353438'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: 0.04em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  mono-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes an ultra-premium, authoritative cybersecurity presence tailored for mission-critical enterprise AI, cryptographic provenance, and RAG knowledge integrity. Moving away from standard neon-hued cyber clichés, it fuses high-end editorial gravitas with deep technical rigor. 

The emotional tone balances absolute cryptographic certainty, institutional trust, and bespoke architectural prestige. Visual treatments rely on layered obsidian and deep charcoal glass slabs, refined 1px hairline amber-gold filigree borders, muted amber luminescence, and delicate radial noise. High-contrast typography transitions seamlessly between classical intellectual serif display headings and razor-sharp, systematic monospace telemetry.

## Colors

The palette is engineered specifically for deep-mode optical luxury and tactical clarity:

- **Primary (`#D4AF37`) & Secondary (`#E5C788`)**: Warm bronze and radiant champagne gold. Reserved for focal points, verified cryptographic traces, primary key buttons, and active lineage connectors.
- **Tertiary (`#80AC7B`)**: Muted botanical olive green. Communicates verifiable state validations, untampered ledger blocks, and active cryptographic proofs without screaming neon green.
- **Critical Status (`#E06C75` / `#B94A48`)**: Subdued crimson-coral for vector poison alerts, ledger discrepancies, and compromised hash integrity.
- **Backgrounds & Neutrals (`#09090B`, `#121215`, `#1C1C22`)**: Obsidian void base surfaces with subtle warm-charcoal gradations that ensure golden glow effects disperse naturally without banding.

## Typography

The typographic hierarchy establishes distinct roles:
- **Playfair Display**: Delivers timeless, high-stature editorial impact for hero titles, core cryptographic taglines, and marquee value propositions. Used with uppercase tracking for top-level brand nomenclature and italic styling for philosophical epigrams.
- **Plus Jakarta Sans**: Manages clean, frictionless readability across UI copy, analytical summaries, and functional interface components.
- **JetBrains Mono**: Strictly governs telemetry, SHA-256 hash displays, block transaction metadata, terminal overlays, and system tags.

## Layout & Spacing

A structured 12-column grid provides horizontal discipline, backed by an 8px vertical baseline rhythm. Spacing accommodates the visual weight of glowing borders and dark glass containers. 

On desktop viewports, margins breathe at 2rem to 4rem, focusing attention onto centered hero stages, pipeline visualizers, and audit cards. On mobile viewports, the grid condenses to 4 columns with 1rem margins, stacking cryptographic lifecycle steps into sequential, interconnected vertical cards linked by subtle golden circuit spine rules.

## Elevation & Depth

Visual depth is achieved through layered dark glassmorphism rather than muddy drop shadows:

- **Surface 0 (Canvas)**: Obsidian base `#09090B` enriched with an ultra-fine grain texture and soft radial ambient gold vignettes centered behind primary interactive clusters.
- **Surface 1 (Panels & Substrates)**: `#121215` with 70% opacity and 16px backdrop blur, framed with a 1px border gradient transitioning from `rgba(212, 175, 55, 0.25)` at the top edge to `rgba(255, 255, 255, 0.03)` at the bottom edge.
- **Surface 2 (Floating Modals & Interactive Nodes)**: `#1C1C22` with 85% opacity, 24px backdrop blur, elevated with an amber halo glow (`box-shadow: 0 0 35px -8px rgba(197, 160, 89, 0.18)`).
- **Hairline Accents**: Critical vector lines, provenance connections, and divider rules maintain an exact 1px thickness with dynamic alpha falloff.

## Shapes

The geometric framework balances technical precision with high-end tactile feel. Standard structural containers and cards utilize a crisp 8px radius (`roundedness: 2`), delivering clean modern corners that complement sharp 1px borders. Primary interactive CTAs, status pills, and cryptographic hash badges adopt a softer capsule contour (`rounded-xl` or full pill) to introduce warmth and invite touch against the architectural grid.

## Components

### Buttons
- **Primary CTA**: Champagne gradient background (`linear-gradient(135deg, #E5C788 0%, #C5A059 100%)`) with deep obsidian text (`#09090B`), semi-bold weight, subtle inset gold top highlight, and an exterior warm amber halo on hover.
- **Secondary / Ghost**: Semi-transparent dark glass fill, 1px perimeter border in `rgba(212, 175, 55, 0.4)`, champagne text, smoothly brightening to 100% border luminance on pointer focus.

### Cryptographic Hash & Verification Chips
- Displayed in `JetBrains Mono` with uppercase tracking.
- Backgrounds utilize muted obsidian glass with status-derived border accents: Olive (`rgba(128, 172, 123, 0.3)`) for verified zero-knowledge proofs, and Crimson (`rgba(224, 108, 117, 0.3)`) for anomaly detection. Includes a small pulsing 6px status gem.

### Input Fields & Search Bars
- Recessed `#0C0C0E` background with a subtle inner shadow, bordered by a default hairline of `rgba(212, 175, 55, 0.2)`. Focus states smoothly illuminate the border to `#D4AF37` with a 3px diffused outer gold haze. Monospaced placeholder text in muted bone.

### Ledger & Pipeline Cards
- Obsidian glass cards featuring top-edge golden lighting accents. Internal metadata arranged with clear visual hierarchy: display labels in uppercase mono, metrics in crisp sans-serif, and integrity statuses flagged with glowing isometric icons.