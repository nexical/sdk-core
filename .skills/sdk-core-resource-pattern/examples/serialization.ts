/**
 * Example: Nested Query Parameter Serialization
 *
 * Requirement: Flatten nested objects using double-underscore (__) delimiter.
 * Compatibility: backend parseQuery utility.
 */

const filters = {
  status: 'active',
  user: {
    name: 'Alice',
    role: {
      type: 'admin',
    },
  },
};

// Resulting query string should look like:
// ?status=active&user__name=Alice&user__role__type=admin

/**
 * Simplified logic representation of BaseResource.buildQuery
 */
function buildQuery(filters: Record<string, unknown>, prefix = ''): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(filters)) {
    const fullKey = prefix ? `${prefix}__${key}` : key;

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      // Recursively flatten nested objects
      parts.push(buildQuery(value as Record<string, unknown>, fullKey));
    } else {
      parts.push(`${fullKey}=${encodeURIComponent(String(value))}`);
    }
  }

  return parts.join('&');
}

console.info('?' + buildQuery(filters));
