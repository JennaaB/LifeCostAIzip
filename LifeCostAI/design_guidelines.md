# Lifestyle Spending Snapshot - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern fintech dashboards (Stripe, Plaid) and approachable financial tools (YNAB, Mint) to create a trustworthy yet friendly experience that makes financial insights accessible without intimidation.

## Core Design Principles
1. **Progressive Disclosure**: Simple form → insightful dashboard flow
2. **Trust Through Transparency**: Clear messaging about privacy and methodology
3. **Data as Storytelling**: Visualizations that reveal insights, not just numbers
4. **Approachable Sophistication**: Professional polish with warm, human touches

---

## Typography System

**Primary Font**: Inter (Google Fonts) - Modern, readable, professional
**Accent Font**: None needed - maintain consistency with Inter variable weights

**Hierarchy**:
- Hero Headlines: text-5xl to text-6xl, font-bold (48-60px)
- Section Headers: text-3xl to text-4xl, font-semibold (30-36px)
- Subsection Titles: text-xl to text-2xl, font-medium (20-24px)
- Body Text: text-base to text-lg (16-18px), font-normal
- Data Labels/Metrics: text-sm to text-base, font-medium
- Small Print/Captions: text-xs to text-sm (12-14px)

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6, p-8
- Section spacing: py-12, py-16, py-20
- Grid gaps: gap-4, gap-6, gap-8
- Card spacing: p-6, p-8

**Container Strategy**:
- Landing page: max-w-7xl centered
- Form sections: max-w-3xl centered for focused input
- Dashboard: max-w-screen-2xl for data density
- Text content: max-w-prose for readability

**Grid Systems**:
- Landing features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard cards: grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
- Form fields: single column (max-w-2xl) for focus

---

## Page Structures

### Landing Page (5-6 Sections)

**Hero Section** (h-screen or min-h-[600px]):
- Bold headline: "AI that reads your lifestyle — not your bank account"
- Supporting subheadline explaining the privacy-first approach
- Primary CTA: "Start Your Snapshot" button (large, prominent)
- Hero image: Modern illustration showing lifestyle activities (coffee, transit, fitness) transforming into data insights (NO actual photos, use abstract/illustrative style)
- Trust indicator: "No bank connections • No personal data • Free forever"

**How It Works** (3-column on desktop):
1. Answer lifestyle questions (icon: form/checklist)
2. AI analyzes your habits (icon: sparkles/brain)
3. See spending insights + global comparison (icon: chart/globe)

**Privacy Promise Section** (2-column split):
- Left: Bold statement about what we DON'T collect
- Right: Visual diagram or icon grid showing the secure, anonymous process

**Sample Insights Preview** (showcase section):
- Mock dashboard preview showing category breakdown
- Sample recommendation card
- Teaser of the global map feature

**Social Proof/Use Cases** (2-3 columns):
- "Planning a move?" - Use city comparison
- "Setting financial goals?" - See spending drivers
- "Curious about habits?" - Get instant insights

**Final CTA Section**:
- Centered, focused design
- Secondary button: "See Example Dashboard"
- Form begins immediately below (smooth scroll anchor)

### Lifestyle Form Interface

**Multi-step Form Design**:
- Progress indicator at top (step 1 of 7 style)
- One category per screen for focus:
  - Food & Dining
  - Transportation
  - Fitness & Wellness
  - Subscriptions & Entertainment
  - Shopping & Personal
  - Goals & Values
  - Review & Submit

**Form Component Style**:
- Large, tappable radio buttons and checkboxes
- Slider inputs for frequency ("Never" to "Daily")
- Text inputs with helpful placeholder examples
- Each question group in a card (rounded-lg, p-8)
- Navigation: "Back" and "Continue" buttons (Continue is primary)
- Save progress indicator

### Dashboard Layout

**Header Bar**:
- "Your Lifestyle Snapshot" title
- Refresh/Edit responses link
- Export/Share functionality

**Dashboard Grid** (asymmetric, data-focused):

**Row 1**: Hero Metric Card (full-width)
- Estimated monthly lifestyle cost (large text-6xl number)
- Confidence disclaimer: "Based on typical costs in [City]"
- Quick stat cards below: Top spending category, Biggest opportunity, Goal alignment score

**Row 2**: Split Layout
- Left (60%): Category Breakdown - Horizontal bar chart showing spending by category
- Right (40%): Top 3 Spending Drivers - Ranked list with actual habit descriptions

**Row 3**: Recommendations Section (3-column cards)
- Each card: Icon, suggestion title, potential monthly savings, action insight
- Cards tailored to stated goals (e.g., "Save for travel", "Reduce waste")

**Row 4**: Global Cost Comparison Map (full-width, tall section)
- Interactive world map with pins on major cities
- Tooltip on hover showing adjusted lifestyle cost
- List view alongside: City name, cost multiplier, adjusted total
- Cities to include: Calgary, Toronto, Vancouver, New York, San Francisco, Los Angeles, London, Paris, Berlin, Tokyo, Singapore, Sydney, Mexico City, São Paulo, Dubai (15 cities minimum)

---

## Component Library

### Cards
- Border: border rounded-lg
- Padding: p-6 to p-8
- Shadow: shadow-sm with subtle hover:shadow-md transition

### Buttons
**Primary**: Large (px-8 py-4), rounded-lg, font-semibold, text-lg
**Secondary**: Medium (px-6 py-3), rounded-lg, font-medium
**Tertiary**: Text-only links with underline decoration

### Data Visualizations
**Use Chart.js or Recharts**:
- Bar charts: Horizontal for category comparison
- Pie/Donut charts: If needed for proportion view
- Clean, minimal styling - no 3D effects
- Clear labels, readable axes
- Tooltips on hover with exact values

**Map Component**:
- Use Leaflet.js or Mapbox GL JS
- Custom markers for selected cities
- Zoom controls, pan enabled
- Click city pin → show detailed breakdown modal

### Form Elements
- Input fields: rounded-md, p-3, border-2, large touch targets
- Labels: font-medium, text-sm, mb-2
- Radio/checkbox groups: gap-3, clear visual selection state
- Range sliders: Visible track, large thumb, value label display

---

## Images

**Hero Image**: 
- Placement: Right side of hero section (40% width) or full-width background with overlay
- Style: Modern illustration/abstract composition showing lifestyle elements (coffee cup, transit card, shopping bag, gym equipment) connecting to data points/charts
- Aesthetic: Clean, contemporary, optimistic - avoid stock photos of people

**Form Section Background**:
- Optional subtle gradient or abstract pattern overlay
- Should not distract from form inputs

**Dashboard**: 
- No decorative images - let data visualizations be the visual focus
- Icons only for categories and recommendations

---

## Accessibility Standards
- Form inputs: All labeled, ARIA attributes, keyboard navigation
- Dashboard: Screen reader friendly chart descriptions, keyboard-accessible map controls
- Focus states: Visible outlines on all interactive elements
- Minimum touch target: 44x44px for mobile
- Color contrast: Minimum WCAG AA for all text

---

## Animations
**Minimal, Purposeful Only**:
- Form transitions: Subtle slide between steps (200ms ease)
- Dashboard load: Stagger chart appearances (100ms delay per element)
- Map interactions: Smooth zoom/pan only
- No scroll-triggered animations
- Button hover: Simple scale/shadow enhancement

This design creates a trustworthy, approachable experience that makes financial insights feel empowering rather than overwhelming - perfect for users seeking clarity about their lifestyle spending.