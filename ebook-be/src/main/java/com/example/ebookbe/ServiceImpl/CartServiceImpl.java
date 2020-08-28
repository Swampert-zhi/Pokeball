package com.example.ebookbe.ServiceImpl;
import com.example.ebookbe.Dao.BookDao;
import com.example.ebookbe.Entity.Book;
import com.example.ebookbe.Entity.Cartitem;
import com.example.ebookbe.Service.CartService;
import com.example.ebookbe.Dao.CartDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{
    @Autowired
    private CartDao cartDao;

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Cartitem> findByUserId(int id){
        return cartDao.findByUserId(id);
    }

    @Override
    public Cartitem addCartitem(int id, int bookId, int num){
        Cartitem cartitem = cartDao.findByUserIdAndBookId(id,bookId);
        if(cartitem!=null)
        {
            cartitem.addNum(num);
        }
        else
        {
            Book book=bookDao.findById(bookId);
            cartitem = new Cartitem();
            cartitem.setUserId(id);
            cartitem.setBook(book);
            cartitem.setNum(num);
        }
        return cartDao.saveCartitem(cartitem);
    }

    @Override
    public Cartitem updateCartitem(int cartId, int num){
        Cartitem cartitem = cartDao.findByCartId(cartId);
        cartitem.setNum(num);
        return cartDao.saveCartitem(cartitem);
    }

    @Override
    public void deleteCartitem(int id){
        cartDao.deleteCartitem(id);
    }
}
