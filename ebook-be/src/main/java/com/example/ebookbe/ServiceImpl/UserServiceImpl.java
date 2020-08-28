package com.example.ebookbe.ServiceImpl;

import com.example.ebookbe.Dao.UserDao;
import com.example.ebookbe.Entity.User;
import com.example.ebookbe.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public List<User> findAll(){
        return userDao.findAll();
    }

    @Override
    public User getUserById(int id){
        User user = userDao.findById(id);

        user.setCart(null);
        user.setOrderList(null);
        user.setPassword(null);

        return user;
    }

    @Override
    public List<User> getUsers() {
        List<User> userList = userDao.findAll();
        for (User user:userList) {
            user.setCart(null);
            user.setOrderList(null);
            user.setPassword(null);
        }
        return userList;
    }

    @Override
    public User changeStatus(int id) {
        User user = userDao.findById(id);
        user.setUsable(!user.getUsable());
        return userDao.saveUser(user);
    }

    @Override
    public User findById(int id){
        return userDao.findById(id);
    }

    @Override
    public int checkLogin(String username, String password){
        User user = userDao.findByUsername(username);

        if(user!=null) {
            if (password.equals(user.getPassword()))
            {
                if(user.getUsable() == false)
                    return 0;
                else
                    return user.getId();
            }
            else
                return -1;
        }
        return -1;
    }

    @Override
    public boolean checkUsername(String username){
        User user = userDao.findByUsername(username);
        if(user!=null)
            return false;
        else
            return true;
    }

    @Override
    public User addUser(String username, String password, String name, String email, String avatar){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setName(name);
        user.setEmail(email);
        user.setAvatar(avatar);
        user.setRole(false);
        user.setUsable(true);
        return userDao.saveUser(user);
    }

    @Override
    public User updateUser(String username, String password, String name, String email, String avatar){
        User user = userDao.findByUsername(username);
        user.setPassword(password);
        user.setName(name);
        user.setEmail(email);
        user.setAvatar(avatar);
        return userDao.saveUser(user);
    }
}
