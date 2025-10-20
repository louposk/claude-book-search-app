import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './components/book-search/book-search';
import { BookListComponent } from './components/book-list/book-list';
import { BookService } from './services/book.service';
import { Book } from './models/book.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CommonModule, BookSearchComponent, BookListComponent],
  providers: [BookService],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Book Search App';
  books: Book[] = [];
  loading = false;
  searchPerformed = false;

  constructor(private bookService: BookService) {}

  onSearch(searchData: {query: string, searchType: string}) {
    this.loading = true;
    this.searchPerformed = true;
    this.books = [];

    let searchObservable;

    switch (searchData.searchType) {
      case 'title':
        searchObservable = this.bookService.searchBooksByTitle(searchData.query);
        break;
      case 'author':
        searchObservable = this.bookService.searchBooksByAuthor(searchData.query);
        break;
      case 'isbn':
        searchObservable = this.bookService.searchBooksByISBN(searchData.query);
        break;
      default:
        searchObservable = this.bookService.searchBooks(searchData.query);
        break;
    }

    searchObservable.subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching books:', error);
        this.loading = false;
        this.books = [];
      }
    });
  }

  onDelete() {
    this.books = [];
    this.loading = false;
    this.searchPerformed = false;
  }
}
