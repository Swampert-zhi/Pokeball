package com.example.ebookbe.ServiceImpl;


import com.example.ebookbe.Dao.BookDao;
import com.example.ebookbe.Dao.CartDao;
import com.example.ebookbe.Dao.OrderDao;
import com.example.ebookbe.Entity.Book;
import com.example.ebookbe.Entity.Cartitem;
import com.example.ebookbe.Entity.Order;
import com.example.ebookbe.Entity.Orderitem;
import com.example.ebookbe.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrderDao orderDao;

    @Autowired
    private CartDao cartDao;

    @Autowired
    private BookDao bookDao;

    @Override
    public List<Order> findAll(){
        return orderDao.findAll();
    }

    @Override
    public List<String> addOrder(int userId, List<Integer> cartIdList){
        Order neworder = new Order();
        neworder.setUserId(userId);
        neworder = orderDao.saveOrder(neworder);

        int num, stock;
        Book book;
        List<String> stringList = new LinkedList<>();

        for(int cartId:cartIdList)
        {
            Cartitem cartitem = cartDao.findByCartId(cartId);
            num = cartitem.getNum();

            book = bookDao.findById(cartitem.getBook().getBookId());
            stock = book.getStock();

            if (stock >= num) {
                book.setStock(book.getStock() - num);
                bookDao.saveBook(book);

                Orderitem orderitem = new Orderitem();
                orderitem.setBook(book);
                orderitem.setNum(num);
                orderitem.setOrderId(neworder.getOrderId());
                orderitem.setOldprice(book.getPrice());

                orderDao.saveItem(orderitem);

                cartDao.deleteCartitem(cartId);
            }
            else {
                stringList.add("《"+book.getTitle()+"》");
            }
        }
        return  stringList;
    }

    @Override
    public List<Order> findByUserId(int userId){
        return orderDao.findByUserId(userId);
    }

    @Override
    public List<Map<String,Object>> getBestSellers(Timestamp start, Timestamp end){
        return orderDao.findByTimeGroupByBook(start,end);
    }

    @Override
    public List<Map<String,Object>> findByTimeAndId(int id, Timestamp start,Timestamp end){
        return orderDao.findByTimeAndId(id,start,end);
    }

    @Override
    public List<Map<String,Object>> getRichestUser(Timestamp start, Timestamp end){
        return orderDao.findByTimeGroupByUser(start,end);
    }
}
