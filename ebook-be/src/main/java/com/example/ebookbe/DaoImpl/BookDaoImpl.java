package com.example.ebookbe.DaoImpl;

import com.example.ebookbe.Dao.BookDao;
import com.example.ebookbe.Entity.Book;
import com.example.ebookbe.Entity.Bookmore;
import com.example.ebookbe.Repository.BookRepository;
import com.example.ebookbe.Repository.BookmoreRepository;
import com.example.ebookbe.Repository.CartRepository;
import com.example.ebookbe.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao{
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookmoreRepository bookmoreRepository;

    @Override
    public List<Book> findAll() {
        List<Book> bookList=bookRepository.findAll();
        for (Book book:bookList) {
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
            {
                book.setDescription(bookmore.get().getDescription());
                book.setImage(bookmore.get().getImage());
            }
            else
            {
                book.setDescription(null);
                book.setImage(null);
            }
        }
        return bookList;
    }

    @Override
    public List<Book> findAllExist(){
        List<Book> bookList=bookRepository.findByExist(true);
        for (Book book:bookList) {
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
            {
                book.setDescription(bookmore.get().getDescription());
                book.setImage(bookmore.get().getImage());
            }
            else
            {
                book.setDescription(null);
                book.setImage(null);
            }
        }
        return bookList;
    }

    @Override
    public Book findById(int id) {
        Book book =bookRepository.getOne(id);

        if(book!=null)
        {
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
            {
                book.setDescription(bookmore.get().getDescription());
                book.setImage(bookmore.get().getImage());
            }
            else
            {
                book.setDescription(null);
                book.setImage(null);
            }
        }

        return book;
    }

    @Override
    public Book findByIsbn(String isbn) {
        Book book =bookRepository.findByIsbn(isbn);
        if(book!=null)
        {
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
            {
                book.setDescription(bookmore.get().getDescription());
                book.setImage(bookmore.get().getImage());
            }
            else
            {
                book.setDescription(null);
                book.setImage(null);
            }
        }
        return book;
    }

    @Override
    public Book saveBook(Book frontbook) {
        Book  book = bookRepository.saveAndFlush(frontbook);
        Bookmore bookmore = new Bookmore(book.getBookId(),book.getDescription(),book.getImage());
        bookmoreRepository.save(bookmore);
        return book;
    }

    @Override
    public void deleteBook(int id) {
        bookRepository.deleteById(id);
        bookmoreRepository.deleteById(id);
        bookRepository.flush();
    }
}
