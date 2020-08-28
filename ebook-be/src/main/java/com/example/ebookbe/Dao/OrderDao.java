package com.example.ebookbe.Dao;

import com.example.ebookbe.Entity.Order;
import com.example.ebookbe.Entity.Orderitem;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface OrderDao {
    Order saveOrder(Order order);

    Orderitem saveItem(Orderitem orderitem);

    void deleteItemByBookId(int bookId);

    List<Order> findAll();

    List<Map<String,Object>> findByTimeGroupByBook(Timestamp start, Timestamp end);

    List<Map<String,Object>> findByTimeGroupByUser(Timestamp start,Timestamp end);

    List<Map<String,Object>> findByTimeAndId(int id, Timestamp start,Timestamp end);

    List<Order> findByUserId(int userId);
}
