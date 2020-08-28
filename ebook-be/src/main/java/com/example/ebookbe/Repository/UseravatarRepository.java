package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.Useravatar;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UseravatarRepository extends MongoRepository<Useravatar,Integer>{
}
