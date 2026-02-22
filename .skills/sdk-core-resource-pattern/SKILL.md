# Abstract Resource Pattern (sdk-core)

This skill governs the implementation of SDK functional areas (Resources) within the `sdk-core` package. It ensures that all data access logic is organized into standardized, type-safe classes that utilize centralized request orchestration and query serialization.

## Core Mandates

1.  **Abstract Resource Pattern**: All resource classes MUST extend `BaseResource` and receive an `ApiClient` instance via constructor injection.
2.  **Generic Request Orchestration**: Use the protected `_request<T>` method to wrap the client's request logic. This provides a type-safe interface and ensures consistent error handling.
3.  **Nested Query Parameter Serialization**: Query parameter serialization MUST use the double-underscore (`__`) delimiter for nested object keys (e.g., `filter__user__name=Alice`) to ensure compatibility with the backend's `parseQuery` utility.
4.  **ESM Module Imports**: All relative imports MUST include the `.js` extension (e.g., `import { BaseResource } from './resource.js';`).
5.  **Zero-Tolerance for 'any'**: The use of `any` is strictly forbidden. Use specific interfaces or `unknown` for dynamic data like request bodies or filter values.
6.  **Infrastructure Named Exports**: Default exports are forbidden. All components MUST be exported as named members to ensure explicit importing and better tree-shaking.
7.  **Auth Strategy Integration**: Authentication headers MUST be resolved dynamically via the injected `AuthStrategy` in the `ApiClient`.
8.  **204 No Content Compatibility**: Handlers MUST explicitly check for 204 status codes and return an empty object (`{}`) cast to the expected type `T`.
9.  **NexicalError Handling**: All API errors MUST be wrapped in the `NexicalError` class to preserve HTTP status context.
10. **Base URL Normalization**: Base URLs MUST be normalized in the constructor to remove trailing slashes to prevent path concatenation errors.
11. **Default Credential Inclusion**: The `ApiClient` MUST default to 'include' for credentials unless explicitly overridden to ensure cookies/auth headers are sent in browser environments.

## Implementation Workflow

### 1. Define the Resource Class

Create a new file in `src/resources/` (or similar) that extends `BaseResource`.

```typescript
import { BaseResource } from '../resource.js';
import type { ApiClient } from '../client.js';

export class MyResource extends BaseResource {
  constructor(client: ApiClient) {
    super(client);
    // BaseResource constructor handles Base URL Normalization
  }
}
```

### 2. Implement Operation Methods

Use the `_request<T>` wrapper for all API calls.

```typescript
export class MyResource extends BaseResource {
  async get(id: string): Promise<MyDataType> {
    return this._request<MyDataType>('GET', `/my-resource/${id}`);
  }
}
```

### 3. Handle Queries and Filters

Use the `buildQuery` method (provided by `BaseResource`) which implements the double-underscore serialization logic.

```typescript
async list(filters: Record<string, unknown> = {}): Promise<MyDataType[]> {
  const query = this.buildQuery(filters);
  return this._request<MyDataType[]>('GET', `/my-resource${query}`);
}
```

## Reference Patterns

- **Serialization**: Refer to `examples/serialization.ts` for nested object flattening logic.
- **ESM Imports**: Refer to `examples/esm-imports.ts` for correct import syntax.
- **Resource Structure**: Refer to `templates/resource.tsf` for the standard class boilerplate.
