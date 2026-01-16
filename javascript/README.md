# NoasaCrypto JavaScript/TypeScript Client

A JavaScript/TypeScript client library for the NoasaCrypto API - fetch crypto-related humorous reasons for your applications.

## Installation

```bash
npm install noasacrypto
```

Or with yarn:

```bash
yarn add noasacrypto
```

Or with pnpm:

```bash
pnpm add noasacrypto
```

## Quick Start

### TypeScript / ES Modules

```typescript
import { NoasaCryptoClient, Category } from 'noasacrypto';

const client = new NoasaCryptoClient();

// Get a random reason from any category
const reason = await client.getRandomReason();
console.log(`${reason.emoji} ${reason.reason}`);
// Output: 🚩 The dev team has more anonymous wallets than Satoshi Nakamoto

// Get a reason from a specific category
const diamondReason = await client.getReasonByCategory(Category.DIAMOND_HANDS);
console.log(`${diamondReason.emoji} [${diamondReason.category}] ${diamondReason.reason}`);
// Output: 💎 [Diamond Hands] Paper hands never built generational wealth (or so they say)
```

### CommonJS

```javascript
const { NoasaCryptoClient, Category } = require('noasacrypto');

const client = new NoasaCryptoClient();

async function main() {
  const reason = await client.getRandomReason();
  console.log(`${reason.emoji} ${reason.reason}`);
}

main();
```

## Available Categories

| Category | Constant | Description |
|----------|----------|-------------|
| Rug Check | `Category.RUG_CHECK` | Red flags for suspicious projects |
| Diamond Hands | `Category.DIAMOND_HANDS` | Reasons to HODL during crashes |
| Slippage Stories | `Category.SLIPPAGE_STORIES` | Explanations for failed swaps |
| Chain Switcher | `Category.CHAIN_SWITCHER` | Pros/cons of different blockchains |
| HODL Doubts | `Category.HODL_DOUBTS` | Existential crypto trading doubts |
| Gas Excuses | `Category.GAS_EXCUSES` | Reasons for outrageous gas fees |
| Rug Survivor | `Category.RUG_SURVIVOR` | Motivational quotes for rug pull victims |
| Luna Collapse | `Category.LUNA_COLLAPSE` | Educational collapse reasons |
| NFT Utility | `Category.NFT_UTILITY` | Ridiculous NFT project claims |
| Whale Dumps | `Category.WHALE_DUMPS` | Reasons why whales sell |
| Altcoin Season | `Category.ALTCOIN_SEASON` | Signs alt season is here/ending |
| Scam Detector | `Category.SCAM_DETECTOR` | Humorous scam warnings |

## API Reference

### NoasaCryptoClient

```typescript
const client = new NoasaCryptoClient({
  baseUrl: 'https://noasacrypto.vercel.app', // Optional: custom API URL
  timeout: 10000 // Optional: request timeout in milliseconds
});
```

#### Methods

##### `getRandomReason(): Promise<ReasonResponse>`

Fetch a random reason from any category.

```typescript
const reason = await client.getRandomReason();
console.log(reason.reason);      // The humorous reason text
console.log(reason.category);    // Category name (e.g., "Rug Check")
console.log(reason.categoryId);  // Category ID (e.g., "rug-check")
console.log(reason.emoji);       // Category emoji (e.g., "🚩")
```

##### `getReasonByCategory(category: CategoryType): Promise<ReasonResponse>`

Fetch a random reason from a specific category.

```typescript
import { Category } from 'noasacrypto';

// Using Category constant (recommended for autocomplete)
const reason = await client.getReasonByCategory(Category.GAS_EXCUSES);

// Using string literal
const reason = await client.getReasonByCategory('gas-excuses');
```

### Types

#### ReasonResponse

```typescript
interface ReasonResponse {
  reason: string;      // The humorous reason text
  category: string;    // Human-readable category name
  categoryId: string;  // Category identifier
  emoji: string;       // Category emoji
}
```

#### CategoryType

```typescript
type CategoryType = 
  | 'rug-check'
  | 'diamond-hands'
  | 'slippage-stories'
  | 'chain-switcher'
  | 'hodl-doubts'
  | 'gas-excuses'
  | 'rug-survivor'
  | 'luna-collapse'
  | 'nft-utility'
  | 'whale-dumps'
  | 'altcoin-season'
  | 'scam-detector';
```

## Error Handling

The client throws specific error types for different error conditions:

```typescript
import {
  NoasaCryptoClient,
  Category,
  NoasaCryptoError,
  APIError,
  CategoryNotFoundError,
  ConnectionError,
} from 'noasacrypto';

const client = new NoasaCryptoClient();

try {
  const reason = await client.getReasonByCategory('invalid-category' as any);
} catch (error) {
  if (error instanceof CategoryNotFoundError) {
    console.log(`Category not found: ${error.message}`);
  } else if (error instanceof ConnectionError) {
    console.log(`Connection failed: ${error.message}`);
  } else if (error instanceof APIError) {
    console.log(`API error (status ${error.statusCode}): ${error.message}`);
  } else if (error instanceof NoasaCryptoError) {
    console.log(`General error: ${error.message}`);
  }
}
```

## Browser Usage

The client works in modern browsers that support the Fetch API:

```html
<script type="module">
  import { NoasaCryptoClient, Category } from 'https://unpkg.com/noasacrypto/dist/index.mjs';

  const client = new NoasaCryptoClient();
  
  const reason = await client.getRandomReason();
  document.getElementById('reason').textContent = `${reason.emoji} ${reason.reason}`;
</script>
```

## Self-Hosted API

If you're running your own instance of the NoasaCrypto API:

```typescript
const client = new NoasaCryptoClient({
  baseUrl: 'http://localhost:3000'
});
```

## Requirements

- Node.js 18+ (for native fetch support)
- Or any modern browser with Fetch API support

## License

MIT License
