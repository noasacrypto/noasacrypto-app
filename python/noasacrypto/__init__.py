"""NoasaCrypto API client library.

A Python client for fetching crypto-related humorous reasons from the NoasaCrypto API.

Example:
    >>> from noasacrypto import NoasaCryptoClient, Category
    >>> 
    >>> client = NoasaCryptoClient()
    >>> reason = client.get_random_reason()
    >>> print(f"{reason.emoji} {reason.reason}")
    >>> 
    >>> # Get a reason from a specific category
    >>> reason = client.get_reason_by_category(Category.DIAMOND_HANDS)
    >>> print(reason.reason)
"""

from .client import NoasaCryptoClient
from .types import (
    Category,
    ReasonResponse,
    NoasaCryptoError,
    APIError,
    CategoryNotFoundError,
    ConnectionError,
)

__version__ = "1.0.0"
__all__ = [
    "NoasaCryptoClient",
    "Category",
    "ReasonResponse",
    "NoasaCryptoError",
    "APIError",
    "CategoryNotFoundError",
    "ConnectionError",
]
