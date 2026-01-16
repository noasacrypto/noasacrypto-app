"""Type definitions for NoasaCrypto API responses."""

from dataclasses import dataclass
from enum import Enum
from typing import Optional


class Category(str, Enum):
    """Available reason categories."""
    
    RUG_CHECK = "rug-check"
    DIAMOND_HANDS = "diamond-hands"
    SLIPPAGE_STORIES = "slippage-stories"
    CHAIN_SWITCHER = "chain-switcher"
    HODL_DOUBTS = "hodl-doubts"
    GAS_EXCUSES = "gas-excuses"
    RUG_SURVIVOR = "rug-survivor"
    LUNA_COLLAPSE = "luna-collapse"
    NFT_UTILITY = "nft-utility"
    WHALE_DUMPS = "whale-dumps"
    ALTCOIN_SEASON = "altcoin-season"
    SCAM_DETECTOR = "scam-detector"


@dataclass
class ReasonResponse:
    """Response from the reasons API."""
    
    reason: str
    category: str
    category_id: str
    emoji: str
    
    @classmethod
    def from_dict(cls, data: dict) -> "ReasonResponse":
        """Create a ReasonResponse from API response dictionary."""
        return cls(
            reason=data["reason"],
            category=data["category"],
            category_id=data["categoryId"],
            emoji=data["emoji"]
        )


class NoasaCryptoError(Exception):
    """Base exception for NoasaCrypto API errors."""
    pass


class APIError(NoasaCryptoError):
    """Raised when the API returns an error response."""
    
    def __init__(self, message: str, status_code: Optional[int] = None):
        super().__init__(message)
        self.status_code = status_code


class CategoryNotFoundError(NoasaCryptoError):
    """Raised when the requested category does not exist."""
    pass


class ConnectionError(NoasaCryptoError):
    """Raised when unable to connect to the API."""
    pass
