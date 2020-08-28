package com.example.ebookbe.Dao;

import com.example.ebookbe.Entity.Cartitem;

import java.util.List;

public interface CartDao {
    Cartitem findByCartId(int id);

    List<Cartitem> findByUserId(int id);

    Cartitem findByUserIdAndBookId(int id,int bookId);

    Cartitem saveCartitem(Cartitem cartitem);

    void deleteCartitem(int id);

    void deleteByBookId(int bookId);
}
