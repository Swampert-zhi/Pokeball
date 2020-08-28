package com.example.ebookbe.Service;

import com.example.ebookbe.Entity.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User getUserById(int id);

    List<User> getUsers();

    User changeStatus(int id);

    int checkLogin(String username, String password);

    boolean checkUsername(String username);

    User addUser(String username, String password, String name, String email, String avatar);

    User updateUser(String username, String password, String name, String email, String avatar);

    User findById(int id);

}
