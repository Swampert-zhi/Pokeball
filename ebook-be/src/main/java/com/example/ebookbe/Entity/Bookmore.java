package com.example.ebookbe.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "book")
public class Bookmore {
    @Id
    private int bookId;
    private String description;
    private String image;

    public Bookmore(int bookId, String description, String image){
        this.bookId = bookId;
        this.description = description;
        this.image = image;
    }

    public void setDescription(String description){
        this.description = description;
    }
    public String getDescription(){
        return this.description;
    }

    public void setImage(String image){
        this.image = image;
    }
    public String getImage(){
        return this.image;
    }
}
