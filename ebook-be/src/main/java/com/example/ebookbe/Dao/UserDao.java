package com.example.ebookbe.Dao;

import com.example.ebookbe.Entity.User;

import java.util.List;

public interface UserDao {
    List<User> findAll();

    List<User> findByName(String name);

    User findById(int id);

    User findByUsername(String username);

    User saveUser(User user);
}
