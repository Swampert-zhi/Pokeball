package com.example.ebookbe.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "book", schema = "ebook")
@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer", "fieldHandler"})
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "bookId")
public class Book {
    private int bookId;
    private String isbn;
    private String title;
    private String author;
    private String language;
    private float price;
    private int stock;
    private boolean exist;
    private String description;
    private String image;

    @Id
    @Column(name = "book_id")
    @GeneratedValue(strategy = IDENTITY)
    public int getBookId() {
        return bookId;
    }
    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    @Basic
    @Column(name = "isbn")
    public String getIsbn() {
        return isbn;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "author")
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    @Basic
    @Column(name = "language")
    public String getLanguage() { return language;}
    public void setLanguage(String language) { this.language = language; }

    @Basic
    @Column(name = "price")
    public float getPrice() { return price; }
    public void setPrice(float price) { this.price = price; }

    @Basic
    @Column(name = "stock")
    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }

    @Basic
    @Column(name="exist")
    public boolean getExist() {
        return exist;
    }
    public void setExist(boolean exist) {
        this.exist = exist;
    }

    @Transient
    public String getDescription() { return description;}
    public void setDescription(String description) { this.description = description; }

    @Transient
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
