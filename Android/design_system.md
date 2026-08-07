# Trip Planner App - Design System & UI Guidelines

This document outlines the design system, color palette, typography, and component styling used across the React Native Expo app (located in the `Android` folder). It should serve as a reference for designing and developing future pages and components.

## 🎨 Color Palette

### Primary Colors
- **Brand Blue (Darker):** `#005ab5` - Used for primary accents, links, and the hero card background.
- **Brand Blue (Lighter):** `#2260FF` - Used primarily for main Call-to-Action (CTA) buttons.

### Neutrals & Backgrounds
- **App Background:** `#f7f9fb` - The main background color for screens like Login, SignUp, and Dashboard.
- **Card Background:** `#ffffff` (or `rgba(255, 255, 255, 0.96)`) - Used for form sheets, itinerary cards, and stat cards.
- **Secondary Backgrounds:** `#f2f4f6` - Used for secondary buttons and subtle section separations.

### Borders & Dividers
- **Light Border:** `#e0e3e5` - Used for card borders.
- **Input Border:** `#E5E7EB` - Used for text inputs and outlined buttons.
- **Divider Line:** `rgba(194, 198, 212, 0.5)` - Used for "OR" dividers in auth screens.

### Typography (Text Colors)
- **Primary Headings:** `#191c1e` (and `#1F2937`) - High contrast dark color for main titles, numbers, and primary button text.
- **Subtitles & Body:** `#424752` - Softer color for subtitles and descriptive text.
- **Secondary / Meta Text:** `#566069` - Used for dates, stats labels, and divider text.
- **Placeholder & Icons:** `#9CA3AF` - Used for input placeholders and generic icons.
- **White Text:** `#ffffff` - Used over dark or primary blue backgrounds.

### Status & Accent Colors
- **Error / Destructive:** `#EA4335` (e.g., Sign-out icon)
- **Success / Nature:** `#2E7D32` text/icon on `#E8F5E9` background (e.g., saved places)
- **Info / Confirmed:** `#0D47A1` text on `#E3F2FD` background (e.g., confirmed status badge)
- **Warning / Draft:** `#E65100` text on `#FFF3E0` background (e.g., draft status badge)

---

## 🔤 Typography

The app relies on default system fonts but strictly enforces weights and sizes for a consistent hierarchy:

- **Large Titles (H1):** `32px`, `fontWeight: '700'`
- **Section Titles (H2):** `24px` to `18px`, `fontWeight: '700'`
- **Card Titles:** `16px`, `fontWeight: '600'`
- **Subtitles / Body Text:** `16px` or `13px`, normal weight, with increased `lineHeight` (`24px` or `18px`) for readability.
- **Small Text / Labels:** `12px` to `14px`, often `fontWeight: '600'` if actionable (e.g., small buttons, links).

---

## 🧩 Component Styles

### Buttons
1. **Primary Button:**
   - **Height:** `56px`
   - **Border Radius:** `12px`
   - **Background:** `#2260FF`
   - **Shadow:** Blue-tinted shadow (`shadowColor: '#2260FF'`, opacity: `0.2`, radius: `6`, offset: `0, 4`)
2. **Google / Outline Button:**
   - **Background:** `#ffffff`
   - **Border:** `1px solid #E5E7EB`
   - **Shadow:** Very subtle dark shadow (`opacity: 0.05`, radius: `2`)
3. **Small View/Action Button:**
   - **Background:** `#f2f4f6`
   - **Padding:** `6px 12px`
   - **Border Radius:** `8px`

### Inputs (`CustomInput`)
- **Height:** `56px`
- **Border Radius:** `12px`
- **Background:** `#ffffff`
- **Border:** `1px solid #E5E7EB`
- **Features:** Left icon (`#9CA3AF`), toggleable right icon for passwords, subtle shadow for a premium feel.

### Cards & Containers
1. **Bottom Sheet Card (Auth Screens):**
   - Negative top margin to overlap the header image.
   - **Border Radius:** Top-left and Top-right `32px`.
   - **Shadow:** Premium elevated shadow (`shadowColor: '#3478d7'`, offset: `0, -4`, opacity: `0.08`, radius: `16`).
2. **Standard Content Cards (Itinerary, Stats):**
   - **Border Radius:** `16px`
   - **Background:** `#ffffff`
   - **Border:** `1px solid #e0e3e5`
3. **Hero Card:**
   - **Border Radius:** `20px`
   - **Background:** `#005ab5`
   - **Shadow:** Blue-tinted depth shadow (`opacity: 0.15`, radius: `8`)
   - **Padding:** `20px`

---

## 📐 Layout & Spacing
- **Horizontal Padding:** Globally `24px` for main containers and safe areas.
- **Section Spacing:** `28px` to `20px` between distinct vertical sections.
- **Item Gaps:** `12px` or `16px` between adjacent items (like stats cards or form inputs).
- **Icons:** Primarily using `@expo/vector-icons` (`Feather` and `MaterialIcons`). Standard sizes are `20px` for inputs/buttons and `24px`-`28px` for headers.
