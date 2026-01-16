"""NoasaCrypto API client for fetching crypto-related humorous reasons."""

from typing import Union
import requests

from .types import (
    Category,
    ReasonResponse,
    APIError,
    CategoryNotFoundError,
    ConnectionError,
)


class NoasaCryptoClient:
    """Client for interacting with the NoasaCrypto reasons API.
    
    Args:
        base_url: The base URL of the NoasaCrypto API. 
                  Defaults to "https://noasacrypto.vercel.app".
        timeout: Request timeout in seconds. Defaults to 10.
    
    Example:
        >>> client = NoasaCryptoClient()
        >>> reason = client.get_random_reason()
        >>> print(f"{reason.emoji} {reason.reason}")
    """
    
    DEFAULT_BASE_URL = "https://noasacrypto.vercel.app"
    
    def __init__(
        self, 
        base_url: str = DEFAULT_BASE_URL,
        timeout: int = 10
    ):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout
        self._session = requests.Session()
    
    def _request(self, endpoint: str) -> dict:
        """Make a GET request to the API.
        
        Args:
            endpoint: The API endpoint path.
            
        Returns:
            The JSON response as a dictionary.
            
        Raises:
            ConnectionError: If unable to connect to the API.
            APIError: If the API returns an error response.
        """
        url = f"{self.base_url}{endpoint}"
        
        try:
            response = self._session.get(url, timeout=self.timeout)
        except requests.exceptions.ConnectionError as e:
            raise ConnectionError(f"Failed to connect to {url}: {e}") from e
        except requests.exceptions.Timeout as e:
            raise ConnectionError(f"Request to {url} timed out") from e
        except requests.exceptions.RequestException as e:
            raise ConnectionError(f"Request failed: {e}") from e
        
        if response.status_code == 404:
            data = response.json()
            raise CategoryNotFoundError(data.get("error", "Category not found"))
        
        if not response.ok:
            try:
                data = response.json()
                error_msg = data.get("error", "Unknown error")
            except ValueError:
                error_msg = response.text or "Unknown error"
            raise APIError(error_msg, status_code=response.status_code)
        
        return response.json()
    
    def get_random_reason(self) -> ReasonResponse:
        """Get a random reason from any category.
        
        Returns:
            A ReasonResponse containing the reason and its metadata.
            
        Raises:
            ConnectionError: If unable to connect to the API.
            APIError: If the API returns an error response.
            
        Example:
            >>> client = NoasaCryptoClient()
            >>> reason = client.get_random_reason()
            >>> print(reason.reason)
            'The dev team has more anonymous wallets than Satoshi Nakamoto'
        """
        data = self._request("/api/reasons")
        return ReasonResponse.from_dict(data)
    
    def get_reason_by_category(
        self, 
        category: Union[Category, str]
    ) -> ReasonResponse:
        """Get a random reason from a specific category.
        
        Args:
            category: The category to get a reason from. Can be a Category enum
                     value or a string category ID.
                     
        Returns:
            A ReasonResponse containing the reason and its metadata.
            
        Raises:
            ConnectionError: If unable to connect to the API.
            CategoryNotFoundError: If the category does not exist.
            APIError: If the API returns an error response.
            
        Example:
            >>> client = NoasaCryptoClient()
            >>> reason = client.get_reason_by_category(Category.RUG_CHECK)
            >>> print(f"{reason.emoji} {reason.reason}")
            '🚩 Their smart contract has more backdoors than a Pentagon server'
        """
        category_id = category.value if isinstance(category, Category) else category
        data = self._request(f"/api/reasons/{category_id}")
        return ReasonResponse.from_dict(data)
    
    def close(self) -> None:
        """Close the underlying HTTP session."""
        self._session.close()
    
    def __enter__(self) -> "NoasaCryptoClient":
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        self.close()
