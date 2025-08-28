import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-search.html',
  styleUrl: './book-search.css'
})
export class BookSearchComponent {
  @Output() search = new EventEmitter<{query: string, searchType: string}>();

  searchQuery: string = '';
  searchType: string = 'general';

  searchTypes = [
    { value: 'general', label: 'General Search' },
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'isbn', label: 'ISBN' }
  ];

  onSearch() {
    if (this.searchQuery.trim()) {
      this.search.emit({
        query: this.searchQuery.trim(),
        searchType: this.searchType
      });
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
