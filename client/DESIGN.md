# Crumb & Bloom — Shared Design Contract (DESIGN.md)

---

## 1. Design Source of Truth

- **Stitch Project Name**: `Crumb & Bloom Artisan Bakery System`
- **Stitch Project ID**: `9798473648806480910`
- **Visual Design Philosophy**: *"Warm Editorial Craft & Modern Structured Minimalism"*
- **Authority**: Google Stitch is the strict visual source of truth for all frontend interfaces in this repository.
- **Screen Coverage**: Complete desktop (2560px / 1440px / 1280px) and mobile (780px / 390px) screen pairs are available for every critical user journey across both customer-facing storefront flows and owner/staff back-of-house operations.

> [!IMPORTANT]
> Both frontend developers must consult this document (`client/DESIGN.md`) before creating components, applying CSS styles, or introducing new layout patterns. No ad-hoc colors, arbitrary paddings, or alternative component libraries are permitted.

---

## 2. Design Principles

The Stitch designs establish a deliberate equilibrium between artisan heritage and high-efficiency operational tooling:

1. **Warm Editorial Craft for Customer Storefront**:
   - Evokes the sensory tactile experience of a slow-ferment hearth bakery: unbleached stone-ground flour, roasted grains, and warm morning light.
   - Generous breathing room (`space-xl`, `space-2xl`), refined editorial typography (`Playfair Display`), and natural oat-toned hairline dividers (`#E6DFD5`).
   - Relaxed pacing that prioritizes loaf provenance, hydration percentages, and clear pickup reservation steps.

2. **Modern Structured Density for Bakehouse Operations**:
   - High information density designed for active bakery production, dawn bake run-sheets, and flour silo tracking.
   - Compact vertical rhythm (`space-xs` to `space-md`), tabular precision, and monospaced numerical metrics (`JetBrains Mono`).
   - Fast operational toggles, visual deficit alerts, and an interactive Ingredient Readiness Engine.

3. **Tactile Physical Surfaces Without Artificial Skeuomorphism**:
   - Layered planes using warm ambient diffusion rather than heavy digital drop shadows.
   - Distinct surface separation: warm unbleached flour canvas (`#FAF7F2` / `#FCF9F4`), secondary inset panels (`#F6F3EE`), and crisp elevated hearth-white cards (`#FFFFFF`).

4. **Clarity and Low Friction**:
   - Semantic status chips explicitly pairing background, text, and colored beacon dots.
   - High-contrast text inks (`#1C1C19` / `#2C221E`) for effortless legibility across floured screens and sunny store counters.

---

## 3. Color System

The color palette draws directly from artisan baking materials: stone-milled flour, deep caramelized crusts, terracotta baking stones, and kitchen herbs.

*Note: Stitch exhibits slight tonal variations between primary brand drivers in marketing hero contexts versus interactive UI buttons. Both explicit values are documented below.*

| Token | Hex Value | Semantic Role & Where Observed |
| :--- | :--- | :--- |
| **`primary`** | `#531B00` / `#9F3E07` / `#C05621` | Deep roasted crust / warm terracotta. Used for main brand headlines, primary CTA buttons, active tab underlines, and order highlights. |
| **`primary-container`** | `#C05621` / `#712F0F` | Terracotta fill for high-intent interactive buttons (e.g., `Add to Cart`, `Schedule New Batch`, cart header pill). |
| **`primary-hover`** | `#A04000` / `#54220B` | Deep baked cinnamon. Applied on button hover, pressed states, and active focus rings. |
| **`background` / `canvas`** | `#FAF7F2` / `#FCF9F4` | Base canvas layer representing unbleached flour. Global body background. |
| **`surface`** | `#FCF9F4` | Top application headers, sticky sub-bars, and base page canvas. |
| **`surface-card` / `container-lowest`** | `#FFFFFF` | Crisp hearth white. Elevated product cards, modal dialogues, data table containers, and form inputs. |
| **`surface-container-low`** | `#F6F3EE` | Oatmeal wash. Used for staff sidebar navigation, table header rows, and secondary wells. |
| **`surface-container`** | `#F0EDE9` | Inactive filter chips, category background containers, and sub-panels. |
| **`surface-container-high`** | `#EBE8E3` | Announcement top bar, badge wells, and structural borders. |
| **`on-surface` / `text-primary`** | `#1C1C19` / `#2C221E` | Roasted espresso bean. Main readable text, headings, and high-contrast table data. |
| **`secondary` / `text-secondary`** | `#695C57` / `#5C4D44` | Warm cocoa husk. Subtitles, metadata, form labels, and table column headers. |
| **`muted` / `text-muted`** | `#8A7268` / `#8C7B70` | Milled rye dust. Form placeholders, disabled button text, and inactive breadcrumbs. |
| **`border-subtle` / `outline-variant`**| `#E6DFD5` / `#DAC1B8` | Hairline card outlines, horizontal dividers, and secondary button borders. |
| **`border-strong` / `outline`** | `#D8CFC4` / `#87736B` | Defined form input borders, active table outlines, and modal borders. |
| **`success-base` / `tertiary`** | `#4A6B53` / `#43644C` | Rosemary green. Status dots and icons for "In Stock", "Ready", and fulfilled orders. |
| **`success-bg` / `tertiary-fixed`** | `#E8EFE9` / `#C7ECCE` | Soft sage wash. Background for healthy inventory badges and completed order chips. |
| **`success-text`** | `#2D4733` / `#01210F` | Deep rosemary ink for positive status chip text. |
| **`warning-base` / `accent-caramel`**| `#D97706` | Toasted glaze / amber. Pulsing indicators for low stock, proofing progress, and pending hearth allocation. |
| **`warning-bg`** | `#FEF3E2` | Light honey background for warning cards and threshold alerts. |
| **`warning-text`** | `#8A4A00` | Deep amber ink for warning labels and shortage notifications. |
| **`destructive` / `error`** | `#BA1A1A` / `#B91C1C` | Rust ember. Out-of-stock badges, critical ingredient deficits, form errors, and cancelled orders. |
| **`destructive-bg` / `error-container`**| `#FDE8E8` / `#FFDAD6`| Pale rust wash for error alerts and depleted larder rows. |
| **`destructive-text`** | `#7F1D1D` / `#93000A` | Deep rust ink for destructive action text and critical error banners. |

---

## 4. Typography

The typographic hierarchy balances an organic editorial serif, a clean humanist sans-serif, and a precision monospaced font.

| Token | Font Family | Size | Weight | Line Height | Letter Spacing | Usage |
| :--- | :--- | ---:| ---:| ---:| :--- | :--- |
| **`display-hero`** | `Playfair Display` | 48px | 600 (SemiBold) | 56px | `-0.02em` | Desktop hero headlines, major marketing landmarks |
| **`display-hero-mobile`** | `Playfair Display` | 34px | 600 (SemiBold) | 42px | `-0.01em` | Mobile hero headlines |
| **`headline-lg`** | `Playfair Display` | 32px | 600 (SemiBold) | 40px | `-0.015em` | Page titles (Storefront, Inventory, Orders) |
| **`headline-lg-mobile`**| `Playfair Display` | 26px | 600 (SemiBold) | 34px | `-0.01em` | Mobile page titles |
| **`headline-md`** | `Playfair Display` | 24px | 600 (SemiBold) | 32px | `-0.01em` | Section titles, brand logo title, modal headers |
| **`headline-sm`** | `Playfair Display` | 20px | 600 (SemiBold) | 28px | Normal | Product card titles, bento metric values, sub-headers |
| **`title-md`** | `Plus Jakarta Sans` | 16px | 600 (SemiBold) | 24px | Normal | Tab active titles, primary button text, dialog subheadings |
| **`title-sm`** | `Plus Jakarta Sans` | 14px | 600 (SemiBold) | 20px | Normal | Navigation links, table row titles, field labels |
| **`body-lg`** | `Plus Jakarta Sans` | 16px | 400 (Regular) | 26px | Normal | Editorial narrative paragraphs, intro summaries |
| **`body-md`** | `Plus Jakarta Sans` | 14px | 400 (Regular) | 22px | Normal | Standard body text, form descriptions, table data |
| **`body-sm`** | `Plus Jakarta Sans` | 12px | 400 (Regular) | 18px | Normal | Secondary metadata, helper text, breadcrumbs |
| **`label-numeric`** | `JetBrains Mono` | 13px | 500 (Medium) | 18px | `-0.02em` | Prices (`$14.00`), weights (`850g`), hydration (`78%`), timer clocks, SKU / Order IDs |
| **`label-badge`** | `Plus Jakarta Sans` | 11px | 600 (SemiBold) | 14px | `+0.04em` | Uppercase pill labels, status chips, table headers |

---

## 5. Spacing System

Built on an 8pt base grid with a 4pt sub-grid for badges and table rows:

| Token | Value | Typical Usage |
| :--- | :--- | :--- |
| **`space-3xs`** | `0.125rem` (2px) | Hairline status dot padding, inline tag borders |
| **`space-2xs`** | `0.25rem` (4px) | Sub-grid spacing, small pill padding, segmented control gaps |
| **`space-xs`** | `0.5rem` (8px) | Button gap, chip margin, input icon padding |
| **`space-sm`** | `0.75rem` (12px) | Compact card padding, table vertical cell padding, form group gap |
| **`space-md`** | `1rem` (16px) | Standard card padding, modal content gap, mobile gutter |
| **`space-lg`** | `1.5rem` (24px) | Section gap on tablet/desktop, desktop gutter margin |
| **`space-xl`** | `2rem` (32px) | Major card padding, modal internal padding, page section gap |
| **`space-2xl`** | `3rem` (48px) | Hero section vertical padding, storefront section transitions |
| **`space-3xl`** | `4.5rem` (72px) | Major editorial division on wide screens |
| **`gutter-mobile`** | `1rem` (16px) | Left/right outer margins on viewports `< 640px` |
| **`gutter-desktop`**| `1.5rem` (24px) | Left/right outer margins on viewports `≥ 1024px` |
| **`container-max`** | `76rem` (1216px)| Centered maximum width container |

---

## 6. Shape, Borders & Elevation

### Corner Radius
- **Badges, Status Chips, Filter Pills**: `rounded-full` (`9999px`)
- **Buttons, Form Inputs, Table Rows**: `rounded-md` (`0.375rem` / `6px`) or `rounded-lg` (`0.5rem` / `8px`)
- **Cards, Bento Containers**: `rounded-lg` (`0.5rem` / `8px`) or `rounded-xl` (`0.75rem` / `12px`)
- **Modals / Dialogs**: `rounded-2xl` (`1rem` / `16px`)

### Borders
- **Subtle Borders**: `1px solid #E6DFD5` (`border-outline-variant`). Applied to all standard card outlines, table row dividers, and inactive tabs.
- **Strong Borders**: `1px solid #D8CFC4` (`border-outline`). Applied to form inputs, search bars, and active containers.
- **Active / Focused Borders**: `1.5px` or `2px solid #C05621` with subtle terracotta focus ring.

### Elevation & Shadows
- **Resting Card Shadow**:  
  `box-shadow: 0 1px 2px 0 rgba(44, 34, 30, 0.04), 0 0 0 1px #E6DFD5;`  
  A crisp hairline outline combined with a faint warm umber ambient whisper.
- **Interactive Card Hover**:  
  `box-shadow: 0 4px 14px -2px rgba(44, 34, 30, 0.09), 0 0 0 1px #D8CFC4;`  
  `transform: translateY(-2px);`
- **Dialogs & Floating Overlays**:  
  `box-shadow: 0 12px 28px -4px rgba(44, 34, 30, 0.12), 0 0 0 1px #D8CFC4;`  
  Grounds modals over a dimmed backdrop (`bg-inverse-surface/40 backdrop-blur-[2px]`).

---

## 7. Buttons

All buttons share transition timings (`transition-all duration-150 active:scale-[0.98]`):

1. **Primary Button**:
   - Background: `#C05621` (or `#531B00`)
   - Text: `#FFFFFF` (`font-title-sm`, font-semibold)
   - Border: None (or subtle `border border-[#712F0F]`)
   - Hover: Background `#A04000` (`#54220B`)
   - Radius: `rounded-lg` (`8px`)
2. **Outline / Secondary Button**:
   - Background: Transparent or `#FFFFFF`
   - Text: `#2C221E` (`font-title-sm`, font-medium)
   - Border: `1px solid #D8CFC4`
   - Hover: Background `#F6F3EE`, border `#8A7268`
   - Radius: `rounded-lg` (`8px`)
3. **Ghost Button**:
   - Background: Transparent
   - Text: `#5C4D44`
   - Border: None
   - Hover: Background `#F0EDE9`, text `#1C1C19`
   - Radius: `rounded-md`
4. **Pill / Category Filter Button**:
   - Shape: `rounded-full`
   - Padding: `px-3.5 py-1.5`
   - Inactive: Background `#FFFFFF`, border `#E6DFD5`, text `#5C4D44`, hover `#F6F3EE`
   - Active: Background `#C05621`, text `#FFFFFF`, border-transparent, font-semibold
5. **Icon Action Button**:
   - Square target (`h-9 w-9` or `p-2`)
   - Text: `#5C4D44`, hover `#C05621`, hover background `#F6F3EE`
   - Radius: `rounded-md`

---

## 8. Badges & Status Indicators

Status badges follow an explicit three-part composition:  
`[Container Pill] + [6px Status Dot] + [Uppercase Text Label]`

```text
┌─────────────────────────────────────────┐
│  ●  IN STOCK (4 REMAINING)              │
└─────────────────────────────────────────┘
```

### Semantic Status Palette

| State | Background | Text | Dot Indicator | Where Used |
| :--- | :--- | :--- | :--- | :--- |
| **In Stock / Ready** | `#E8EFE9` | `#2D4733` | `#4A6B53` (solid) | Product catalog cards, healthy larder ingredients |
| **Low Stock / Deficit Alert** | `#FEF3E2` | `#8A4A00` | `#D97706` (pulsing) | Low flour/butter stocks, batch cutoff alerts |
| **Sold Out / Depleted** | `#FDE8E8` | `#7F1D1D` | `#B91C1C` (solid) | Sold out products, zero inventory larder items |
| **Pending Hearth Allocation** | `#FEF3E2` | `#8A4A00` | `#D97706` (solid) | Orders waiting for bake schedule verification |
| **Baking / Oven Active** | `#FEEDD8` | `#763313` | `#C05621` (flame pulse) | Orders in proofing or oven stages |
| **Completed / Picked Up** | `#E8EFE9` | `#2D4733` | `#4A6B53` (check icon) | Finished customer orders |
| **Cancelled** | `#FDE8E8` | `#7F1D1D` | `#B91C1C` (cross) | Voided orders |
| **Batch / SKU Tag** | `#F6F3EE` | `#5C4D44` | None (border `#E6DFD5`) | Category markers, batch IDs (`Batch #84`) |

---

## 9. Forms & Inputs

1. **Input Fields (`<input>`, `<select>`, `<textarea>`)**:
   - Background: `#FFFFFF`
   - Border: `1px solid #D8CFC4` (`rounded-lg`)
   - Padding: `px-3.5 py-2.5` (`text-sm font-body-md text-on-surface`)
   - Placeholder: `#8C7B70`
   - Focus State: `border-color: #C05621; box-shadow: 0 0 0 2px rgba(192, 86, 33, 0.2); outline: none;`
2. **Form Labels**:
   - Typography: `font-title-sm text-xs font-semibold text-on-surface`
   - Required Indicator: `<span class="text-error ml-0.5">*</span>`
   - Helper Text: `text-xs text-secondary font-body-sm mt-1`
3. **Validation & Error Messages**:
   - Invalid border: `border-error (#BA1A1A)`
   - Error Text: `text-xs text-error font-body-sm flex items-center gap-1 mt-1`
   - Form Error Banner: `bg-error-container text-on-error-container border border-error/30 p-4 rounded-lg`
4. **Field Spacing**:
   - Vertical gap between field groups: `space-y-4` or `space-y-5`

---

## 10. Cards

1. **Resting Card (`tactile-card`)**:
   - Background `#FFFFFF`, border `1px solid #E6DFD5`, `rounded-lg` or `rounded-xl`, subtle resting shadow.
2. **Interactive Hover Card**:
   - Used for selectable catalog products and order tickets. Adds `hover:translate-y-[-2px]` and warm hover shadow.
3. **Product Card**:
   - Image container on top (`h-56` or `h-64` with overflow hidden).
   - Floating status chip top-left, category badge top-right.
   - Content area: Serif title (`headline-sm`), monospaced price (`label-numeric`), short description, footer action.
4. **Metric Bento Card (Owner Dashboard)**:
   - Padding `p-4`, rounded `rounded-xl`, border `#E6DFD5`.
   - Micro-label top-left (`label-badge`), icon top-right, large serif counter (`headline-md`), and status subtitle.
   - Low-stock card variant uses a 2px vertical amber stripe on the right edge (`bg-[#D97706]`).
5. **Operational Pipeline Card**:
   - Used in Ingredient Readiness Engine. Displays required amount, in-stock amount, and shortfall progress indicator.

---

## 11. Navigation

### Customer Navigation
- **Announcement Bar**:
  - Sticky at top or above main header, background `#EBE8E3`, border-b `#E6DFD5`, py-2.5 px-4.
  - Displays next hearth drop time, batch capacity progress (e.g. `78% pre-reserved`), and pickup location.
- **Top Header (`h-16`)**:
  - Sticky, background `#FCF9F4`, border-b `#E6DFD5`.
  - Brand identity on left: Serif logo `Crumb & Bloom` with micro subtitle `Micro-Bakery & Hearth`.
  - Center navigation links: `Home`, `Products`, `About the Mill`, `Bakehouse Note`.
  - Active link indicator: Solid terracotta bottom border (`border-b-2 border-primary pb-1 font-semibold text-primary`).
  - Right action cluster: Search icon button, Account portal button, and Cart pill button.
- **Cart Button**:
  - Fill `#C05621`, text `#FFFFFF`, rounded `rounded-xl`, padding `px-3.5 py-2`.
  - Contains bag icon, label `Cart`, and nested dark pill displaying item count & price (`2 · $24.50`).

### Owner / Staff Navigation
- **Fixed Sidebar Navigation (`w-64` / `16rem`)**:
  - Docked to viewport left (`fixed left-0 top-0 h-screen`), background `#F6F3EE`, border-r `#E6DFD5`.
  - Brand header: Bakehouse icon seal inside `#C05621` square, title `Crumb & Bloom`, subtitle `Bakehouse Hub · Ops`.
  - Quick CTA button: `+ Schedule New Batch` or `+ Add Ingredient` spanning full sidebar width.
  - Nav items: `Dashboard`, `Products`, `Orders`, `Inventory`, `Account/Schedule`.
  - Active nav item: Background `#FFFFFF`, left border `border-l-4 border-primary`, text `#C05621`, font-semibold.
  - Count badges on nav items (e.g., `42` on Orders, amber warning dot on Inventory).
  - Sidebar footer: `Storefront Hub` switch button with external arrow, settings link, and active Baker Profile avatar.
- **Top Operational Sub-Header (`h-16`)**:
  - Positioned at `pl-64` (clearing sidebar), background `#FCF9F4/90 backdrop-blur-md`, border-b `#E6DFD5`.
  - Breadcrumb trail on left, live operational badge (e.g., `Hearth Stone 240°C · Ready`), and view mode switcher.

---

## 12. Customer Experience Patterns

1. **Home (`/`)**:
   - Hero section with editorial statement, live batch badge (`Batch #84 Open`), and primary CTA button.
   - Provenance showcase with artisan photography and 3-step hearth process cards.
2. **Weekly Bake Menu & Pre-orders (`/products` or `/menu`)**:
   - Category filter pills (`All`, `Cakes`, `Cupcakes`, `Brownies`, `Loaves & Buns`).
   - Sort dropdown (`Featured / Availability`, `Price: Low to High`, etc.).
   - Grid of product cards with real-time remaining loaf counts.
3. **Product Details (`/products/:id`)**:
   - 2-column layout: Large photography gallery on left; bread profile, flour provenance, hydration stats (`JetBrains Mono`), allergen warning, and `Add to Order` panel on right.
4. **Shopping Cart (`/cart` or Drawer)**:
   - Itemized list with thumbnail, product title, unit price, quantity adjuster (`- [qty] +`), and delete action.
   - Sticky order summary card with Subtotal, Packaging fee, and Porchside Pickup reminder.
5. **Checkout (`/checkout`)**:
   - 3-step linear flow: Customer Details (Name, Phone for SMS alerts), Porch Pickup Slot selection, and Payment/Reservation confirmation.
6. **Order Confirmation & Pickup Pass (`/order-confirmation/:id`)**:
   - Big checkmark hero, Order ID (`#ORD-XXXX`), digital Porchside Pickup Pass card with QR code placeholder, pickup address, and Google Calendar add link.
7. **My Orders (`/my-orders`)**:
   - Tabbed history showing `Active Pickups` and `Past Hearth Drops`. Each order displays status badge, items list, and re-order button.
8. **Authentication (`/login`, `/register`)**:
   - Split layout: Editorial bakery narrative card on left; tabbed Customer vs Staff auth form on right.

---

## 13. Owner / Staff Experience Patterns

1. **Dashboard (`/app`)**:
   - Top Bento grid of 4 operational metric cards.
   - Bake Day Run-Sheet table showing today's fermentation and oven schedule.
   - Recent orders queue with one-click status transitions.
2. **Product Management (`/app/products`)**:
   - Master list of baked goods with batch pricing, recipe links, active menu toggles, and edit modal triggers.
3. **Order Management (`/app/orders`)**:
   - Filterable ledger with tabs (`All`, `Pending Allocation`, `In Oven`, `Ready for Porch`, `Fulfilled`).
   - Print Bag Tag and Fulfillment Slip action triggers.
4. **Order Details & Ingredient Readiness Engine (`/app/orders/:id`)**:
   - 5-stage progression pipeline (`Order Placed` → `Recipe Allocation` → `Mixing & Bake` → `Porchside Stocked` → `Claimed`).
   - Interactive Ingredient Readiness audit table.
5. **Inventory Management (`/app/inventory`)**:
   - Master larder table with flour silos, dairy fats, and seeds.
   - Real-time stock progress bars indicating percentage against safety reserve cap.
6. **Add / Edit Inventory (`/app/inventory/new` or Drawer)**:
   - Drawer/modal form to log incoming farm shipments: Name, Category, Measurement Unit selector (`kg`, `g`, `L`, `ml`, `pcs`), Current Stock, and Minimum Threshold.

---

## 14. Product UI

- **Image Container**: Aspect ratio 4:3 or 16:10, warm rounded corners (`rounded-t-lg`), subtle zoom on hover (`group-hover:scale-105 duration-300`).
- **Product Badges**: Top-left status pill (`Available (4 remaining)` in green, or `Sold Out` in red). Top-right category chip (`Cakes`).
- **Typography**: Title in `font-headline-sm text-primary`, price right-aligned in `font-label-numeric text-primary font-semibold`.
- **Hydration / Flour Subtitle**: Muted text e.g., *"82% Hydration • Cairnspring Yecora Rojo"*.
- **Add-to-Cart Trigger**: Button with shopping bag icon. If sold out, button is disabled with text *"Allotment Filled"*.

---

## 15. Cart & Checkout UI

- **Quantity Controller**:
  - Segmented control: `[-]` button (w-8 h-8), monospaced numeric counter (`w-10 text-center font-label-numeric`), `[+]` button (w-8 h-8).
  - Subtle border `#D8CFC4`, rounded `rounded-md`.
- **Order Summary Card**:
  - Border `#E6DFD5`, background `#FFFFFF`, rounded `rounded-xl`, padding `p-6`.
  - Itemized rows: Subtotal, Local Baker Tax, Porch Packaging, Grand Total in bold `text-lg font-headline-md`.
- **Pickup Time Selector**:
  - Radio card grid with selectable time slots (e.g. `Friday 08:00 - 09:30 AM`). Active card has terracotta border and background `#FEF3E2/30`.
- **Mobile Checkout CTA**:
  - Fixed bottom sticky bar on mobile devices (`< 640px`) containing price total and full-width `Confirm Pre-order` button.

---

## 16. Order UI

- **Order Identification**: Rendered as `font-headline-lg text-primary` (e.g., `Order #ORD-1025`).
- **Date & Slot Annotation**: `Slot: Friday Nov 15 • 10:00 AM Porchside` in `font-label-numeric text-secondary`.
- **Pickup Pass Card**:
  - Crisp white container styled like a physical baker's tag with scalloped or dashed hairline border.
  - High-contrast pickup code, instructions for porch locker cubby number, and contact hotline.

---

## 17. Inventory UI

- **Master Table Columns**:
  1. `Ingredient & Provenance Specs` (Title, variety, supplier)
  2. `Category & Larder Bin` (Dairy, Flour, Seed + Shelf ID)
  3. `Available vs Reserve` (On-hand quantity with percentage progress bar)
  4. `Min Threshold` (Safety reserve cap)
  5. `Batch Health Status` (Semantic status chip)
  6. `Actions` (`Update` button trigger)
- **Stock Progress Bar**:
  - Height `h-1.5`, background `#E5E2DD`, rounded `rounded-full`.
  - Healthy fill: `#4A6B53` (Rosemary Green).
  - Warning/Deficit fill: `#D97706` (Amber).
  - Depleted fill: `#BA1A1A` (Rust Red).
- **Mobile Inventory Representation**:
  - On screens `< 640px`, tables collapse into stacked cards with clear stock deficit tags and quick `Update` action.

---

## 18. Ingredient Readiness Engine

The Ingredient Readiness Engine is a key differentiating feature of the Crumb & Bloom system. It validates whether an order or batch can be fulfilled based on current larder stocks.

### Visual Representation Rules

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Cairnspring Yecora Rojo Flour                                          │
│ Required: 1,200 g   •   Available: 4,500 g   •   Surplus: +3,300 g     │
│ [==============================                      ] 100% SUFFICIENT │
│ Status: [ ● READY TO MIX ]                                             │
├────────────────────────────────────────────────────────────────────────┤
│ Normandy Cultured Butter (84% Fat)                                     │
│ Required: 500 g     •   Available: 200 g     •   Shortage: -300 g      │
│ [============                                        ] 40% DEFICIT     │
│ Status: [ ● DEFICIT ALERT — 300g NEEDED ]                              │
└────────────────────────────────────────────────────────────────────────┘
```

1. **Required Quantity**: Displayed in `font-label-numeric` with label `Required: [value] [unit]`.
2. **Available Quantity**: Real-time larder balance from database in `font-label-numeric`.
3. **Sufficient Inventory**:
   - Progress bar fills 100% with `#4A6B53` (Rosemary Green).
   - Status Badge: Background `#E8EFE9`, text `#2D4733`, solid green dot `#4A6B53`, label `Sufficient Stock`.
4. **Insufficient Inventory & Exact Shortage**:
   - Shortage Calculation: `Shortage = Required - Available`.
   - Shortage tag: Highlighted in amber or rust red: `text-[#8A4A00] font-semibold` (e.g. `Deficit: 300 g needed`).
   - Progress bar: Width set to `(Available / Required) * 100%`, filled with amber `#D97706` or red `#BA1A1A`.
   - Status Badge: Background `#FEF3E2`, text `#8A4A00`, pulsing amber dot, label `Deficit Alert`.
5. **Batch Readiness Banner**:
   - If all ingredients are sufficient: Green banner `Ready for Hearth Bake`.
   - If any ingredient is short: Amber alert banner `Hearth Allocation Blocked — 2 Ingredients Below Minimum`.

---

## 19. Responsive Design

| Area | Desktop (`≥ 1024px`) | Tablet (`640px – 1023px`) | Mobile (`< 640px`) |
| :--- | :--- | :--- | :--- |
| **Customer Navigation** | Full horizontal links + search + account + cart button | Links collapse into menu; compact cart button | Top header with brand title + cart button + mobile drawer toggle |
| **Staff Navigation** | Fixed left sidebar (`w-64` / `16rem`) | Collapsible left drawer or compact rail | Bottom navigation bar or hamburger drawer |
| **Product Grid** | 3-column grid (`grid-cols-3 gap-6`) | 2-column grid (`grid-cols-2 gap-4`) | Single column full width (`grid-cols-1 gap-4`) |
| **Metric Bento Grid** | 4-column row (`grid-cols-4 gap-4`) | 2x2 grid (`grid-cols-2 gap-3`) | Stacked cards or swipeable scroll (`grid-cols-1 gap-3`) |
| **Inventory Table** | Full table with 6 columns & progress bars | Table with horizontal overflow scroll | Collapsed stacked cards per larder item |
| **Cart / Checkout** | 2-column split (Items left, Summary sticky right) | Stacked 1-column layout | Full-width single column with fixed bottom CTA bar |
| **Auth Screen** | 2-column split (Editorial showcase left, Form right) | Stacked layout | Form-first mobile screen with brand banner |

---

## 20. Shared Components

To prevent code duplication and visual inconsistency, the frontend team divides components into **shadcn primitives** and **application-level shared components**:

### shadcn Primitives (`client/src/components/ui/`)
- `button.jsx` (Terracotta primary, cocoa outline, subtle ghost, and pill variants)
- `badge.jsx` (Semantic status chips with variant styling)
- `card.jsx` (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`)
- `input.jsx` (Warm bordered input with focus ring)
- `dialog.jsx` (Artisan modal dialog with backdrop blur)
- `sheet.jsx` (Sliding side drawer for cart and quick stock updates)
- `table.jsx` (Bakery larder and orders data table)
- `tabs.jsx` (Segmented role/category switcher)
- `separator.jsx` (Hairline `#E6DFD5` dividers)

### Application-Level Shared Components (`client/src/components/common/`)
- `QuantityControl.jsx` (Reusable `[-] [count] [+]` control)
- `StatusBadge.jsx` (3-part badge wrapping dot + background + label)
- `ProgressBar.jsx` (Proportional bar with semantic color thresholds)
- `PageHeader.jsx` (Breadcrumb + Serif title + Action cluster)
- `EmptyState.jsx` (Warm illustration/icon + message + reset button)
- `SkeletonLoader.jsx` (Shimmering placeholder cards matching Stitch shapes)

---

## 21. Feature-Specific Components

The following components belong exclusively inside their respective feature domains:

### Developer A (Customer Storefront & Ordering)
- `src/features/products/ProductCard.jsx`
- `src/features/products/ProductGrid.jsx`
- `src/features/cart/CartItemList.jsx`
- `src/features/cart/CartDrawer.jsx`
- `src/features/checkout/PickupTimeSelector.jsx`
- `src/features/orders/PickupPass.jsx`
- `src/features/orders/MyOrdersList.jsx`

### Developer B (Owner / Staff Management & Inventory)
- `src/features/inventory/InventoryTable.jsx`
- `src/features/inventory/AddIngredientDialog.jsx`
- `src/features/inventory/StockAdjustmentDrawer.jsx`
- `src/features/readiness/IngredientReadinessPipeline.jsx`
- `src/features/staff-orders/StaffOrdersTable.jsx`
- `src/features/dashboard/MetricBentoGrid.jsx`
- `src/features/dashboard/BakeRunSheet.jsx`

---

## 22. Icons

### Implementation Rule
- **Visual Reference**: Stitch uses Google `Material Symbols Outlined` in its generated HTML mockups.
- **Application Stack Requirement**: The repository's locked stack specifies **`lucide-react`**.
- **Rule**:
  1. Developers **must use `lucide-react`** components for all icons.
  2. Do **not** install or link Material Symbols font stylesheets solely to replicate Stitch markup.
  3. Map Stitch symbols to the closest semantic Lucide icon:
     - `shopping_bag` → `<ShoppingBag />`
     - `search` → `<Search />`
     - `local_fire_department` → `<Flame />`
     - `grain` / `bakery_dining` → `<Wheat />` or `<Croissant />`
     - `inventory_2` → `<Package />`
     - `receipt_long` → `<Receipt />`
     - `calendar_today` → `<Calendar />`
     - `check_circle` → `<CheckCircle />`
     - `warning` → `<AlertTriangle />`
     - `close` → `<X />`
     - `add` → `<Plus />`
     - `remove` → `<Minus />`
  4. Maintain consistent icon size (`16px`, `18px`, `20px`) and stroke width (`1.75px` or `2px`).

---

## 23. Fonts

### Required Font Families
1. **Headings**: `Playfair Display`, serif (Weights: 500, 600, 700)
2. **Body & UI**: `Plus Jakarta Sans`, sans-serif (Weights: 400, 500, 600, 700)
3. **Numeric & Operational**: `JetBrains Mono`, monospace (Weights: 400, 500, 600)

### Current Implementation Decision
- Font loading (Google Fonts `<link>` in `index.html` vs `@import` in `index.css` vs local font assets) is **not yet modified** in this phase.
- It will be implemented uniformly during the shared foundation setup phase.

---

## 24. Accessibility & Interaction

1. **Visible Focus States**:
   - All interactive elements must maintain high-visibility focus indicators: `focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`.
2. **Contrast Standards**:
   - Text pairings must meet WCAG AA contrast (e.g., `#1C1C19` or `#2C221E` on `#FCF9F4` canvas).
3. **Color-Blind Safe Status Indicators**:
   - Never rely on color alone to communicate state. Always pair color with text labels and distinct geometric status dots/icons.
4. **Touch Targets**:
   - On mobile viewports, all actionable buttons and inputs must satisfy a minimum target size of `44px x 44px`.
5. **Keyboard Navigation**:
   - Modals and drawers must trap focus, handle `Esc` to close, and return focus to triggering buttons.

---

## 25. Design Deviations & Governance

Both frontend developers must adhere to these 12 governing rules:

1. **Stitch is the visual source of truth.** All page layouts must reflect Stitch mockups.
2. **Do not introduce a second visual language.** Avoid generic blue SaaS dashboards or cold gray themes.
3. **Do not arbitrarily change colors.** Use only the approved color tokens in Section 3.
4. **Do not arbitrarily change typography.** Stick to the scale in Section 4.
5. **Do not invent arbitrary spacing.** Use the 8pt grid tokens in Section 5.
6. **Do not duplicate shared components.** If a component is needed across features, place it in `src/components/common/`.
7. **Do not install alternative UI component libraries** (e.g., MUI, Chakra, Mantine).
8. **Use shadcn/ui primitives** for base building blocks.
9. **Use Lucide React** for all iconography.
10. **Preserve responsive behavior shown in Stitch.** Implement both desktop and mobile variants faithfully.
11. **Feature developers must not independently modify global design tokens** (`index.css`, `tailwind.config.js`).
12. **Any change affecting shared design foundations must be agreed upon** by both developers before merging.

---

## 26. Open Design Decisions

The following items are unresolved from the Stitch inspection and require team agreement before Phase 15 implementation:

1. **Font Loading Strategy**:
   - *Status*: `Implementation decision — requires agreement`
   - *Options*: Add preconnected Google Fonts `<link>` tags into `client/index.html` (recommended for fastest setup) vs importing inside `src/index.css`.
2. **Unified Authentication vs Separate Routes**:
   - *Status*: `Implementation decision — requires agreement`
   - *Options*: Stitch shows a unified auth screen with segmented controls (`Customer Patron` vs `Bakehouse Staff`) and tabs (`Sign In` vs `Create Account`). The existing template has separate `/login` and `/register` routes. Recommendation: Route both `/login` and `/register` to the unified Stitch auth container with appropriate default tab props.
3. **Backend API Contract Finalization**:
   - *Status*: `Not explicitly defined by Stitch`
   - *Details*: Real endpoints (e.g. `/api/orders`, `/api/inventory`) are pending backend completion. Frontend will use mock data services matching the Stitch fields until backend endpoints are ready.

---

## 27. Implementation Checklist

Before considering any screen or feature complete, verify against this checklist:

- [ ] **Matches Stitch Layout**: Page structure and arrangement match Stitch mockups.
- [ ] **Matches Typography**: Correct font family (`Playfair Display`, `Plus Jakarta Sans`, `JetBrains Mono`), weight, and size.
- [ ] **Matches Color Tokens**: Backgrounds, borders, text, and semantic accents use approved hex/HSL values.
- [ ] **Matches Spacing**: Section paddings, margins, and gaps adhere to the 8pt spacing system.
- [ ] **Matches Component Shapes**: Border radii (`rounded-md`, `rounded-lg`, `rounded-full`) match specifications.
- [ ] **Matches Responsive Behavior**: Layout properly adapts across desktop (`≥ 1024px`), tablet, and mobile (`< 640px`).
- [ ] **Uses Shared Components**: Uses shared shadcn primitives and common components where applicable.
- [ ] **Uses Lucide Icons**: All icons use `lucide-react` with proper sizing and semantic mapping.
- [ ] **No Unnecessary New Patterns**: No ad-hoc styles or arbitrary custom CSS classes outside the design system.
- [ ] **No Global Styling Violations**: No uncoordinated edits to `index.css`, `tailwind.config.js`, or package dependencies.
