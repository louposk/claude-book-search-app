import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Input() loading: boolean = false;
  @Input() searchPerformed: boolean = false;

  getAuthorsString(authors?: string[]): string {
    return authors ? authors.join(', ') : 'Unknown Author';
  }

  getCategoriesString(categories?: string[]): string {
    return categories ? categories.join(', ') : 'No categories';
  }

  openBookLink(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
