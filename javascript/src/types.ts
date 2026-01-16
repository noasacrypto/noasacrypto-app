/**
 * Available reason categories.
 */
export const Category = {
  RUG_CHECK: "rug-check",
  DIAMOND_HANDS: "diamond-hands",
  SLIPPAGE_STORIES: "slippage-stories",
  CHAIN_SWITCHER: "chain-switcher",
  HODL_DOUBTS: "hodl-doubts",
  GAS_EXCUSES: "gas-excuses",
  RUG_SURVIVOR: "rug-survivor",
  LUNA_COLLAPSE: "luna-collapse",
  NFT_UTILITY: "nft-utility",
  WHALE_DUMPS: "whale-dumps",
  ALTCOIN_SEASON: "altcoin-season",
  SCAM_DETECTOR: "scam-detector",
} as const;

/**
 * Category type union for type-safe category selection.
 */
export type CategoryType = (typeof Category)[keyof typeof Category];

/**
 * Response from the reasons API.
 */
export interface ReasonResponse {
  /** The humorous reason text */
  reason: string;
  /** Human-readable category name */
  category: string;
  /** Category identifier */
  categoryId: string;
  /** Category emoji */
  emoji: string;
}

/**
 * Configuration options for the NoasaCrypto client.
 */
export interface ClientOptions {
  /** Base URL of the NoasaCrypto API. Defaults to "https://noasacrypto.vercel.app" */
  baseUrl?: string;
  /** Request timeout in milliseconds. Defaults to 10000 */
  timeout?: number;
}

/**
 * Error response from the API.
 */
export interface APIErrorResponse {
  error: string;
}

/**
 * Base error class for NoasaCrypto API errors.
 */
export class NoasaCryptoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NoasaCryptoError";
  }
}

/**
 * Raised when the API returns an error response.
 */
export class APIError extends NoasaCryptoError {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

/**
 * Raised when the requested category does not exist.
 */
export class CategoryNotFoundError extends NoasaCryptoError {
  constructor(message: string = "Category not found") {
    super(message);
    this.name = "CategoryNotFoundError";
  }
}

/**
 * Raised when unable to connect to the API.
 */
export class ConnectionError extends NoasaCryptoError {
  constructor(message: string) {
    super(message);
    this.name = "ConnectionError";
  }
}
