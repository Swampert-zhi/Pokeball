package com.example.ebookbe.DaoImpl;

import com.example.ebookbe.Dao.UserDao;
import com.example.ebookbe.Entity.User;
import com.example.ebookbe.Entity.Useravatar;
import com.example.ebookbe.Repository.UserRepository;
import com.example.ebookbe.Repository.UseravatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UseravatarRepository useravatarRepository;

    @Override
    public  List<User> findAll() {
        List<User> userList = userRepository.findAll();
        for (User user:userList) {
            Optional<Useravatar> useravatar = useravatarRepository.findById(user.getId());
            if(useravatar.isPresent())
                user.setAvatar(useravatar.get().getAvatar());
            else
                user.setAvatar(null);
        }
        return userList;
    }

    @Override
    public List<User> findByName(String name) {
        return userRepository.findByName(name);
    }

    @Override
    public User findById(int id) {
        User user = userRepository.getOne(id);
        Optional<Useravatar> useravatar = useravatarRepository.findById(id);
        if(useravatar.isPresent())
            user.setAvatar(useravatar.get().getAvatar());
        else
            user.setAvatar(null);
        return user;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User saveUser(User newuser){
        User user = userRepository.saveAndFlush(newuser);
        Useravatar avatar = new Useravatar(newuser.getId(),newuser.getAvatar());
        useravatarRepository.save(avatar);
        return user;
    }
}
