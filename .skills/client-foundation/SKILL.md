---
name: sdk-core-client-foundation
description: 'This skill governs the implementation and extension of the core SDK infrastructure within the Nexical Ecosystem. It defines the foundational `ApiClient`, error handling mechanisms, and authentication ...'
---

# Skill: SDK Core Client Foundation

This skill governs the implementation and extension of the core SDK infrastructure within the Nexical Ecosystem. It defines the foundational `ApiClient`, error handling mechanisms, and authentication strategies that power all module-specific SDKs.

## 1. Core Principles

### Named Export Infrastructure

Core SDK infrastructure components (interfaces, classes, errors) MUST use named exports. This ensures explicit importing, better IDE support, and efficient tree-shaking.

- **Rule**: Default exports are strictly forbidden in the `sdk-core` package.

### Strict Type Safety (No `any`)

In accordance with `CODE.md`, the `any` type is strictly forbidden.

- **Rule**: Use `unknown` for dynamic request bodies and error data. Use concrete interfaces or properly constrained generics for all other structures.

### ESM Compliance

- **Rule**: All relative imports MUST include the `.js` extension to satisfy ESM runtime requirements.

---

## 2. Architectural Patterns

### Asynchronous Auth Strategy

Authentication logic is decoupled from the `ApiClient` via the `AuthStrategy` interface. This allows for polymorphic authentication (Bearer tokens, API Keys, or Agent-based auth).

- **Implementation**: The `ApiClient` calls `authStrategy.getHeaders()` dynamically for every request.
- **Pattern**: `export interface AuthStrategy { getHeaders(): Promise<Record<string, string>>; }`

### Structured Error Handling (`NexicalError`)

All API errors MUST be wrapped in the `NexicalError` class. This class is responsible for extracting error messages from various JSON structures (e.g., `error`, `message`) and preserving the HTTP status context.

- **Pattern**: `throw new NexicalError(response.status, response.statusText, errorData);`

### Generic Request Orchestration

All API requests MUST use the generic `request<T>` method provided by the `ApiClient`. This method handles boilerplate such as:

- Base URL normalization.
- Header merging (including dynamic auth headers).
- JSON stringification for bodies.
- Environment-aware credential inclusion (defaulting to `include`).
- **Rule**: Direct use of the global `fetch` is forbidden within the SDK layer.

---

## 3. Operational "Gotchas"

### 204 No Content Compatibility

Requests returning a `204 No Content` status MUST return an empty object (`{}`) cast to the expected generic type `T`. This prevents "Unexpected end of JSON input" errors during parsing.

- **Pattern**: `if (response.status === 204) { return {} as T; }`

### Base URL Normalization

The `ApiClient` constructor MUST normalize the `baseUrl` to remove any trailing slashes. This prevents double-slashes or malformed paths during path concatenation.

- **Pattern**: `this.baseUrl = options.baseUrl.replace(/\/$/, '');`

### Default Credential Inclusion

The client defaults to `include` for credentials to ensure cookies/auth headers are sent by default in browser environments.

- **Rule**: The `ApiClient` MUST default to `include` for credentials unless explicitly overridden in `RequestInit`.

---

## 4. Centralized SDK Integration

The core foundation supports the **Centralized SDK Mandate** defined in `ARCHITECTURE.md`. All module-specific SDKs are aggregated into a global `api` object.

- **Requirement**: Use the `ApiClient` as the engine for all module SDK resources.
