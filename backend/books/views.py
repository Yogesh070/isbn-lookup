from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .services import ISBNLookupService


@api_view(['GET'])
def lookup_isbn(request, isbn):
    """
    Lookup book information by ISBN.
    """
    if not isbn:
        return Response(
            {'error': 'ISBN parameter is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    service = ISBNLookupService()
    book_data = service.lookup_by_isbn(isbn)
    
    if book_data:
        return Response(book_data, status=status.HTTP_200_OK)
    else:
        return Response(
            {'error': 'Book not found or invalid ISBN'}, 
            status=status.HTTP_404_NOT_FOUND
        )
