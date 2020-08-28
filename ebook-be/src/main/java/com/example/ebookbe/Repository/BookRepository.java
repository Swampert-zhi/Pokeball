package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByIsbn(String isbn);

    List<Book> findByTitle(String title);

    List<Book> findByAuthor(String author);

    List<Book> findByLanguage(String language);

    List<Book> findByExist(boolean exist);
}
