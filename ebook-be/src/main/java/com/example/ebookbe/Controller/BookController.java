package com.example.ebookbe.Controller;

import com.example.ebookbe.Entity.Book;
import com.example.ebookbe.Service.BookService;
import com.example.ebookbe.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping(value = "/getbook")
    public List<Book> findAllExist() {
        return bookService.findAllExist();
    }

    @GetMapping(value = "/getbookbyid/{id}")
    public Book findById(@PathVariable("id") int id) {
        return bookService.findById(id);
    }

    @PostMapping(value="/addbook")
    public int addBook(
            @RequestParam(value="isbn") String isbn,
            @RequestParam(value="title") String title,
            @RequestParam(value="author") String author,
            @RequestParam(value="language") String language,
            @RequestParam(value="price") float price,
            @RequestParam(value="stock") int stock,
            @RequestParam(value="description") String description,
            @RequestParam(value="image") String image
    ) {
        return bookService.addBook(isbn,title,author,language,
                price,stock,description,image).getBookId();
    }

    @DeleteMapping(value = "/deletebook/{id}")
    public void delete(@PathVariable("id") int id) {
        bookService.deleteBook(id);
    }

    @PostMapping(value = "/postbook")
    public int update(
            @RequestParam(value="bookId") int bookId,
            @RequestParam(value="isbn") String isbn,
            @RequestParam(value="title") String title,
            @RequestParam(value="author") String author,
            @RequestParam(value="language") String language,
            @RequestParam(value="price") float price,
            @RequestParam(value="stock") int stock,
            @RequestParam(value="description") String description,
            @RequestParam(value="image") String image
    ) {
        return bookService.updateBook(bookId,isbn,title,author,language,
                price, stock,description,image).getBookId();
    }

}
