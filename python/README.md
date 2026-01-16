# NoasaCrypto Python Client

A Python client library for the NoasaCrypto API - fetch crypto-related humorous reasons for your applications.

## Installation

```bash
pip install noasacrypto
```

Or install from source:

```bash
git clone https://github.com/noasacrypto/noasacrypto-api.git
cd noasacrypto-api/python
pip install .
```

## Quick Start

```python
from noasacrypto import NoasaCryptoClient, Category

# Create a client
client = NoasaCryptoClient()

# Get a random reason from any category
reason = client.get_random_reason()
print(f"{reason.emoji} {reason.reason}")
# Output: 🚩 The dev team has more anonymous wallets than Satoshi Nakamoto

# Get a reason from a specific category
reason = client.get_reason_by_category(Category.DIAMOND_HANDS)
print(f"{reason.emoji} [{reason.category}] {reason.reason}")
# Output: 💎 [Diamond Hands] Paper hands never built generational wealth (or so they say)
```

## Available Categories

| Category | Enum Value | Description |
|----------|------------|-------------|
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

```python
client = NoasaCryptoClient(
    base_url="https://noasacrypto.vercel.app",  # Optional: custom API URL
    timeout=10  # Optional: request timeout in seconds
)
```

#### Methods

##### `get_random_reason() -> ReasonResponse`

Fetch a random reason from any category.

```python
reason = client.get_random_reason()
print(reason.reason)      # The humorous reason text
print(reason.category)    # Category name (e.g., "Rug Check")
print(reason.category_id) # Category ID (e.g., "rug-check")
print(reason.emoji)       # Category emoji (e.g., "🚩")
```

##### `get_reason_by_category(category) -> ReasonResponse`

Fetch a random reason from a specific category.

```python
# Using Category enum (recommended)
reason = client.get_reason_by_category(Category.GAS_EXCUSES)

# Using string category ID
reason = client.get_reason_by_category("gas-excuses")
```

### ReasonResponse

A dataclass containing the API response:

| Attribute | Type | Description |
|-----------|------|-------------|
| `reason` | `str` | The humorous reason text |
| `category` | `str` | Human-readable category name |
| `category_id` | `str` | Category identifier |
| `emoji` | `str` | Category emoji |

## Error Handling

The client raises specific exceptions for different error conditions:

```python
from noasacrypto import (
    NoasaCryptoClient,
    Category,
    NoasaCryptoError,
    APIError,
    CategoryNotFoundError,
    ConnectionError,
)

client = NoasaCryptoClient()

try:
    reason = client.get_reason_by_category("invalid-category")
except CategoryNotFoundError as e:
    print(f"Category not found: {e}")
except ConnectionError as e:
    print(f"Connection failed: {e}")
except APIError as e:
    print(f"API error (status {e.status_code}): {e}")
except NoasaCryptoError as e:
    print(f"General error: {e}")
```

## Context Manager Support

The client can be used as a context manager to ensure proper cleanup:

```python
with NoasaCryptoClient() as client:
    reason = client.get_random_reason()
    print(reason.reason)
# Session is automatically closed
```

## Self-Hosted API

If you're running your own instance of the NoasaCrypto API:

```python
client = NoasaCryptoClient(base_url="http://localhost:3000")
```

## Requirements

- Python 3.8+
- requests >= 2.25.0

## License

MIT License
