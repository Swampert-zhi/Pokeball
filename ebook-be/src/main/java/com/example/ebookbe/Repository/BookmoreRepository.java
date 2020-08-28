package com.example.ebookbe.Repository;

import com.example.ebookbe.Entity.Bookmore;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookmoreRepository extends MongoRepository<Bookmore,Integer>{
}
