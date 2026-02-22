# Skill: SDK Core Query Serialization

Expert guide for implementing type-safe SDK resources with nested query parameter serialization. This skill ensures that all SDK modules follow the "Shell-Registry" compatible communication pattern.

## Core Patterns

### 1. Abstract Resource Pattern

All SDK functional areas MUST be organized into 'Resource' classes that extend the `BaseResource` abstract class. This ensures consistent request orchestration and centralized logic for query building.

- **Rule**: Every resource MUST receive an `ApiClient` via constructor injection.
- **Rule**: Use named exports for all resource classes.

### 2. Nested Query Parameter Serialization

The SDK utilizes a recursive serialization utility to flatten complex filter objects into URL search parameters. This maintains compatibility with the backend's `parseQuery` utility.

- **Delimiter**: Use a double-underscore (`__`) to represent nesting (e.g., `filter: { user: { name: 'Alice' } }` -> `?filter__user__name=Alice`).
- **Rule**: All `list` or `find` methods in a resource MUST use this serialization logic before making the request.

### 3. NexicalError Strategy

API errors must be captured and transformed into `NexicalError` instances to preserve HTTP status context and provide standardized error messages.

- **Rule**: The SDK must handle both `error` (translation key) and `message` (human-readable) fields from the API response.

## Implementation Standards

- **Zero Any**: Use `unknown` for generic payloads and `Record<string, unknown>` for structured but dynamic filter objects.
- **ESM Relative Imports**: All internal imports MUST include the `.js` extension.
- **Named Exports**: Default exports are strictly forbidden in core SDK packages.

## Troubleshooting

- **Serialization Issues**: Verify that the `__` delimiter is correctly applied to nested keys.
- **204 Responses**: Ensure that HTTP 204 (No Content) responses return a valid `ServiceResponse` structure (e.g., `{ success: true, data: {} as T }`) to satisfy type contracts.
