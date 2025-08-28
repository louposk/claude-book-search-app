# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `ng serve` or `npm start` - starts dev server on http://localhost:4200/
- **Build**: `ng build` or `npm run build` - builds the project to `dist/` directory
- **Watch mode**: `ng build --watch --configuration development` or `npm run watch` - builds with file watching
- **Tests**: `ng test` or `npm test` - runs unit tests with Karma test runner
- **Generate components**: `ng generate component component-name` - scaffolds new Angular components

## Architecture Overview

This is an Angular 20.2 standalone application for searching books using the Google Books API.

### Key Components Structure
- **AppComponent** (`src/app/app.ts`): Root component that orchestrates book search functionality
- **BookSearchComponent** (`src/app/components/book-search/`): Handles search input and search type selection
- **BookListComponent** (`src/app/components/book-list/`): Displays search results in a list format
- **BookService** (`src/app/services/book.service.ts`): Service for Google Books API integration
- **Book Model** (`src/app/models/book.model.ts`): TypeScript interfaces for Book data and Google Books API responses

### Data Flow
1. User enters search query in BookSearchComponent
2. AppComponent receives search event via `onSearch()` method
3. AppComponent calls appropriate BookService method based on search type (title/author/isbn/general)
4. BookService makes HTTP request to Google Books API and transforms response
5. Results are stored in AppComponent's `books` array and passed to BookListComponent

### API Integration
- Uses Google Books API v1 (`https://www.googleapis.com/books/v1/volumes`)
- Supports search by title (`intitle:`), author (`inauthor:`), and ISBN (`isbn:`) prefixes
- Transforms Google Books API response to internal Book interface format

### Code Style
- Uses Prettier with 100 character line width and single quotes
- Angular HTML templates use angular parser for Prettier formatting
- Follows Angular standalone component pattern (no NgModule)
- Uses RxJS observables for async operations