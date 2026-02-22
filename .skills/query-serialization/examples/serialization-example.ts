/**
 * Example: Nested Query Parameter Serialization
 *
 * This example demonstrates how a complex filter object is flattened
 * into URL search parameters using the double-underscore (__) delimiter.
 */

/**
 * Recursive utility to build query parameters from nested objects.
 */
function buildQueryParams(
  params: URLSearchParams,
  obj: Record<string, unknown>,
  prefix: string = '',
): void {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}__${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      buildQueryParams(params, value as Record<string, unknown>, fullKey);
    } else {
      params.append(fullKey, String(value));
    }
  }
}

// Example Usage:
const filters = {
  status: 'active',
  user: {
    role: 'admin',
    profile: {
      isVerified: true,
    },
  },
  tags: ['featured', 'new'],
};

const params = new URLSearchParams();
buildQueryParams(params, filters);

console.log(params.toString());
// Output:
// status=active&user__role=admin&user__profile__isVerified=true&tags=featured%2Cnew
