import {
  ReasonResponse,
  ClientOptions,
  CategoryType,
  APIError,
  CategoryNotFoundError,
  ConnectionError,
  APIErrorResponse,
} from "./types";

const DEFAULT_BASE_URL = "https://noasacrypto.vercel.app";
const DEFAULT_TIMEOUT = 10000;

/**
 * Client for interacting with the NoasaCrypto reasons API.
 *
 * @example
 * ```typescript
 * import { NoasaCryptoClient, Category } from 'noasacrypto';
 *
 * const client = new NoasaCryptoClient();
 * const reason = await client.getRandomReason();
 * console.log(`${reason.emoji} ${reason.reason}`);
 * ```
 */
export class NoasaCryptoClient {
  private baseUrl: string;
  private timeout: number;

  /**
   * Create a new NoasaCrypto client.
   *
   * @param options - Configuration options
   * @param options.baseUrl - The base URL of the NoasaCrypto API
   * @param options.timeout - Request timeout in milliseconds
   */
  constructor(options: ClientOptions = {}) {
    this.baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, "");
    this.timeout = options.timeout || DEFAULT_TIMEOUT;
  }

  /**
   * Make a GET request to the API.
   */
  private async request(endpoint: string): Promise<ReasonResponse> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 404) {
        const data = (await response.json()) as APIErrorResponse;
        throw new CategoryNotFoundError(data.error || "Category not found");
      }

      if (!response.ok) {
        let errorMessage = "Unknown error";
        try {
          const data = (await response.json()) as APIErrorResponse;
          errorMessage = data.error || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new APIError(errorMessage, response.status);
      }

      return (await response.json()) as ReasonResponse;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof NoasaCryptoClient) {
        throw error;
      }

      if (error instanceof APIError || error instanceof CategoryNotFoundError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new ConnectionError(`Request to ${url} timed out`);
        }
        throw new ConnectionError(`Failed to connect to ${url}: ${error.message}`);
      }

      throw new ConnectionError(`Request failed: ${String(error)}`);
    }
  }

  /**
   * Get a random reason from any category.
   *
   * @returns A promise that resolves to a ReasonResponse
   * @throws {ConnectionError} If unable to connect to the API
   * @throws {APIError} If the API returns an error response
   *
   * @example
   * ```typescript
   * const reason = await client.getRandomReason();
   * console.log(reason.reason);
   * // 'The dev team has more anonymous wallets than Satoshi Nakamoto'
   * ```
   */
  async getRandomReason(): Promise<ReasonResponse> {
    return this.request("/api/reasons");
  }

  /**
   * Get a random reason from a specific category.
   *
   * @param category - The category to get a reason from
   * @returns A promise that resolves to a ReasonResponse
   * @throws {ConnectionError} If unable to connect to the API
   * @throws {CategoryNotFoundError} If the category does not exist
   * @throws {APIError} If the API returns an error response
   *
   * @example
   * ```typescript
   * import { Category } from 'noasacrypto';
   *
   * const reason = await client.getReasonByCategory(Category.RUG_CHECK);
   * console.log(`${reason.emoji} ${reason.reason}`);
   * // '🚩 Their smart contract has more backdoors than a Pentagon server'
   * ```
   */
  async getReasonByCategory(category: CategoryType): Promise<ReasonResponse> {
    return this.request(`/api/reasons/${category}`);
  }
}
