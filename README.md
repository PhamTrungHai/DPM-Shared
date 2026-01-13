# DPM.UI.Shared

A shared UI component library for DPM applications, built with React and TypeScript.

## Technologies Used

- **React 19**: Latest version of React for building user interfaces
- **TypeScript**: Provides type safety and better developer experience
- **Vite**: Fast build tool and development server (used for plugin configuration)
- **ESLint**: Code linting with TypeScript and React-specific rules
- **pnpm**: Fast, disk-efficient package manager
- **Turbo**: High-performance build system for monorepos

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DPM.UI.Shared
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

## Development

### Code Quality
- Run linting: `pnpm lint`
- Fix linting issues automatically: `pnpm lint --fix`

### Building the Library

The library build process handles both TypeScript compilation and CSS generation:

```bash
pnpm build
```

This command:
1. Compiles TypeScript to JavaScript with type definitions
2. Builds Tailwind CSS from `src/styles/globals.css`
3. Bundles component styles into `dist/styles/index.css`

**Build outputs:**
- `dist/` - Compiled components and styles
- `dist/index.js` - Main library entry point
- `dist/index.d.ts` - TypeScript type definitions
- `dist/styles/index.css` - Compiled Tailwind styles (tree-shakeable)

### Development Watch Mode
- Watch TypeScript changes: `pnpm dev`
- For CSS changes, run `pnpm build:tailwind`

## Usage in Other Packages

### Import Components
```typescript
import { Button, Counter } from 'dpm-shared';
```

### Import Styles
```typescript
// Import all compiled Tailwind styles (tree-shakeable)
import 'dpm-shared/styles';
```

Or use individual component imports:
```typescript
import { Button } from 'dpm-shared/button';
import { Counter } from 'dpm-shared/counter';
```

### Available Exports
- Default: `dpm-shared` - All components
- Styles: `dpm-shared/styles` - Compiled Tailwind CSS
- Button: `dpm-shared/button` - Button component only
- Counter: `dpm-shared/counter` - Counter component only
- API: `dpm-shared/api` - API utilities

## Project Structure

```
src/
├── components/
│   ├── Button.tsx      # Reusable Button component
│   ├── counter.tsx     # Counter component
│   └── index.ts        # Component exports
├── App.tsx             # Example app (for development/testing)
├── index.ts            # Main library export
└── index.css           # Global styles
```

## Usage

This library exports React components that can be imported and used in other DPM applications.

### Importing Components

```typescript
import { Button, Counter } from 'dpm-shared';
// or import specific components
import { Button } from 'dpm-shared/button';
import { Counter } from 'dpm-shared/counter';
```

### Example Usage

```tsx
import React from 'react';
import { Button, Counter } from 'dpm-shared';

function MyApp() {
  return (
    <div>
      <Button />
      <Counter />
    </div>
  );
}
```

## Component Documentation

### Button
A simple button component with click counter functionality.

**Props**: None (currently)

**Example**:
```tsx
<Button />
```

### Counter
A counter component (implementation details in `src/components/counter.tsx`).

**Props**: None (currently)

**Example**:
```tsx
<Counter />
```

## Build Configuration

- **TypeScript**: Configured for React JSX, outputs to `dist/` directory
- **ESLint**: Includes React hooks and refresh plugins
- **Package Exports**: Supports both main export and individual component exports

## Contributing

1. Follow the existing code style and TypeScript conventions
2. Run `pnpm lint` before committing
3. Ensure all components are properly typed
4. Update this README if adding new components

## License

```js
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
