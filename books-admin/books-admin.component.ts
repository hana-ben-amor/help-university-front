import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal and NgbModalRef
import { BookService } from '../../services/book.service';
import { Book, Category } from '../../models/Book.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-books-admin',
  templateUrl: './books-admin.component.html',
  styleUrls: ['./books-admin.component.css', '../dashboard/dashboard.component.css']
})
export class BooksAdminComponent implements OnInit {
  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        console.log('Book deleted successfully');
      },
      (error: any) => {
        console.error('Error deleting book:', error);
        // Handle the error as needed
      }
    );
  }
  selectedBook: Book = new Book();
  categories: any;

;
openUpdateModal(book: Book): void {
  this.selectedBook = { ...book };
  this.categories.forEach((category: { checked: boolean; name: string; }) => {
    category.checked = this.selectedBook.categories?.some(
      (bookCategory) => bookCategory.name === category.name
    );
  });
}


deleteCategory(index: number): void {
  if (this.selectedBook && this.selectedBook.categories.length > index) {
    this.selectedBook.categories.splice(index, 1);
  }
}


loadCategories(): void {
  this.categoryService.getAllCategories().subscribe(
    (categories) => {
      this.categories = categories;
      // Ensure selectedBook has categories array initialized
      if (!this.selectedBook?.categories) {
        this.selectedBook.categories = [];
      }
    },
    (error) => {
      console.error('Error fetching categories:', error);
    }
  );
}
updateForm(): void {
  if (this.selectedBook) {
    // Update book's categories based on selected checkboxes
    this.selectedBook.categories = this.categories
      .filter((category: { checked: any; }) => category.checked)
      .map((category: { name: any; }) => ({ name: category.name }));
    
    // Call the updateBook method
    this.bookService.updateBook(this.selectedBook.id, this.selectedBook)
      .subscribe(
        (response) => {
          console.log('Book updated successfully:', response);
          this.loadBooks();
        },
        (error) => {
          console.error('Error updating book:', error);
        }
      );
  } else {
    console.log('No book selected');
  }
}

handleFileInput(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.convertImageToBase64(file);
  }
}

convertImageToBase64(file: File): void {
  const reader = new FileReader();
  reader.onloadend = () => {
    // Store the base64-encoded string in your newBook or selectedBook
    this.newBook.coverPictureUrl = reader.result as string;
    // Or for the update case:
    // this.selectedBook.coverImage = reader.result as string;
  };
  reader.readAsDataURL(file);
}
  @ViewChild('addBookModal') modalElement: ElementRef | undefined;
  newBook: Book = new Book();
  books: any[] = [];
  categoryFilter: string = '';
  filteredBooks: any[] = [];
  constructor(private bookService: BookService,private categoryService:CategoryService) {}

    loadBooks(): void {
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
        console.log(this.books); 
        this.filteredBooks = this.books;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }
  ngOnInit(): void {
    this.loadBooks();
    this.loadCategories();
    this.filteredBooks = this.books;
    const inputFields = document.querySelectorAll('.input-field');
    inputFields.forEach((field: Element) => {
      field.addEventListener("focus", () => {
        field.classList.add("active");
      });

      field.addEventListener("blur", () => {
        if ((field as HTMLInputElement).value !== "") return;
        field.classList.remove("active");
      });
    });


  }


  submitForm(): void {
    this.bookService.addBook(this.newBook).subscribe(
      (response: any) => {
        console.log('Book added successfully:', response);
        this.loadBooks();
      },
      (error: any) => {
        console.error('Error adding book:', error);
        console.error(error);
      }
    );
  }
  filterBooks(): void {

    const lowerCaseFilter = this.categoryFilter.toLowerCase();
    // If the filter is empty, display all books
    if (!lowerCaseFilter) {
      this.filteredBooks = [...this.books];
    } else {
      // Filter books based on the category filter
      this.filteredBooks = this.books.filter((book) =>
        book.categories.some((category: { name: string }) =>
          category.name.toLowerCase().includes(lowerCaseFilter)
        )
      );
    }
  }

  addBookCategory(): void {
    if (this.selectedBook && this.categories) {
      // Clear existing categories
      this.selectedBook.categories = [];
  
      // Add selected categories based on checkboxes
      this.categories.forEach((category:any) => {
        if (category.checked) {
          this.selectedBook.categories.push(category);
        }
      });
    }
  }

}
