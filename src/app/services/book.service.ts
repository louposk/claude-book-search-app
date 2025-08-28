import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book, GoogleBooksResponse, GoogleBookItem } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string, maxResults: number = 20): Observable<Book[]> {
    const params = {
      q: query,
      maxResults: maxResults.toString(),
      printType: 'books'
    };

    return this.http.get<GoogleBooksResponse>(this.apiUrl, { params })
      .pipe(
        map(response => this.transformGoogleBooksResponse(response))
      );
  }

  searchBooksByTitle(title: string, maxResults: number = 20): Observable<Book[]> {
    return this.searchBooks(`intitle:${title}`, maxResults);
  }

  searchBooksByAuthor(author: string, maxResults: number = 20): Observable<Book[]> {
    return this.searchBooks(`inauthor:${author}`, maxResults);
  }

  searchBooksByISBN(isbn: string): Observable<Book[]> {
    return this.searchBooks(`isbn:${isbn}`, 10);
  }

  private transformGoogleBooksResponse(response: GoogleBooksResponse): Book[] {
    if (!response.items) {
      return [];
    }

    return response.items.map(item => this.transformGoogleBookItem(item));
  }

  private transformGoogleBookItem(item: GoogleBookItem): Book {
    const volumeInfo = item.volumeInfo;
    
    return {
      id: item.id,
      title: volumeInfo.title || 'No title available',
      authors: volumeInfo.authors,
      description: volumeInfo.description,
      publishedDate: volumeInfo.publishedDate,
      publisher: volumeInfo.publisher,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories,
      imageLinks: volumeInfo.imageLinks,
      averageRating: volumeInfo.averageRating,
      ratingsCount: volumeInfo.ratingsCount,
      language: volumeInfo.language,
      previewLink: volumeInfo.previewLink,
      infoLink: volumeInfo.infoLink
    };
  }
}