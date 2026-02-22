---
name: sdk-core-esm-imports
description: 'This skill enforces strict ESM compatibility and architectural consistency within the `sdk-core` package.'
---

# Skill: SDK ESM Imports & Resource Standards

This skill enforces strict ESM compatibility and architectural consistency within the `sdk-core` package.

## Context

The `sdk-core` package provides the foundational primitives for the Nexical SDK. It must strictly adhere to ESM runtime requirements (specifically explicit file extensions) and follow the Abstract Resource pattern for consistent request orchestration.

## Standards

### 1. Strict ESM Relative Imports

All relative imports MUST include the explicit `.js` extension. This is required for Node.js ESM resolution and compatibility across the ecosystem.

- **Rule**: Relative imports MUST end in `.js`.
- **Example**: `import { ApiClient } from './client.js';`

### 2. Abstract SDK Resource Pattern

SDK functional areas are organized into 'Resource' classes that extend `BaseResource`.

- **Rule**: Every SDK resource MUST extend `BaseResource`.
- **Rule**: Resources MUST receive an `ApiClient` via constructor injection.
- **Example**:
  ```typescript
  export class UserResource extends BaseResource {
    constructor(client: ApiClient) {
      super(client);
    }
  }
  ```

### 3. Nested Query Parameter Serialization

Filtering nested data structures requires a specific flattening logic for backend compatibility.

- **Rule**: Nested filter objects MUST be processed recursively using the double-underscore (`__`) delimiter for key concatenation.
- **Implementation**: Handled by the `buildQuery` utility in `sdk-core`.
- **Example**: `{ filter: { user: { name: 'test' } } }` -> `?filter__user__name=test`

### 4. Zero-Tolerance for 'any'

Preserve type safety by avoiding the `any` type at all costs.

- **Rule**: The `any` type is strictly forbidden.
- **Rule**: Use `unknown` or `Record<string, unknown>` for unpredictable payloads.

## Resources

- **Templates**: `templates/resource.tsf`
- **Examples**: `examples/esm-import.ts`
