package com.example.ebookbe.DaoImpl;

import com.example.ebookbe.Dao.CartDao;
import com.example.ebookbe.Entity.Book;
import com.example.ebookbe.Entity.Bookmore;
import com.example.ebookbe.Entity.Cartitem;
import com.example.ebookbe.Repository.BookmoreRepository;
import com.example.ebookbe.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public class CartDaoImpl implements CartDao{
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private BookmoreRepository bookmoreRepository;

    @Override
    public Cartitem findByCartId(int id){
        Cartitem cartitem= cartRepository.getOne(id);
        Book book = cartitem.getBook();
        Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
        if(bookmore.isPresent())
            book.setImage(bookmore.get().getImage());
        else
            book.setImage(null);
        cartitem.setBook(book);
        return cartitem;
    }

    @Override
    public List<Cartitem> findByUserId(int id){
        List<Cartitem> cartitemList = cartRepository.findByUserId(id);
        for (Cartitem cartitem:cartitemList) {
            Book book = cartitem.getBook();
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
                book.setImage(bookmore.get().getImage());
            else
                book.setImage(null);
            cartitem.setBook(book);
        }
        return cartitemList;
    }

    @Override
    public Cartitem findByUserIdAndBookId(int id,int bookId) {
        Cartitem cartitem= cartRepository.findByUserIdAndBookId(id,bookId);
        if(cartitem == null)
            return null;
        Book book = cartitem.getBook();
        Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
        if(bookmore.isPresent())

            book.setImage(bookmore.get().getImage());
        else
            book.setImage(null);
        cartitem.setBook(book);
        return cartitem;
    }

    @Override
    public Cartitem saveCartitem(Cartitem cartitem){
        return cartRepository.saveAndFlush(cartitem);
    }

    @Override
    public void deleteCartitem(int id){
        cartRepository.deleteById(id);
        cartRepository.flush();
    }
    @Override
    @Transactional
    public void deleteByBookId(int bookId){
        cartRepository.deleteByBookId(bookId);
    }
}
