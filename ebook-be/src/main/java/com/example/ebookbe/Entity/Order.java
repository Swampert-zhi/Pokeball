package com.example.ebookbe.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.ser.std.StdKeySerializers;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "userorder", schema = "ebook")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "orderId")
public class Order {
    private int orderId;
    private int userId;
    private String username;
    private Timestamp ordertime;
    private List<Orderitem> neworder;
    @Id
    @Column(name = "order_id")
    @GeneratedValue(strategy = IDENTITY)
    public int getOrderId() { return orderId;}
    public void setOrderId(int orderId) { this.orderId = orderId; }

    @Basic
    @Column(name = "id")
    public int getUserId() { return userId;}
    public void setUserId(int userId) { this.userId = userId; }

    @Transient
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    @Basic
    @Column(name = "ordertime")
    @CreationTimestamp
    @JSONField(format="yyyy-MM-dd HH:mm:ss")
//    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
    public Timestamp getOrdertime() { return ordertime; }
    public void setOrdertime(Timestamp ordertime) { this.ordertime = ordertime; }

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    @Cascade(value = org.hibernate.annotations.CascadeType.DELETE)
    public List<Orderitem> getNeworder() { return neworder; }
    public void setNeworder(List<Orderitem> neworder) { this.neworder = neworder; }
    public void addOderitem(Orderitem o) {  this.neworder.add(o); }
}
