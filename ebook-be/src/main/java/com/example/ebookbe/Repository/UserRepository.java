package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer>{
    List<User> findByName(String name);

    User findByUsername(String username);
}
