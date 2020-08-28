package com.example.ebookbe.Entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import static javax.persistence.GenerationType.IDENTITY;
@Entity
@Table(name = "cart",schema = "ebook")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "cartId")
public class Cartitem {
    private int cartId;
    private int userId;
    private Book book;
    private int num;

    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = IDENTITY)
    public int getCartId() {
        return this.cartId;
    }
    public void setCartId(int castId) {
        this.cartId = castId;
    }

    @Basic
    @Column(name = "id")
    public int getUserId() {
        return this.userId;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id")
    public Book getBook() { return this.book; }
    public void setBook(Book book) { this.book = book; }

    @Basic
    @Column(name = "num")
    public int getNum() {
        return this.num;
    }
    public void setNum(int num) {
        this.num = num;
    }
    public void addNum(int num){
        this.num += num;
    }
}
