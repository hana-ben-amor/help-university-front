import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  recentBlogs: any[] = [];
  recentBooks:any[]=[]; // Update the type based on your user data structure

  constructor(private blogService: BlogService,private bookService:BookService) {}

  ngOnInit(): void {
    this.bookService.getRecentBooks().subscribe(
      (data) => {
        this.recentBooks = data;
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );

    this.blogService.getRecentBlogs().subscribe(
      (data) => {
        this.recentBlogs = data;
      },
      (error) => {
        console.error('Error fetching blogs:', error);
      }
    );
  }
}
