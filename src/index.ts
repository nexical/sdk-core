/* eslint-disable */
import { ApiClient, type ApiClientOptions } from './core.js';
import { initializeSdkRegistry, type SdkRegistry } from './registry.generated.js';

export * from './core.js';

export interface NexicalClient extends SdkRegistry { }

export class NexicalClient extends ApiClient {
  constructor(options: ApiClientOptions) {
    super(options);
    Object.assign(this, initializeSdkRegistry(this));
  }
}
