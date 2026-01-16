/**
 * NoasaCrypto API client library.
 *
 * A JavaScript/TypeScript client for fetching crypto-related humorous reasons
 * from the NoasaCrypto API.
 *
 * @example
 * ```typescript
 * import { NoasaCryptoClient, Category } from 'noasacrypto';
 *
 * const client = new NoasaCryptoClient();
 *
 * // Get a random reason
 * const reason = await client.getRandomReason();
 * console.log(`${reason.emoji} ${reason.reason}`);
 *
 * // Get a reason from a specific category
 * const diamondReason = await client.getReasonByCategory(Category.DIAMOND_HANDS);
 * console.log(diamondReason.reason);
 * ```
 *
 * @packageDocumentation
 */

export { NoasaCryptoClient } from "./client";
export {
  Category,
  CategoryType,
  ReasonResponse,
  ClientOptions,
  NoasaCryptoError,
  APIError,
  CategoryNotFoundError,
  ConnectionError,
} from "./types";
