/* eslint-disable */
import { ApiClient, type ApiClientOptions } from './core.js';

export * from './core.js';

export class NexicalClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super(options);
  }
}
