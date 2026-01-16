Website: https://noasacrypto.com

Twitter/X: https://x.com/noasacrypto

## What is NoasaCrypto?

NoasaCrypto provides a fun API that returns humorous crypto-related "reasons" across various categories like rug pull red flags, diamond hands motivation, gas fee excuses, and more. Perfect for adding some crypto humor to your apps, bots, or websites.

## Available Libraries

| Language | Directory | Package |
|----------|-----------|---------|
| Python | [`/python`](./python) | `pip install noasacrypto` |
| JavaScript/TypeScript | [`/javascript`](./javascript) | `npm install noasacrypto` |

## API Endpoints

The NoasaCrypto API is hosted at `https://noasacrypto.vercel.app`

### Get Random Reason

```
GET /api/reasons
```

Returns a random reason from any category.

### Get Reason by Category

```
GET /api/reasons/{category}
```

Returns a random reason from a specific category.

### Response Format

```json
{
  "reason": "The dev team has more anonymous wallets than Satoshi Nakamoto",
  "category": "Rug Check",
  "categoryId": "rug-check",
  "emoji": "🚩"
}
```

## Available Categories

| ID | Name | Emoji | Description |
|----|------|-------|-------------|
| `rug-check` | Rug Check | 🚩 | Red flags for suspicious projects |
| `diamond-hands` | Diamond Hands | 💎 | Reasons to HODL during crashes |
| `slippage-stories` | Slippage Stories | 📉 | Explanations for failed swaps |
| `chain-switcher` | Chain Switcher | ⛓️ | Pros/cons of different blockchains |
| `hodl-doubts` | HODL Doubts | 🤔 | Existential crypto trading doubts |
| `gas-excuses` | Gas Excuses | ⛽ | Reasons for outrageous gas fees |
| `rug-survivor` | Rug Survivor | 🧗 | Motivational quotes for rug pull victims |
| `luna-collapse` | Luna Collapse | 🌙 | Educational collapse reasons |
| `nft-utility` | NFT Utility | 🖼️ | Ridiculous NFT project claims |
| `whale-dumps` | Whale Dumps | 🐋 | Reasons why whales sell |
| `altcoin-season` | Altcoin Season | 🌊 | Signs alt season is here/ending |
| `scam-detector` | Scam Detector | 🚨 | Humorous scam warnings |

## Quick Examples

### Python

```python
from noasacrypto import NoasaCryptoClient, Category

client = NoasaCryptoClient()

# Random reason
reason = client.get_random_reason()
print(f"{reason.emoji} {reason.reason}")

# Specific category
reason = client.get_reason_by_category(Category.DIAMOND_HANDS)
print(f"{reason.emoji} {reason.reason}")
```

### JavaScript/TypeScript

```typescript
import { NoasaCryptoClient, Category } from 'noasacrypto';

const client = new NoasaCryptoClient();

// Random reason
const reason = await client.getRandomReason();
console.log(`${reason.emoji} ${reason.reason}`);

// Specific category
const diamondReason = await client.getReasonByCategory(Category.DIAMOND_HANDS);
console.log(`${diamondReason.emoji} ${diamondReason.reason}`);
```

### cURL

```bash
# Random reason
curl https://noasacrypto.vercel.app/api/reasons

# Specific category
curl https://noasacrypto.vercel.app/api/reasons/rug-check
```

## Self-Hosting

Both client libraries support custom base URLs for self-hosted instances:

**Python:**
```python
client = NoasaCryptoClient(base_url="http://localhost:3000")
```

**JavaScript:**
```typescript
const client = new NoasaCryptoClient({ baseUrl: 'http://localhost:3000' });
```

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
