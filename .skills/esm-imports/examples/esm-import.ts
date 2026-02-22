/**
 * @packages/sdk-core/.skills/sdk-core-esm-imports/SKILL.md sdk-core-esm-imports
 * @description Demonstrates correct ESM relative import usage with .js extensions.
 */

// CORRECT: ESM requires the explicit .js extension for relative imports.
import { ApiClient } from './client.js';
import { BaseResource } from './resource.js';
import { buildQuery } from '../utils/query.js';

// INCORRECT (Common AI Hallucination): Omitting the extension.
// import { ApiClient } from './client';

export class ExampleResource extends BaseResource {
  constructor(client: ApiClient) {
    super(client);
  }

  public async list(filters: Record<string, unknown>): Promise<unknown[]> {
    // Usage of buildQuery to satisfy lint rules and demonstrate pattern
    const query = buildQuery({ filter: filters });
    return this.client.request<unknown[]>({
      method: 'GET',
      url: `/example?${query}`,
    });
  }
}
