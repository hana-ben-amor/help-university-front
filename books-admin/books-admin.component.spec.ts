import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminComponent } from './books-admin.component';

describe('BooksAdminComponent', () => {
  let component: BooksAdminComponent;
  let fixture: ComponentFixture<BooksAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksAdminComponent]
    });
    fixture = TestBed.createComponent(BooksAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
