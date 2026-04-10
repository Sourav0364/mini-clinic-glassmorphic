# LuxePets — System Architecture, Data Flow & Component Mapping

This document provides visual diagrams and a concise mapping of functional components to help you explain the project architecture and runtime flows in interviews. It uses Mermaid diagrams (flowchart TD, sequenceDiagram) for clear, top-down visuals you can paste into markdown viewers that support Mermaid.

---

## Quick summary

- App type: Single Page Application (React + TypeScript)
- Runtime: Browser (Vite dev server during development)
- Persistence (current): Browser localStorage
- Core state manager: custom `usePets` hook (local state + persistence)

---

## System architecture (top-down)

Paste the following Mermaid block into a markdown viewer that supports Mermaid to render the diagram.

```mermaid
flowchart TD
  subgraph Client
    A[Browser (React SPA)]
    A --> B[UI Components]
  end

  subgraph App
    B --> C[Routing (react-router-dom)]
    C --> D[Root -> usePets hook]
    D --> E[UI: Dashboard, PetList, PetForm, PetDetails]
  end

  subgraph Storage
    E --> F[LocalStorage (src/utils/storage.ts)]
    D --> F
  end

  subgraph Dev
    G[Vite Dev Server / Build] --> A
  end

  subgraph OptionalBackend
    H[API Server (Express / Supabase / Firebase)]
    D -. optional -> H
    H --> F[Persisted DB]
  end

  style Client fill:#0b1220,stroke:#ffffff,stroke-width:0px,color:#fff
  style App fill:#111827,stroke:#9ca3af
  style Storage fill:#111827,stroke:#9ca3af
  style OptionalBackend fill:#0f172a,stroke:#6ee7b7
```

Notes:
- The `usePets` hook is the single source of truth for pet data in the client. It reads/writes via `src/utils/storage.ts`.
- The `OptionalBackend` shows a path for a production backend (not currently implemented). The app is built to make this integration straightforward.

---

## Data flow (top-down, user action → persistence)

```mermaid
flowchart TD
  U[User] -->|interacts| UI[Component (PetForm / PetList / PetDetails)]
  UI -->|calls| Hook[usePets {addPet, updatePet, deletePet, getPet}]
  Hook -->|reads/writes| Storage[getPets / savePets (localStorage)]
  Storage -->|returns| Hook
  Hook -->|updates| UI

  %% Example: seed on first run
  Storage -.empty-> Seed[seedPets.ts]
  Seed --> Storage
```

Explanation:
- The UI components call methods returned by `usePets`. Those methods mutate React state and persist changes by calling `savePets` (which writes to localStorage). On startup, `usePets` reads `getPets`; if empty, it uses `seedPets` to populate initial data.

---

## Sequence diagram — "Create a pet" flow

```mermaid
sequenceDiagram
  participant U as User
  participant PF as PetForm
  participant H as usePets
  participant S as savePets (storage)
  participant LS as localStorage

  U->>PF: fills form and submits
  PF->>H: addPet(formData)
  H->>H: create new Pet object (id, timestamps)
  H->>S: savePets(updatedPets)
  S->>LS: localStorage.setItem(key, JSON.stringify(...))
  LS-->>S: ok
  S-->>H: ok
  H-->>PF: returns new pet
  H-->>UI: pets state updated → re-render
  PF-->>U: navigate to /pets (list)

```

---

## Functional component mapping (what to show and say in an interview)

- `src/hooks/usePets.ts`
  - Responsibility: stateful hook that exposes `pets`, `addPet`, `updatePet`, `deletePet`, `getPet`. Handles initial load, seed, and persistence.
  - Talking points: single source of truth, simple API, easy to swap with remote data source.

- `src/utils/storage.ts`
  - Responsibility: small adapter around localStorage: `getPets`, `savePets` with basic error handling.
  - Talking points: encapsulates storage so swapping to a backend is localized.

- `src/components/PetForm.tsx`
  - Responsibility: form UI, client-side validation, handles create and edit modes.
  - Talking points: validation strategy, UX decisions (simulate network delay), accessibility notes.

- `src/components/PetList.tsx`
  - Responsibility: search, filter, and display pet table; navigation to view/edit.
  - Talking points: performance (useMemo for filtered list), sorting, empty states.

- `src/components/PetDetails.tsx`
  - Responsibility: read-only profile view; friendly not-found UI.
  - Talking points: derived data formatting (age calculation), conditional UI.

- `src/components/Layout.tsx`
  - Responsibility: shell, navigation, theme/background.
  - Talking points: routing via `Outlet`, responsive layout.

---

## Visual layout suggestion for a live interview demo

1. Start with the elevator pitch and open the browser to the running app.
2. Show `src/App.tsx` to explain routing and `Outlet` context provider (how `usePets` is provided to nested routes).
3. Open `src/hooks/usePets.ts` and explain initialization, API surface, and how it persists data.
4. Show `src/components/PetForm.tsx` and explain validation and UX; demonstrate creating a new pet and point to the sequence diagram.
5. Show `src/components/PetList.tsx` and `src/components/PetDetails.tsx` to explain listing/filtering and profile details.

---

## Extension ideas (one-liners to propose in interview)

- Swap localStorage for a backend API: create a small adapter that exposes the same `getPets`/`savePets` surface and use it inside `usePets`.
- Add optimistic updates and conflict resolution for offline-first flows.
- Add unit tests for the hook and form validation; add E2E tests (Playwright) for core flows.

---

## How to render the Mermaid diagrams locally

- GitHub and many Markdown tools render Mermaid. VS Code has Mermaid preview extensions. If your viewer doesn't support Mermaid, you can paste the blocks into the Mermaid Live Editor (https://mermaid.live).

---

If you want, I can:
- Export these diagrams as PNG/SVG files and add them to the repo.
- Generate a printable one-page PDF readme (slide) with these visuals.
- Add a short demo script (step-by-step) you can follow in a 3-5 minute interview.

Tell me which of the three you'd like and I'll implement it next.
