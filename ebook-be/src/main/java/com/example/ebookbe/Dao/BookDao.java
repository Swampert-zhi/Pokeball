package com.example.ebookbe.Dao;

import com.example.ebookbe.Entity.Book;

import java.util.List;

public interface BookDao {
    List<Book> findAll();

    List<Book> findAllExist();

    Book findById(int id);

    Book findByIsbn(String isbn);

    Book saveBook(Book book);

    void deleteBook(int id);
}
