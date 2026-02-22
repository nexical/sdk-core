/**
 * @docker/Dockerfile example-usage.ts
 * @description Example demonstrating the implementation of the SDK Core patterns.
 */

import { ApiClient } from './client.js';
import type { AuthStrategy } from './auth.js';
import { NexicalError } from './errors.js';

/**
 * Example of a Bearer Token Auth Strategy.
 */
class BearerAuthStrategy implements AuthStrategy {
  constructor(private readonly token: string) {}

  async getHeaders(): Promise<Record<string, string>> {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }
}

/**
 * Example of consuming the ApiClient in a Resource class.
 */
class UserResource {
  constructor(private readonly client: ApiClient) {}

  async getProfile(userId: string): Promise<unknown> {
    try {
      // Pattern: Generic Request Orchestration
      return await this.client.request<unknown>('GET', `/users/${userId}`);
    } catch (error) {
      if (error instanceof NexicalError) {
        // Pattern: Structured Error Handling
        console.error(`API Error (${error.status}): ${error.message}`);
        throw error;
      }
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    // Pattern: 204 No Content Compatibility
    // The request method returns {} for 204, satisfying the generic T (here void-ish)
    await this.client.request<void>('DELETE', `/users/${userId}`);
  }
}

// Initialization
const auth = new BearerAuthStrategy('my-secret-token');
const client = new ApiClient({
  baseUrl: 'https://api.nexical.com/', // Pattern: Base URL Normalization handles the slash
  authStrategy: auth,
});

const userResource = new UserResource(client);

// Demonstrate usage to satisfy linting
userResource.getProfile('current-user').catch(() => {
  /* Handle or ignore for example purposes */
});
