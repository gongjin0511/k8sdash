# CLAUDE.md - AI Assistant Guide for k8sdash

This document provides guidance for AI assistants working with the k8sdash (Kubernetes Dashboard) codebase.

## Project Overview

**k8sdash** is a Kubernetes dashboard application providing real-time visualization and management of Kubernetes clusters. The project follows the architecture pattern established by similar projects like [Skooner](https://github.com/skooner-k8s/skooner).

### Architecture

The application consists of two main parts:

1. **Server (Backend)**: Express.js server that proxies requests to the Kubernetes API server
2. **Client (Frontend)**: React application with TypeScript for type safety

```
k8sdash/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── views/          # Page-level components
│   │   ├── services/       # API service modules
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── styles/         # CSS/SCSS stylesheets
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Express.js backend
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── services/       # Business logic services
│   │   └── utils/          # Utility functions
│   └── package.json
├── kubernetes/             # K8s deployment manifests
├── docker/                 # Dockerfile(s)
└── package.json            # Root package.json (workspaces)
```

## Development Commands

### Setup and Installation

```bash
# Install dependencies
npm install

# Install client dependencies
cd client && npm install

# Install server dependencies
cd server && npm install
```

### Development

```bash
# Start development server (both client and server)
npm run dev

# Start client only
npm run dev:client

# Start server only
npm run dev:server

# Run in watch mode
npm run watch
```

### Building

```bash
# Build for production
npm run build

# Build client only
npm run build:client

# Build server only
npm run build:server
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run client tests
npm run test:client

# Run server tests
npm run test:server

# Run tests in watch mode
npm run test:watch
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix

# Run Prettier
npm run format

# Type checking
npm run typecheck
```

### Docker

```bash
# Build Docker image
docker build -t k8sdash .

# Run container
docker run -p 4654:4654 k8sdash
```

## Code Style and Conventions

### TypeScript

- Use TypeScript for all new code (both client and server)
- Enable strict mode in tsconfig.json
- Define interfaces for all API responses and request payloads
- Use explicit return types for functions
- Avoid `any` type; use `unknown` when type is truly unknown

```typescript
// Good
interface PodInfo {
  name: string;
  namespace: string;
  status: PodStatus;
}

async function getPods(namespace: string): Promise<PodInfo[]> {
  // ...
}

// Avoid
async function getPods(namespace: any): Promise<any> {
  // ...
}
```

### React Components

- Use functional components with hooks
- Place component files in PascalCase: `PodList.tsx`
- Co-locate component styles: `PodList.module.css` or `PodList.styles.ts`
- Export components as named exports

```typescript
// components/PodList/PodList.tsx
import React from 'react';
import styles from './PodList.module.css';

interface PodListProps {
  namespace: string;
  onPodSelect?: (podName: string) => void;
}

export function PodList({ namespace, onPodSelect }: PodListProps): React.ReactElement {
  // Component implementation
}
```

### API Services

- Create service modules for each Kubernetes resource type
- Use consistent error handling patterns
- Implement request/response interceptors for auth tokens

```typescript
// services/pods.ts
import { apiClient } from './client';
import type { Pod, PodList } from '../types/kubernetes';

export const podsService = {
  list: (namespace: string): Promise<PodList> =>
    apiClient.get(`/api/v1/namespaces/${namespace}/pods`),

  get: (namespace: string, name: string): Promise<Pod> =>
    apiClient.get(`/api/v1/namespaces/${namespace}/pods/${name}`),

  delete: (namespace: string, name: string): Promise<void> =>
    apiClient.delete(`/api/v1/namespaces/${namespace}/pods/${name}`),
};
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `PodList.tsx` |
| Hooks | camelCase with `use` prefix | `usePodMetrics.ts` |
| Services | camelCase | `podService.ts` |
| Utilities | camelCase | `formatBytes.ts` |
| Types/Interfaces | PascalCase | `KubernetesTypes.ts` |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |
| CSS Modules | PascalCase.module.css | `PodList.module.css` |

## Kubernetes Concepts

### Key Resources

When working with this codebase, understand these core Kubernetes resources:

- **Pods**: Smallest deployable units containing one or more containers
- **Deployments**: Declarative updates for Pods and ReplicaSets
- **Services**: Network abstraction for Pod access
- **ConfigMaps/Secrets**: Configuration and sensitive data management
- **Namespaces**: Virtual clusters for resource isolation
- **RBAC**: Role-Based Access Control (Roles, ClusterRoles, Bindings)
- **Nodes**: Worker machines in the cluster
- **PersistentVolumes**: Storage resources

### API Interaction

The server proxies requests to the Kubernetes API. Common patterns:

```typescript
// List resources
GET /api/v1/namespaces/{namespace}/pods

// Get specific resource
GET /api/v1/namespaces/{namespace}/pods/{name}

// Watch for changes (WebSocket)
GET /api/v1/namespaces/{namespace}/pods?watch=true

// Create resource
POST /api/v1/namespaces/{namespace}/pods

// Update resource
PUT /api/v1/namespaces/{namespace}/pods/{name}

// Delete resource
DELETE /api/v1/namespaces/{namespace}/pods/{name}
```

## Testing Guidelines

### Unit Tests

- Test components in isolation using React Testing Library
- Mock Kubernetes API responses
- Test error states and loading states

```typescript
// __tests__/PodList.test.tsx
import { render, screen } from '@testing-library/react';
import { PodList } from '../components/PodList';

describe('PodList', () => {
  it('renders pod names', async () => {
    render(<PodList namespace="default" />);
    expect(await screen.findByText('my-pod')).toBeInTheDocument();
  });
});
```

### Integration Tests

- Test API route handlers
- Verify authentication middleware
- Test WebSocket connections for real-time updates

### E2E Tests

- Use Cypress or Playwright for end-to-end testing
- Test critical user flows (login, view pods, delete resources)
- Run against a test Kubernetes cluster (kind, minikube)

## Authentication

The dashboard supports multiple authentication methods:

1. **Service Account Token**: Direct token authentication
2. **OIDC**: OpenID Connect integration
3. **NodePort**: Cluster access via NodePort service

Authentication tokens should be passed in the `Authorization` header:

```
Authorization: Bearer <token>
```

## Security Considerations

- Never commit secrets or tokens to the repository
- Validate all user inputs before sending to Kubernetes API
- Implement RBAC restrictions in the UI based on user permissions
- Sanitize any data displayed from the cluster
- Use HTTPS in production deployments
- Implement rate limiting for API requests

## Performance Guidelines

- Implement pagination for large resource lists
- Use WebSocket connections for real-time updates instead of polling
- Lazy load components for different resource views
- Cache frequently accessed data (with appropriate invalidation)
- Use React.memo and useMemo for expensive computations

## Error Handling

### Client-Side

```typescript
try {
  const pods = await podsService.list(namespace);
  setPods(pods.items);
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 403) {
      showError('You do not have permission to view pods in this namespace');
    } else if (error.status === 404) {
      showError('Namespace not found');
    } else {
      showError(`Failed to fetch pods: ${error.message}`);
    }
  }
}
```

### Server-Side

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);

  if (err instanceof KubernetesApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
    });
  }

  res.status(500).json({ error: 'Internal server error' });
});
```

## Common Tasks

### Adding a New Resource View

1. Create type definitions in `client/src/types/`
2. Add API service in `client/src/services/`
3. Create component(s) in `client/src/components/`
4. Add route in `client/src/App.tsx`
5. Add navigation link in sidebar
6. Write tests for the new components

### Adding a Server Route

1. Create route handler in `server/src/routes/`
2. Add middleware if needed in `server/src/middleware/`
3. Register route in `server/src/index.ts`
4. Add type definitions for request/response
5. Write integration tests

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4654` |
| `NODE_ENV` | Environment mode | `development` |
| `KUBECONFIG` | Path to kubeconfig file | `~/.kube/config` |
| `OIDC_URL` | OIDC provider URL | - |
| `OIDC_CLIENT_ID` | OIDC client ID | - |
| `OIDC_CLIENT_SECRET` | OIDC client secret | - |

## Debugging

### Client

- Use React DevTools browser extension
- Check Network tab for API requests
- Use `console.log` or breakpoints in browser DevTools

### Server

- Use `DEBUG=k8sdash:*` environment variable
- Check logs with `npm run dev:server`
- Use VS Code debugger with provided launch config

### Kubernetes Connection Issues

```bash
# Verify cluster connection
kubectl cluster-info

# Check service account permissions
kubectl auth can-i list pods --as=system:serviceaccount:default:k8sdash

# View API server logs
kubectl logs -n kube-system -l component=kube-apiserver
```

## Contributing Guidelines

1. Create feature branches from `main`
2. Follow the code style conventions in this document
3. Write tests for new functionality
4. Update documentation for API changes
5. Run linting and tests before committing
6. Use conventional commit messages

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(pods): add pod log streaming`
- `fix(auth): handle expired tokens correctly`
- `docs(readme): update installation instructions`

## Resources

- [Kubernetes API Reference](https://kubernetes.io/docs/reference/kubernetes-api/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [Skooner/k8dash](https://github.com/skooner-k8s/skooner) - Reference implementation
