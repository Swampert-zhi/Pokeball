package com.example.ebookbe.Entity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import static javax.persistence.GenerationType.IDENTITY;
@Entity
@Table(name = "orderitem",schema = "ebook")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "itemId")
public class Orderitem {
    private int itemId;
    private int orderId;
    private Book book;
    private int num;
    private float oldprice;

    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = IDENTITY)
    public int getItemId(){
        return this.itemId;
    }
    public void setItemId(int itemId){
        this.itemId = itemId;
    }

    @Basic
    @Column(name = "order_id")
    public int getOrderId(){
        return this.orderId;
    }
    public void setOrderId(int orderId){
        this.orderId = orderId;
    }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    public Book getBook(){
        return this.book;
    }
    public void setBook(Book book) {
        this.book = book;
    }

    @Basic
    @Column(name = "num")
    public int getNum(){
        return this.num;
    }
    public void setNum(int num){
        this.num = num;
    }

    @Basic
    @Column(name="oldprice")
    public float getOldprice() {
        return this.oldprice;
    }
    public void setOldprice(float oldprice){
        this.oldprice = oldprice;
    }
}
