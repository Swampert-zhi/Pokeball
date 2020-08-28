package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.Cartitem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface CartRepository extends JpaRepository<Cartitem,Integer>{
    @Query("SELECT c from Cartitem c where c.userId = ?1 and c.book.bookId = ?2 ")
    Cartitem findByUserIdAndBookId(int id,int bookId);

    List<Cartitem> findByUserId(int id);

    @Modifying
    @Transactional
    @Query("delete from Cartitem where book.bookId = ?1")
    void deleteByBookId(int bookId);


}
