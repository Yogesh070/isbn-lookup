import requests
import re
from typing import Dict, Optional


class ISBNLookupService:
    """Service to lookup book information using ISBN numbers."""
    
    def __init__(self):
        self.open_library_base_url = "https://openlibrary.org/api/books"
    
    def clean_isbn(self, isbn: str) -> str:
        """Clean and validate ISBN format."""
        # Remove any non-digit characters except X
        cleaned = re.sub(r'[^0-9X]', '', isbn.upper())
        return cleaned
    
    def validate_isbn(self, isbn: str) -> bool:
        """Basic ISBN validation."""
        cleaned = self.clean_isbn(isbn)
        if len(cleaned) not in [10, 13]:
            return False
        
        # Basic format validation
        if len(cleaned) == 10:
            # ISBN-10: last character can be X
            return cleaned[:-1].isdigit() and (cleaned[-1].isdigit() or cleaned[-1] == 'X')
        else:
            # ISBN-13: all digits
            return cleaned.isdigit()
    
    def lookup_by_isbn(self, isbn: str) -> Optional[Dict]:
        """Lookup book information by ISBN using Open Library API."""
        cleaned_isbn = self.clean_isbn(isbn)
        
        if not self.validate_isbn(cleaned_isbn):
            return None
        
        try:
            # Try Open Library API first
            response = requests.get(
                f"{self.open_library_base_url}",
                params={
                    'bibkeys': f'ISBN:{cleaned_isbn}',
                    'format': 'json',
                    'jscmd': 'data'
                },
                timeout=10
            )
            response.raise_for_status()
            
            data = response.json()
            isbn_key = f'ISBN:{cleaned_isbn}'
            
            if isbn_key in data and data[isbn_key]:
                book_data = data[isbn_key]
                return self._format_open_library_data(book_data, cleaned_isbn)
            
            return None
            
        except requests.RequestException as e:
            print(f"Error fetching data from Open Library: {e}")
            return None
    
    def _format_open_library_data(self, data: Dict, isbn: str) -> Dict:
        """Format Open Library data into our standard format."""
        authors = []
        if 'authors' in data:
            authors = [author.get('name', '') for author in data['authors']]
        
        return {
            'isbn': isbn,
            'title': data.get('title', 'Unknown Title'),
            'authors': authors,
            'publisher': data.get('publishers', [{}])[0].get('name', 'Unknown Publisher') if data.get('publishers') else 'Unknown Publisher',
            'publish_date': data.get('publish_date', 'Unknown'),
            'description': data.get('excerpts', [{}])[0].get('text', '') if data.get('excerpts') else '',
            'page_count': data.get('number_of_pages', None),
            'language': data.get('languages', [{}])[0].get('name', 'Unknown') if data.get('languages') else 'Unknown',
            'subjects': [subject.get('name', '') for subject in data.get('subjects', [])],
            'cover_url': self._get_cover_url(data),
            'source': 'Open Library'
        }
    
    def _get_cover_url(self, data: Dict) -> Optional[str]:
        """Extract cover image URL from Open Library data."""
        if 'cover' in data and 'large' in data['cover']:
            return data['cover']['large']
        elif 'cover' in data and 'medium' in data['cover']:
            return data['cover']['medium']
        elif 'cover' in data and 'small' in data['cover']:
            return data['cover']['small']
        return None
