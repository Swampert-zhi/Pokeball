package com.example.ebookbe.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "user")
public class Useravatar {
    @Id
    private int id;
    private String avatar;

    public Useravatar(int id, String avatar) {
        this.id = id;
        this.avatar = avatar;
    }

    public int getId(){ return id; }
    public void setId(int id) { this.id = id; }

    public String getAvatar(){ return avatar; }
    public void setAvatar(String avatar){ this.avatar = avatar; }
}
