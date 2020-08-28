package com.example.ebookbe.Controller;

import com.example.ebookbe.Entity.Cartitem;
import com.example.ebookbe.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class CartController {
    @Autowired
    private CartService cartService;

    @GetMapping(value = "/getcart/{id}")
    public List<Cartitem> getcart(@PathVariable("id") int id){
        return cartService.findByUserId(id);
    }

    @PostMapping(value = "/postcart")
    public int updatecart(
            @RequestParam(value = "cartId") int cartId,
            @RequestParam(value = "num") int num
    ){
        cartService.updateCartitem(cartId,num);
        return 0;
    }

    @PostMapping(value = "/addcart")
    public int addcart(
            @RequestParam(value = "id") int id,
            @RequestParam(value = "bookId") int bookId,
            @RequestParam(value = "num") int num
    ){
        return cartService.addCartitem(id,bookId,num).getNum();
    }

    @DeleteMapping(value = "/deletecart/{cartId}")
    public void deletecart(@PathVariable("cartId") int cartId){
        cartService.deleteCartitem(cartId);
    }
}
