package com.example.ebookbe.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "user",schema = "ebook")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class User {
    private int id;
    private String username;
    private String password;
    private String name;
    private String email;
    private boolean role; //0-customer,1-administrator
    private boolean usable;
    private String avatar;
    private List<Order> orderList;
    private List<Cartitem> cart;

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = IDENTITY)
    public int getId() { return id;}
    public void setId(int id) { this.id = id; }

    @Basic
    @Column(name = "username")
    public String getUsername() { return username;}
    public void setUsername(String username) { this.username = username; }

    @Basic
    @Column(name = "password")
    public String getPassword() { return password;}
    public void setPassword(String password) { this.password = password; }

    @Basic
    @Column(name = "name")
    public String getName() { return name;}
    public void setName(String name) { this.name = name; }


    @Basic
    @Column(name = "email")
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email;}

    @Basic
    @Column(name = "role")
    public boolean getRole() { return role; }
    public void setRole(boolean role) { this.role = role; }

    @Basic
    @Column(name = "usable")
    public boolean getUsable() { return usable; }
    public void setUsable(boolean usable) {
        this.usable = usable;
    }

    @Transient
    public String getAvatar() { return avatar;}
    public void setAvatar(String avatar) { this.avatar = avatar; }

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    public List<Order> getOrderList() { return orderList;}
    public void setOrderList(List<Order> orderList) { this.orderList = orderList; }

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    public List<Cartitem> getCart() { return cart;}
    public void setCart(List<Cartitem> cart) { this.cart = cart; }
}
