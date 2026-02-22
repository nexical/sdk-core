/**
 * Example: ESM Module Imports (.js extension)
 *
 * Requirement: All relative imports MUST include the '.js' extension.
 * Reason: ESM runtime requirements and Bun/Node.js compatibility.
 */

// CORRECT: Including .js extension even for .ts source files
import { ApiClient as _ApiClient } from './client.js';
import { BaseResource } from './resource.js';
import { NexicalError as _NexicalError } from '../errors/index.js';

// INCORRECT: Missing extension (will fail in ESM)
// import { ApiClient } from './client';

// INCORRECT: Using .ts extension (not supported by ESM loaders)
// import { ApiClient } from './client.ts';

export class UserResource extends BaseResource {
  // Example usage of BaseResource to avoid empty class if needed
  async getProfile() {
    return this._request('GET', '/profile');
  }
}
