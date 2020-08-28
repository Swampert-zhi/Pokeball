package com.example.ebookbe.Service;

import com.example.ebookbe.Entity.Book;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface BookService {
    List<Book> findAll();

    List<Book> findAllExist();

    Book findById(int id);

    Book addBook(String isbn, String title, String author, String language,
                    float price, int stock, String description, String image);

    Book updateBook(int bookId, String isbn, String title, String author, String language,
            float price, int stock, String description, String image);


    void deleteBook(int id);
}
