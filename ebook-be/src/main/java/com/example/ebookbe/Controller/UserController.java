package com.example.ebookbe.Controller;

import com.example.ebookbe.Entity.User;
import com.example.ebookbe.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "/getuserbyid/{id}")
    public User getUserById(@PathVariable("id") int id) {
        return userService.getUserById(id);
    }

    @GetMapping(value="/getusers")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping(value="/changestatus/{id}")
    public int changeStatus(@PathVariable("id") int id) {
        return userService.changeStatus(id).getId();
    }

    @PostMapping(value="/login")
    public int checkLogin(
            @RequestParam("username") String username,
            @RequestParam("password") String password
    ){
        return userService.checkLogin(username,password);
    }

    @GetMapping(value="/checkusername/{username}")
    public boolean checkUsername(
            @PathVariable("username") String username
    ){
        return userService.checkUsername(username);
    }

    @PostMapping(value="/adduser")
    public int addUser(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("avatar") String avatar
    ){
        return userService.addUser(username,password,name,email,avatar).getId();
    }

    @PostMapping(value="/updateuser")
    public int updateUser(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("avatar") String avatar
    ){
        return userService.updateUser(username,password,name,email,avatar).getId();
    }
}
