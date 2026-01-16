# dpm-shared

A shared UI component library for DPM applications, built with React and TypeScript. This package provides reusable components, hooks, utilities, and API clients for DPM platform applications.

## Features

- 🎨 **Pre-built React Components**: Button, Counter, TranslationText, and more
- 🔧 **API Utilities**: BaseApi class with Axios interceptors and error handling
- 🪝 **Custom Hooks**: useAbortableEffect for clean API cancellation
- 🌐 **Internationalization**: Built-in i18next integration
- 🎯 **TypeScript**: Full type safety with exported type definitions
- 💾 **IndexedDB Wrapper**: Simplified local storage utilities
- 🏢 **Multi-tenant Support**: Tenant context and configuration loading
- 🎨 **Tailwind CSS**: Pre-compiled styles with tree-shaking support

## Technologies

- **React 19**: Latest version of React for building user interfaces
- **TypeScript 5.9**: Provides type safety and better developer experience
- **Tailwind CSS 4**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client with interceptors
- **i18next**: Internationalization framework
- **ESLint**: Code linting with TypeScript and React-specific rules

## Prerequisites

- Node.js >= 24.0.0
- pnpm >= 10.0.0

## Installation

### 1. Configure Azure DevOps Registry

Create or update `.npmrc` in your project root:

```ini
@dpm-shared:registry=https://devopsrc.vuthao.com/SourceCode/DPM.Platform/_packaging/DPM.UI.Shared/npm/registry/
always-auth=true
```

### 2. Authenticate with Azure DevOps

Generate a Personal Access Token (PAT) from Azure DevOps with **Packaging (Read)** permissions, then authenticate:

```bash
# Using pnpm
pnpm config set //devopsrc.vuthao.com/SourceCode/DPM.Platform/_packaging/DPM.UI.Shared/npm/registry/:_authToken "YOUR_PAT_TOKEN"

# Or using npm
npm config set //devopsrc.vuthao.com/SourceCode/DPM.Platform/_packaging/DPM.UI.Shared/npm/registry/:_authToken "YOUR_PAT_TOKEN"
```

### 3. Install the Package

```bash
pnpm add @dpm-shared/ui

# Or using npm
npm install @dpm-shared/ui
```

## Development

This section is for contributors working on the library itself.

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd shared-lib
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development Commands

```bash
# Watch TypeScript changes
pnpm dev

# Build the library
pnpm build

# Lint code
pnpm lint

# Fix linting issues
pnpm lint --fix
```

### Building the Library

The build process compiles TypeScript and generates CSS:

```bash
pnpm build
```

**This command:**
1. Compiles TypeScript to JavaScript with type definitions
2. Resolves path aliases with tsc-alias
3. Builds Tailwind CSS from `src/styles/globals.css`
4. Outputs to `dist/` directory

**Build outputs:**
- `dist/index.js` - Main library entry point
- `dist/index.d.ts` - TypeScript type definitions
- `dist/styles/index.css` - Compiled Tailwind CSS
- `dist/components/`, `dist/api/`, etc. - Individual modules

### Publishing

To publish a new version:

1. Update version in `package.json`:
   ```bash
   npm version patch|minor|major
   ```

2. Build the package:
   ```bash
   pnpm build
   ```

3. Publish to Azure DevOps:
   ```bash
   npm publish
   ```

**Note**: Ensure you're authenticated with Azure DevOps and have **Packaging (Write)** permissions.

## Project Structure

```
src/
├── api/                  # API utilities and BaseApi
│   ├── axiosClient.ts
│   ├── baseApi.ts
│   ├── httpError.ts
│   └── interceptors/
├── components/           # React components
│   ├── Button.tsx
│   ├── Counter.tsx
│   ├── TranslationText.tsx
│   └── index.ts
├── hooks/                # Custom React hooks
│   └── useAbortableEffect.ts
├── i18n/                 # Internationalization
│   ├── locales/
│   └── resources.ts
├── indexed-db/           # IndexedDB utilities
├── tenant/               # Multi-tenant support
│   ├── tenantContext.ts
│   ├── tenantProvider.tsx
│   └── loadTenantConfig.ts
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
├── styles/               # Global styles
│   └── globals.css
└── index.ts              # Main entry point
```

## Usage

### Basic Component Import

```typescript
import { Button, Counter, TranslationText } from '@dpm-shared/ui';
```

### Modular Imports (Tree-Shakeable)

Import only what you need from specific modules:

```typescript
// Components
import { Button } from '@dpm-shared/ui/components';

// API Utilities
import { BaseApi, HttpError } from '@dpm-shared/ui/api';

// Hooks
import { useAbortableEffect } from '@dpm-shared/ui/hooks';

// i18n
import { resources } from '@dpm-shared/ui/i18n';

// Tenant utilities
import { TenantProvider, useTenant } from '@dpm-shared/ui/tenant';

// IndexedDB
import { useIndexedDB } from '@dpm-shared/ui/indexed-db';

// Types
import type { HttpErrorType } from '@dpm-shared/ui/types';
```

### Import Styles

Add the compiled Tailwind CSS to your application:

```typescript
// In your main entry file (e.g., main.tsx)
import '@dpm-shared/ui/styles';
```

### Example: Using Components

```tsx
import React from 'react';
import { Button, Counter, TranslationText } from '@dpm-shared/ui';
import '@dpm-shared/ui/styles';

function App() {
  return (
    <div>
      <TranslationText i18nKey="welcome" />
      <Button />
      <Counter />
    </div>
  );
}

export default App;
```

### Example: Using API Utilities

```tsx
import { BaseApi } from '@dpm-shared/ui/api';
import { useAbortableEffect } from '@dpm-shared/ui/hooks';

class UserApi extends BaseApi {
  getUsers() {
    return this.get<User[]>('/users');
  }
}

function UserList() {
  const [users, setUsers] = React.useState<User[]>([]);

  useAbortableEffect((signal) => {
    const api = new UserApi('/api/v1', 1, signal);
    api.getUsers().then(setUsers);
  }, []);

  return <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}
```

### Example: Using Tenant Context

```tsx
import { TenantProvider, useTenant } from '@dpm-shared/ui/tenant';

function App() {
  return (
    <TenantProvider>
      <YourComponents />
    </TenantProvider>
  );
}

function YourComponent() {
  const { tenantId, config } = useTenant();
  return <div>Tenant: {tenantId}</div>;
}
```

## Available Exports

The package provides the following export paths:

- **`@dpm-shared/ui`** - Main entry (all components and utilities)
- **`@dpm-shared/ui/components`** - React components
- **`@dpm-shared/ui/api`** - API utilities (BaseApi, HttpError, Axios client)
- **`@dpm-shared/ui/hooks`** - Custom React hooks
- **`@dpm-shared/ui/i18n`** - Internationalization resources and types
- **`@dpm-shared/ui/tenant`** - Multi-tenant utilities and context
- **`@dpm-shared/ui/types`** - TypeScript type definitions
- **`@dpm-shared/ui/utils`** - Utility functions
- **`@dpm-shared/ui/indexed-db`** - IndexedDB wrapper and hooks
- **`@dpm-shared/ui/styles`** - Compiled Tailwind CSS

## Key Components & Utilities

### Components

#### TranslationText
Renders translated text using i18next:

```tsx
<TranslationText 
  i18nKey="welcome" 
  namespace="common" 
  prefix="app"
/>
```

#### Button & Counter
Example components included in the library.

### API Utilities

#### BaseApi
Abstract base class for creating type-safe API clients:

```typescript
class MyApi extends BaseApi {
  getData() {
    return this.get<DataType>('/endpoint');
  }
  
  postData(data: InputType) {
    return this.post<ResponseType, InputType>('/endpoint', data);
  }
}
```

**Features:**
- Automatic AbortSignal integration
- Built-in error handling with HttpError
- Request/response interceptors
- Type-safe responses

### Hooks

#### useAbortableEffect
Manages API calls with automatic cleanup:

```typescript
useAbortableEffect((signal) => {
  // API calls automatically cancelled on unmount
  const api = new MyApi('/base', 1, signal);
  api.getData().then(setData);
}, [dependencies]);
```

### Tenant Management

Multi-tenant support with context provider:

```typescript
import { TenantProvider, useTenant, loadTenantConfig } from '@dpm-shared/ui/tenant';

// Wrap your app
<TenantProvider>
  <App />
</TenantProvider>

// Use in components
const { tenantId, config } = useTenant();
```

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { 
  HttpErrorType, 
  TenantConfig,
  // ... other types
} from '@dpm-shared/ui/types';
```

## Peer Dependencies

Ensure your project has these peer dependencies installed:

```json
{
  "@tailwindcss/postcss": "^4.1.18",
  "autoprefixer": "^10.4.23",
  "axios": "^1.13.2",
  "clsx": "^2.1.1",
  "postcss": "^8.5.6",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "tailwind-merge": "^3.4.0",
  "tailwindcss": "^4.1.18"
}
```

Install them if needed:

```bash
pnpm add react react-dom axios tailwindcss clsx tailwind-merge
```

## Contributing

We welcome contributions! Please follow these guidelines:

1. **Code Style**: Follow the existing TypeScript and React conventions
2. **Linting**: Run `pnpm lint` before committing
3. **Type Safety**: Ensure all code is properly typed
4. **Documentation**: Update README when adding new features
5. **Testing**: Test your changes in a consuming application

### Adding New Components

1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Ensure it's exported from `src/index.ts`
4. Add usage examples to README

### Adding New Utilities

1. Create utility in appropriate directory (`api/`, `hooks/`, `utils/`)
2. Export from module's `index.ts`
3. Ensure proper TypeScript types
4. Document usage in README

## Troubleshooting

### Authentication Issues

If you get authentication errors:

1. Verify your PAT token has **Packaging (Read)** permissions
2. Check `.npmrc` configuration is correct
3. Re-authenticate using the command in Installation section

### Module Not Found

If imports fail:

1. Ensure `@dpm-shared/ui` is listed in `dependencies`
2. Clear node_modules and reinstall: `pnpm install`
3. Verify you're using the correct import path

### Style Issues

If styles don't apply:

1. Ensure you've imported styles: `import '@dpm-shared/ui/styles'`
2. Check Tailwind CSS is configured in your project
3. Verify peer dependencies are installed

## Support

For issues or questions:
- **Internal Team**: Contact the DPM Platform team
- **Issues**: Report bugs through Azure DevOps work items

## License

Proprietary - DPM Platform
