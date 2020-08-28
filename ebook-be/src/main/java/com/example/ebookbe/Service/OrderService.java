package com.example.ebookbe.Service;

import com.example.ebookbe.Entity.Order;
import com.example.ebookbe.Entity.Orderitem;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface OrderService {
    List<Order> findAll();

    List<String> addOrder(int userId, List<Integer> cartIdList);

    List<Order> findByUserId(int userId);

    List<Map<String,Object>> getBestSellers(Timestamp start, Timestamp end);

    List<Map<String,Object>> findByTimeAndId(int id, Timestamp start,Timestamp end);

    List getRichestUser(Timestamp start, Timestamp end);
}
