# Crumb & Bloom — Frontend Engineering Rules (FRONTEND_RULES.md)

---

## Source of Truth Hierarchy

When resolving requirements, design questions, or implementation details, both developers and AI agents must strictly follow this order of precedence:

1. **Hackathon Requirements & Problem Specification** (Highest authority)
2. **`client/DESIGN.md`** for visual design, tokens, layout structure, typography, and responsive behavior
3. **`client/FRONTEND_RULES.md`** for frontend engineering standards, architecture, and coding conventions
4. **Existing Project Architecture & Installed Dependencies**
5. **Feature-Specific Implementation Decisions** (Lowest authority)

### Conflict Resolution Principles
- Core functional requirements always override developer or AI implementation preferences.
- `DESIGN.md` is authoritative for visual design decisions (colors, typography, spacing, shapes, shadows, layout composition).
- `FRONTEND_RULES.md` is authoritative for software architecture, file organization, component boundaries, and state management conventions.
- The existing foundation and working code must be preserved unless a documented requirement explicitly demands modification.
- Individual developers and AI agents are **strictly prohibited** from silently overriding any higher-level source of truth.

---

## 1. Existing Template Protection

The existing template in `client/` is a production-ready starting foundation—it is **not** a disposable scaffold.

Developers and AI agents must:
- **Inspect before creating**: Always verify existing files, utilities, layouts, and components before writing new code.
- **Reuse existing components**: Check `src/components/ui/` and `src/components/common/` before writing any UI primitives.
- **Reuse existing layouts**: Leverage `PublicLayout.jsx` and `AppLayout.jsx` rather than inventing new page shells.
- **Reuse existing utilities**: Use `cn(...)` from `src/lib/utils.js` rather than creating duplicate classnames helpers.
- **Never rebuild or reinitialize**: Do not run `npm create vite`, do not delete working setup, and do not replace existing tooling.
- **Avoid unnecessary refactoring**: Do not reformat, rewrite, or rename working code outside the immediate scope of your feature.
- **Isolate feature branches**: Never alter shared infrastructure files from feature branches without prior coordination.
- **Preserve working functionality**: Never remove working code merely because a different implementation style is personally preferred.

---

## 2. JavaScript Only

The frontend is strictly locked to **JavaScript (ES Modules)**.

- **Allowed file extensions**: `.js`, `.jsx`
- **Strictly forbidden**: `.ts`, `.tsx`, TypeScript compiler options, `tsconfig.json`, or `@types/*` packages.
- Even if upstream documentation, Stitch references, or third-party code snippets provide TypeScript examples, they **must** be converted to clean, idiomatic JavaScript before being added to the repository.

---

## 3. Architecture

The codebase follows a lightweight, feature-driven architecture that separates shared infrastructure from domain business logic:

```text
client/src/
├── components/
│   ├── ui/                    # Base shadcn/ui primitives
│   └── common/                # Shared application-level components
├── features/                  # Domain business modules
│   ├── products/              # Customer product catalog & details
│   ├── cart/                  # Shopping bag & cart drawer
│   ├── checkout/              # Porchside pickup & checkout steps
│   ├── orders/                # Customer order status & pickup pass
│   ├── dashboard/             # Staff bake day run-sheet & metrics
│   ├── inventory/             # Larder ingredients, silos & stock table
│   ├── readiness/             # Ingredient Readiness Engine
│   └── staff-orders/          # Owner order management ledger
├── layouts/                   # Application shell wrappers
│   ├── PublicLayout.jsx       # Customer storefront shell (header, cart trigger)
│   └── AppLayout.jsx          # Staff operations shell (w-64 sidebar, top ops bar)
├── pages/                     # Thin route-level page wrappers
├── routes/                    # Centralized React Router definitions
└── lib/                       # General shared utilities (cn, api client)
```

### Directory Responsibilities

#### `components/ui/`
- Contains base **shadcn/ui primitives** (`button.jsx`, `badge.jsx`, `card.jsx`, `input.jsx`, `dialog.jsx`, `sheet.jsx`, `table.jsx`, `tabs.jsx`, `separator.jsx`).
- Primitives must be styling-aligned with `DESIGN.md`.
- **Only add a primitive when an actual requirement demands it.** Do not batch-generate or install unused components.

#### `components/common/`
- Reusable application-level components shared across multiple features.
- Examples: `QuantityControl.jsx`, `StatusBadge.jsx`, `ProgressBar.jsx`, `PageHeader.jsx`, `EmptyState.jsx`, `SkeletonLoader.jsx`.
- **Rule**: A component belongs here *only* when it is genuinely used by multiple distinct features. Single-use components belong in their feature folder.

#### `features/`
- Contains all domain-specific UI components, local state, validation schemas, and mock services.
- Keep feature code strictly encapsulated within its feature directory.
- Never place feature-specific UI inside `components/common/`.

#### `pages/`
- Thin route containers that wire together layouts, feature components, and URL parameters.
- Pages must **not** contain large, inline business logic, direct database calls, or massive inline JSX. They act purely as composition boundaries.

#### `layouts/`
- Structural application shells.
- `PublicLayout.jsx` handles customer storefront navigation, the announcement banner, and the cart badge.
- `AppLayout.jsx` handles the staff back-of-house `w-64` navigation rail, operational indicators, and breadcrumb header.
- Customer and staff shells must remain conceptually and structurally separate.

#### `routes/`
- Centralized route configuration in `src/routes/AppRoutes.jsx`.
- Route definitions must never be scattered throughout feature modules.

---

## 4. Shared Component Rules

Before creating any component, evaluate:
1. **Does this component already exist?** Check `components/ui/`, `components/common/`, and existing feature code.
2. **Is an existing shadcn primitive sufficient?** Reuse `Button`, `Badge`, `Card`, or `Input` with existing variants.
3. **Is this component truly shared?** A component is shared only if two or more distinct features genuinely require it.
4. **Does it belong to one feature only?** If so, place it in `src/features/<feature>/components/`.

### Anti-Duplication Rules
- Never create duplicate variants such as `ProductCard2`, `CustomButton`, `NewButton`, `CustomModal`, or redundant status chips.
- If two features require identical behavior, promote the component to `components/common/` deliberately.
- **Do not prematurely generalize**: Do not create speculative, hyper-configurable abstractions for components used only once. Write simple, clean code first.

---

## 5. shadcn/ui Rules

- The existing shadcn setup (configured via `components.json`) must be preserved.
- When an interface requires a primitive not yet present (e.g. `dialog`, `sheet`, `table`, `tabs`, `separator`):
  - Add only that specific primitive.
  - Follow the existing JavaScript/JSX conventions.
  - Align its variant colors and borders with `DESIGN.md`.
- **Strictly forbidden**: Installing competing UI libraries (MUI, Chakra, Mantine, Ant Design, Bootstrap).
- Application-level components may compose shadcn primitives freely.

---

## 6. Design System Rules

- **`client/DESIGN.md` is the visual contract.** Every frontend developer and AI agent must consult it before writing JSX or Tailwind classes.
- **Strictly forbidden**:
  - Generic blue SaaS dashboard styling
  - Cold, sterile gray palettes
  - Arbitrary hex colors not documented in `DESIGN.md`
  - Arbitrary font families or sizes outside the typography scale
  - Arbitrary padding or margin values outside the 8pt grid
  - Ad-hoc box shadows or excessive border radii
- Always use the semantic tokens defined in `DESIGN.md`:
  - Canvas / Background: `#FAF7F2` / `#FCF9F4`
  - Primary / Terracotta: `#C05621` / `#531B00`
  - Text: `#1C1C19` (primary), `#5C4D44` (secondary), `#8C7B70` (muted)
  - Semantic Status: Rosemary Green `#4A6B53` (success), Amber `#D97706` (warning), Rust Red `#BA1A1A` (destructive)
  - Hairline Borders: `#E6DFD5` (`border-outline-variant`)
- Do not invent feature-specific versions of global design tokens.

---

## 7. Global Design Token Ownership

Global design foundations are shared files:
- `client/src/index.css`
- `client/tailwind.config.js`
- `client/index.html`
- `client/src/components/ui/*`

### Coordination Protocol
Feature branches must **never** independently modify global design tokens. If a feature implementation appears to require a global change:
1. **Stop immediately.**
2. Document the exact technical rationale.
3. Coordinate with the other developer or team lead.
4. Apply the change to the shared foundation intentionally and centrally.
5. Verify that existing features across both customer and staff portals remain visually intact.

---

## 8. Icon Rules

- The repository's locked icon library is **`lucide-react`**.
- **Strictly forbidden**: Installing Material Symbols fonts, FontAwesome, or other icon packs.
- Stitch mockups use Google Material Symbols as visual design references only. Developers must map them to the closest semantic Lucide icon:
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
  - `tune` / `settings` → `<Sliders />` or `<Settings />`
- Keep icon sizing consistent (`16px`, `18px`, `20px`) with a default stroke width of `1.75px` or `2px`.

---

## 9. Typography Rules

The design system is locked to three distinct font families defined in `DESIGN.md`:
1. **`Playfair Display`** (serif): Reserved exclusively for display headings, page landmarks, brand titles, and product names.
2. **`Plus Jakarta Sans`** (sans-serif): Used for all body text, UI labels, button text, table cells, and form descriptions.
3. **`JetBrains Mono`** (monospace): Used strictly for precision numbers—prices (`$14.00`), gram weights (`850g`), hydration percentages (`78%`), timer clocks (`04:30:00`), batch codes, and SKU / Order IDs.

Do not introduce additional font families.

---

## 10. Responsive Design

Every implemented screen must function seamlessly and match Stitch across three standardized breakpoints:
- **Desktop**: `≥ 1024px` (12-column grid, max width `76rem` / `1216px`, fixed staff sidebar)
- **Tablet**: `640px – 1023px` (adaptive fluid grids, collapsible drawer navigation)
- **Mobile**: `< 640px` (single column flow, sticky bottom CTA bars, touch-friendly controls)

### Responsive Rules
- Do not implement desktop-only interfaces when Stitch explicitly specifies mobile behavior.
- Do not merely scale down desktop views; implement the dedicated mobile compositions shown in Stitch (e.g. converting multi-column inventory tables to stacked cards on mobile).
- Ensure all touch targets on mobile meet or exceed `44px x 44px`.

---

## 11. Routing Rules

- **React Router DOM v6** is the routing solution.
- All application routes must reside centrally in `src/routes/AppRoutes.jsx`.
- Feature modules must not declare global routes independently.
- Existing routes (`/`, `/login`, `/register`, `/app`, `*`) must be preserved and expanded cleanly.
- Routes must correspond to actual user journeys; do not create speculative dummy routes.

---

## 12. TanStack React Query Rules

- **TanStack React Query** is the dedicated solution for server state, server caching, and backend synchronization.
- **Strictly forbidden**: Introducing Redux, Zustand, MobX, or any external state-management libraries.
- **Separation of Concerns**:
  - **Local UI State**: Use React `useState` or `useReducer` for modal visibility, active tabs, form input values, quantity adjustments before submission, and dropdown toggles. Never store transient UI state in React Query.
  - **Server State**: Use React Query (`useQuery`, `useMutation`) for products catalog, active cart server state, customer orders, inventory stock levels, and dashboard metrics.

---

## 13. Mock Data Rules

Until backend API contracts are finalized:
- Frontend features may use isolated, local mock data.
- **Isolation Requirement**: Mock data must be encapsulated inside feature-local service directories (e.g., `src/features/products/services/productMockData.js`, `src/features/inventory/services/inventoryMockData.js`).
- **Strictly forbidden**: Creating a giant, monolithic `fakeApi.js` file spanning the entire application.
- Mock data fields must accurately reflect Stitch specifications and domain requirements (e.g., flour hydration, stock threshold, batch numbers).
- Abstract data access behind simple service functions (e.g., `fetchProducts()`, `fetchInventory()`) so that switching from mocks to real HTTP calls requires updating only the service layer, leaving UI components unchanged.

---

## 14. API Boundary

- **Do NOT invent backend endpoints** or assume custom URL routes, request payloads, response envelopes, or authentication claims that have not been agreed upon with the backend team.
- Keep data fetching logic strictly separated from presentation components.
- When backend contracts are finalized, all network communication must route through a unified, lightweight fetch client in `src/lib/api.js` utilizing the configured Vite `/api` proxy.

---

## 15. Validation

- Use **Zod** for schema validation.
- Co-locate validation schemas with their respective features (e.g. `src/features/checkout/schemas/checkoutSchema.js`).
- Validate user inputs before submission (customer contact details, pickup slots, inventory adjustments, product creation).
- Present validation error messages clearly using the warm destructive styling token (`text-error #BA1A1A`).
- Do not invent speculative validation rules not required by the hackathon domain.

---

## 16. Authentication

- The backend will use JWT (access and refresh tokens).
- Do **not** invent complex auth protocols, token refresh loops, or role matrices speculatively before backend contracts are finalized.
- Implement the UI structure for customer vs. staff authentication matching the Stitch mockups.
- Centralize auth state handling cleanly when backend contracts are delivered; never scatter raw JWT token reading or manual cookie parsing across feature components.
- Protect back-of-house `/app/*` routes using clean layout/route guard wrappers.

---

## 17. State Management

- Keep state as local as possible.
- Hierarchy of state solutions:
  1. **Component State**: `useState` / `useReducer` for local UI behavior.
  2. **URL Search Params**: For shareable filters, sorting, and pagination.
  3. **React Query**: For asynchronous server data and mutations.
  4. **React Context**: Only when state must genuinely be shared across non-adjacent tree branches (e.g. an active shopping cart or authenticated user profile). Do not create contexts speculatively.

---

## 18. Loading, Error, and Empty States

Every data-dependent view must explicitly handle four states:
1. **Loading State**: Display a tailored skeleton loader matching the expected card or table shape (`SkeletonLoader.jsx`). Never show a blank, unstyled white screen.
2. **Success State**: Render the complete, responsive content matching Stitch.
3. **Empty State**: Render an `EmptyState.jsx` component featuring a warm icon, explanatory message, and a clear call-to-action (e.g., "No orders placed yet. Browse weekly drops →").
4. **Error State**: Display a friendly, actionable error alert. Never leak raw stack traces, undefined variable crashes, or technical exceptions to the user.

---

## 19. Accessibility

- Use valid, semantic HTML5 elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<button>`, `<table>`).
- Ensure all interactive elements have visible keyboard focus rings (`focus-visible:ring-2 focus-visible:ring-primary`).
- Never use non-semantic clickable elements like `<div onClick={...}>` when a native `<button>` or `<Link>` is appropriate.
- Ensure all form inputs have associated `<label>` tags with matching `htmlFor` and `id` attributes.
- Provide descriptive `alt` text for all product images.
- Status badges must pair color with text and geometric icons so state is never communicated through color alone.

---

## 20. Forms

- Form fields must have visible labels, clear placeholders, and explicit required field indicators (`<span class="text-error">*</span>`).
- Prevent form submission while invalid or while an asynchronous submission is in flight.
- Submit buttons must indicate loading state (e.g. disabling the button and showing a spinner or text like "Submitting...").
- Display field-level validation errors immediately adjacent to the relevant input.

---

## 21. Performance

- Write clean, predictable, standard React code.
- Avoid premature optimization, speculative memoization (`useMemo`, `useCallback` everywhere), or complex caching layers.
- Avoid placing rapidly changing state high up in the component hierarchy where it triggers widespread re-renders.
- Ensure images use appropriate dimensions and lazy loading (`loading="lazy"`) where applicable.

---

## 22. Error Handling

- Handle anticipated failure modes gracefully (network disconnects, validation errors, out-of-stock collisions).
- Never allow unhandled promise rejections to crash the interface.
- Provide clear user-facing feedback with warm destructive alert banners (`bg-error-container text-on-error-container`).

---

## 23. Git Branch and PR Rules

- The repository workflow uses **feature branches and Pull Requests**.
- Developers must never commit directly to the shared `main` branch.
- PRs must:
  - Have a single, well-defined scope (e.g., `feature/products-catalog` or `feature/inventory-table`).
  - Avoid modifying or reformatting unrelated files.
  - Exclude uncoordinated changes to shared infrastructure.
  - Include screenshots or verification confirming alignment with Stitch.

---

## 24. Shared File Ownership

The following files represent shared infrastructure and carry the highest risk of merge conflicts:
- `client/src/index.css`
- `client/tailwind.config.js`
- `client/index.html`
- `client/src/main.jsx`
- `client/src/App.jsx`
- `client/src/routes/AppRoutes.jsx`
- `client/src/layouts/*`
- `client/src/components/ui/*`
- `client/src/components/common/*`
- `client/package.json`
- `client/package-lock.json`

### Working Rule
- Feature developers must treat these files as coordinated assets.
- If an edit to a shared file is unavoidable, keep it minimal, communicate with the other developer, and verify that both storefront and staff workflows compile and function properly.

---

## 25. Feature Ownership (Developer Split)

To ensure rapid, collision-free parallel development during the hackathon, feature ownership is divided as follows:

### Developer A — Customer Storefront & Ordering
- **Core Focus**: All patron-facing flows, sensory catalog presentation, and checkout reservation.
- **Owned Areas**:
  - `src/features/products/` (Catalog grid, product filters, bread profile details)
  - `src/features/cart/` (Shopping bag, quantity adjustment, cart drawer)
  - `src/features/checkout/` (Porchside pickup slot selection, customer contact info)
  - `src/features/orders/` (Customer order confirmation, digital Pickup Pass with QR code, order history)
  - Customer page wrappers (`HomePage.jsx`, `CatalogPage.jsx`, `CartPage.jsx`, `CheckoutPage.jsx`, `OrderConfirmationPage.jsx`, `MyOrdersPage.jsx`)
  - Storefront layout refinement in `PublicLayout.jsx`

### Developer B — Owner / Staff Operations & Inventory
- **Core Focus**: Back-of-house management, bake-day run-sheets, and inventory control.
- **Owned Areas**:
  - `src/features/dashboard/` (Bento metric summary cards, active oven logs)
  - `src/features/inventory/` (Larder ingredient table, stock progress bars, Add/Edit ingredient modal)
  - `src/features/readiness/` (Ingredient Readiness Engine calculating order deficits against stock)
  - `src/features/staff-orders/` (Owner orders ledger, fulfillment pipeline, printable bag tags)
  - Staff page wrappers (`DashboardPage.jsx`, `InventoryPage.jsx`, `ManageOrdersPage.jsx`, `OrderDetailsPage.jsx`)
  - Staff layout refinement in `AppLayout.jsx` (w-64 sidebar, operational top bar)

*Note: Shared primitives in `components/ui/` and `components/common/` are collaboratively agreed upon and shared.*

---

## 26. Stitch + Antigravity MCP Rules

- Google Stitch is the visual source of truth.
- **Implementation Workflow**:
  1. Inspect the target screen in Stitch via Stitch MCP.
  2. Examine both desktop and mobile variants to understand responsive shifts.
  3. Identify reusable tokens, card shapes, and status badges.
  4. Map the design cleanly into the existing feature-driven React structure.
  5. Implement the component using shared primitives and Tailwind tokens.
  6. Perform visual QA against the Stitch screenshot and adjust until faithful.
- **Strictly forbidden**:
  - Blindly copy-pasting raw Stitch HTML into the project.
  - Discarding existing React architecture to accommodate generated markup.
  - Adding ad-hoc stylesheets or foreign CDNs.

---

## 27. MCP-Generated Code Rules

When accepting AI-assisted code generation:
- Verify that code is **JavaScript only** (no TypeScript syntax).
- Verify that files are placed in their proper `features/` or `components/` directories.
- Verify that icons use `lucide-react` instead of Material Symbols.
- Verify that design tokens match `DESIGN.md` rather than generic Tailwind colors.
- Verify that no duplicate components or competing packages were added.
- **AI-generated output does not supersede repository rules.**

---

## 28. Visual QA

A screen is **not** complete simply because it renders without JavaScript errors. It must be visually inspected against Stitch to verify:
- Accurate typography and font weights
- Proper warm color tokens and background contrast
- Hairline border styling (`#E6DFD5`) and warm resting shadows
- Consistent button shapes and hover states
- Semantic status badges with status dots
- Mobile layout responsiveness (proper collapsing, touch targets, drawer behavior)
- Proper loading, error, and empty state presentation

---

## 29. No Unnecessary Global Changes

- Keep all feature implementation strictly localized.
- If a feature requirement seems to demand a new global utility, a new Tailwind plugin, or an additional npm dependency, **stop and evaluate**.
- Solve the requirement with existing primitives and utilities whenever possible.
- Never alter shared global configurations to solve an isolated, feature-specific problem.

---

## 30. Backend Integration

- Frontend and backend evolve in parallel. Frontend development must **never stall** waiting for backend APIs.
- Build feature UI and user interactions against isolated mock services.
- When backend API contracts are formalized:
  1. Confirm request and response schemas with the backend team.
  2. Implement data-fetching in TanStack Query via `src/lib/api.js`.
  3. Replace the mock service function with the real API call.
  4. Verify that loading, error, and empty states behave correctly with live data.

---

## 31. Do Not Over-Engineer

This is a fast-paced hackathon project.

**Prioritize**:
- Simplicity and clarity
- Clean, readable, well-commented code
- Fast implementation and effortless debugging
- Direct, predictable component hierarchies

**Avoid**:
- Enterprise design patterns (repositories, factories, dependency injection)
- Elaborate custom state management machines
- Premature optimization and speculative abstractions
- Excessive configuration files

---

## 32. Definition of Done

A feature is considered complete and ready for PR merge only when:
- [ ] Requirements and user flows are fully implemented.
- [ ] Visual styling accurately matches Stitch mockups and `DESIGN.md`.
- [ ] Code resides in the correct `features/` or `components/` directory.
- [ ] Existing shared components and shadcn primitives are reused.
- [ ] No duplicate or redundant components were created.
- [ ] Code is 100% JavaScript (no TypeScript).
- [ ] Icons use `lucide-react`.
- [ ] Desktop (`≥ 1024px`), tablet (`640px – 1023px`), and mobile (`< 640px`) responsiveness is verified.
- [ ] Loading, empty, and error states are handled gracefully.
- [ ] Form validation is implemented using Zod where required.
- [ ] Accessibility standards (focus rings, labels, alt tags, touch targets) are met.
- [ ] Mock data is isolated in feature service files without hardcoded fake global APIs.
- [ ] No invented backend contracts or rogue endpoints are introduced.
- [ ] No unauthorized edits to shared global design files (`index.css`, `tailwind.config.js`).
- [ ] No unnecessary npm packages installed.
- [ ] Visual QA against Stitch is completed and documented.
- [ ] PR is focused, cleanly reviewable, and conflict-free.

---

## 33. AI Agent Behavior

All AI coding assistants operating in this repository must obey these constraints:
1. **Always read before editing**: Inspect relevant existing code, `client/DESIGN.md`, and `client/FRONTEND_RULES.md` before taking action.
2. **Minimize changes**: Produce the smallest, cleanest modification that solves the user's objective.
3. **Respect boundaries**: Never touch files outside the assigned feature domain without explicit instruction.
4. **Never introduce forbidden tech**: Absolutely no TypeScript, Redux, Zustand, MUI, or alternative styling libraries.
5. **Never invent APIs**: Do not create imaginary backend endpoints; use clean mock service boundaries.
6. **Preserve working code**: Never discard working infrastructure or refactor code unprompted.

---

## 34. Final Rule

When in doubt:
**Preserve the existing architecture, follow the hackathon requirements, follow `DESIGN.md` for visual design, follow `FRONTEND_RULES.md` for engineering practices, keep implementation simple, and minimize code changes.**
