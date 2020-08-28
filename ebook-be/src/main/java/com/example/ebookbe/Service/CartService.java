package com.example.ebookbe.Service;

import com.example.ebookbe.Entity.Cartitem;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CartService {

    List<Cartitem> findByUserId(int id);

    Cartitem addCartitem(int id, int bookId, int num);

    Cartitem updateCartitem(int cartId, int num);

    void deleteCartitem(int id);
}
