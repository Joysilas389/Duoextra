# DuoExtra — Brand Guidelines

## Brand Identity

**Name:** DuoExtra
**Tagline:** Master German. Pass your exam.
**Voice:** Encouraging, knowledgeable, exam-focused, friendly but serious

## Logo System

### Primary Logo
- Gradient mark "D" in rounded square + "DuoExtra" wordmark
- Mark: rounded-xl container, gradient from `brand-500` to `accent-500`
- Text: "Duo" in regular weight, "Extra" in gradient text
- Font: Outfit, Bold weight

### Icon-only Mark
- Rounded square with "D" letter
- Use for favicon, app icon, small contexts
- Min size: 24×24px

### Variants
- **Light background:** Full-color logo on white/light
- **Dark background:** White text with gradient mark
- **Monochrome:** Single-color version for special contexts

## Color System

### Primary Palette
```
Brand Blue:
  50:  #f0f7ff    (backgrounds)
  100: #dfeeff    (hover states)
  200: #b8ddff    (borders)
  300: #79c2ff    (accents)
  400: #36a5ff    (interactive)
  500: #0c85f2    ★ PRIMARY
  600: #0068cf    (hover)
  700: #0053a8    (pressed)
  800: #05478a    (dark mode primary)
  900: #0a3c72    (dark surfaces)
```

### Accent Palette
```
Accent Purple:
  500: #d63bfa    ★ ACCENT
  600: #bb19de
```

### Semantic Colors
```
Success:  #22c55e (green)
Warning:  #f59e0b (amber)
Error:    #ef4444 (red)
Fire:     #f97316 (streak/streak)
```

## Typography

### Font Stack
- **Display:** Outfit (headings, numbers, badges)
- **Body:** DM Sans (paragraphs, UI text)
- **Mono:** JetBrains Mono (code, technical)

### Scale
- Hero:     5xl (3rem) / Bold–ExtraBold
- H1:       2xl (1.5rem) / Bold
- H2:       lg (1.125rem) / Semibold
- H3:       base (1rem) / Semibold
- Body:     sm–base / Regular
- Caption:  xs (0.75rem) / Regular
- Badge:    xs / Medium, uppercase tracking

## Spacing & Layout

### Grid
- Max width: 1280px (7xl)
- Content: 6xl (1152px) for readability
- Sidebar: 256px expanded, 72px collapsed
- Gutter: 24px (6)

### Border Radius
- Cards/containers: 2xl (16px)
- Buttons: xl (12px)
- Inputs: xl (12px)
- Badges/pills: full (9999px)
- Avatar: full (circle)

### Shadows
- Card hover: `0 8px 30px rgba(0,0,0,0.08)`
- Glow (brand): `0 0 20px rgba(12,133,242,0.15)`
- Glow (accent): `0 0 20px rgba(214,59,250,0.15)`

## Iconography

- **Library:** Lucide React
- **Size:** 20px (w-5 h-5) default, 24px (w-6 h-6) feature cards
- **Style:** Outline, 1.5px stroke
- **Color:** Inherit from parent, or specific semantic color

## Animation

- **Transitions:** 200ms default, 300ms for layout shifts
- **Hover:** translateY(-2px) + shadow
- **Loading:** Spin animation on loader circles
- **XP gain:** Pop + fade up animation
- **Streak fire:** Pulsing glow filter

## Tone & Voice

### For Learners
- Encouraging: "Great job!" not "Correct."
- Specific: "Your grammar accuracy is 78%" not "Good progress"
- Motivating: "5 more words to hit your daily goal!"
- Exam-aware: "This task type appears in Goethe B1 Lesen Teil 2"

### For Errors
- Supportive: "Not quite — here's why..." not "Wrong."
- Educational: Always explain the correct answer
- Growth-oriented: "This is a common mistake at A2 level"

### For Admin/CMS
- Professional and clear
- Action-oriented labels
- Confirmation for destructive actions
