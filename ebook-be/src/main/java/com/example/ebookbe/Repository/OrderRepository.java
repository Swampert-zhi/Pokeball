package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Integer>{
    List<Order> findByUserId(int id);

    void deleteByOrderId(int id);
}
