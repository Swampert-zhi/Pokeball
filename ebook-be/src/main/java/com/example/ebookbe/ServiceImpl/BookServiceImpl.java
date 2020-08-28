package com.example.ebookbe.ServiceImpl;

import com.example.ebookbe.Dao.BookDao;
import com.example.ebookbe.Dao.CartDao;
import com.example.ebookbe.Dao.OrderDao;
import com.example.ebookbe.Entity.Book;
import com.example.ebookbe.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

    @Override
    public List<Book> findAll() {
        return bookDao.findAll();
    }

    @Override
    public List<Book> findAllExist(){
        return bookDao.findAllExist();
    }

    @Override
    public Book findById(int id) {
        return bookDao.findById(id);
    }

    @Override
    public Book addBook(String isbn, String title, String author, String language,
                            float price, int stock, String description, String image){
        Book book = bookDao.findByIsbn(isbn);
        if(book != null)
        {
            book.setTitle(title);
            book.setAuthor(author);
            book.setLanguage(language);
            book.setPrice(price);
            book.setStock(stock);
            book.setImage(null);
            book.setExist(true);
            book.setDescription(description);
            book.setImage(image);

            return bookDao.saveBook(book);
        }
        else
        {
            Book newbook = new Book();
            newbook.setIsbn(isbn);
            newbook.setTitle(title);
            newbook.setAuthor(author);
            newbook.setLanguage(language);
            newbook.setPrice(price);
            newbook.setStock(stock);
            newbook.setImage(null);
            newbook.setExist(true);
            newbook.setDescription(description);
            newbook.setImage(image);
            return bookDao.saveBook(newbook);
        }

    }

    @Override
    public Book updateBook(int bookId, String isbn, String title, String author, String language,
                      float price, int stock, String description, String image) {
        Book book = bookDao.findById(bookId);
        book.setBookId(bookId);
        book.setIsbn(isbn);
        book.setTitle(title);
        book.setAuthor(author);
        book.setLanguage(language);
        book.setPrice(price);
        book.setStock(stock);
        book.setExist(true);
        book.setDescription(description);
        book.setImage(image);
        return bookDao.saveBook(book);
    }

    @Override
    @Transactional
    public void deleteBook(int id){
        Book book = bookDao.findById(id);
        book.setExist(false);
        bookDao.saveBook(book);
    }
}
