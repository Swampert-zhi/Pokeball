package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.Orderitem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;


public interface ItemRepository extends JpaRepository<Orderitem,Integer> {
    @Modifying
    @Transactional
    @Query("delete from Orderitem where book.bookId = ?1")
    void deleteByBookId(int bookId);

    @Query("SELECT DISTINCT " +
            "sum(i.num) as num, i.book as book " +
            "FROM Orderitem i INNER JOIN Order j " +
            "ON ?1 <= j.ordertime and j.ordertime <= ?2 and i.orderId = j.orderId "+
            "GROUP BY i.book.bookId " +
            "ORDER BY num desc")
    List findByTimeGroupByBook(Timestamp start, Timestamp end);

    @Query("select sum(i.num*i.oldprice) as totalprice, sum(i.num) as totalnum, u as User " +
            "from Orderitem i " +
            "inner join Order o " +
            "on i.orderId = o.orderId " +
            "inner join User u " +
            "on u.id = o.userId " +
            "where ?1 <= o.ordertime and o.ordertime <= ?2 " +
            "group by u.id " +
            "order by totalprice desc ")
    List findByTimeGroupByUser(Timestamp start,Timestamp end);

    @Query("select sum(i.num*i.oldprice) as totalprice, sum(i.num) as totalnum, i.book as book " +
            "from Orderitem i " +
            "inner join Order o " +
            "on i.orderId = o.orderId " +
            "inner join User u " +
            "on u.id = o.userId " +
            "where u.id = ?1 and ?2 <= o.ordertime and o.ordertime <= ?3 " +
            "group by i.book.bookId " +
            "order by i.book.bookId asc" )
    List findByTimeAndId(int id, Timestamp start,Timestamp end);
}
