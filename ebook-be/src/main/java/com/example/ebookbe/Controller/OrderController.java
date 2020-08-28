package com.example.ebookbe.Controller;


import com.alibaba.fastjson.JSONObject;
import com.example.ebookbe.Dao.OrderDao;
import com.example.ebookbe.Entity.*;
import com.example.ebookbe.Service.BookService;
import com.example.ebookbe.Service.CartService;
import com.example.ebookbe.Service.OrderService;
//import net.sf.json.JSON;
import com.example.ebookbe.Service.UserService;
import net.sf.json.JSONArray;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;


@CrossOrigin
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping(value="/addorder")
    public List<String> addOrder(
            @RequestBody Map<String,Object> s) {

        String s_userId = s.get("userId").toString();
        int userId = Integer.parseInt(s_userId);

        Object order = s.get("order").toString();
        List<Integer> cartIdList = new LinkedList<>();
        JSONArray jsonArray = JSONArray.fromObject(order);

        for(int i = 0; i < jsonArray.size(); ++i)
        {
            cartIdList.add(jsonArray.getJSONObject(i).getInt("cartId"));
        }

        return orderService.addOrder(userId,cartIdList);
    }

    @GetMapping(value = "/getallorders")
    public String findAll() {
        List<Order> orderList = orderService.findAll();
        String jsonStr = JSON.toJSONString(orderList, SerializerFeature.DisableCircularReferenceDetect);
        return jsonStr;
    }

    @GetMapping(value = "/getordersbyid/{id}")
    public String findByUserId(@PathVariable("id") int userId){
        List<Order> orderList = orderService.findByUserId(userId);
        String jsonStr = JSON.toJSONString(orderList, SerializerFeature.DisableCircularReferenceDetect);
        return jsonStr;
    }

    @PostMapping(value = "/getbestsellers")
    public List<Map<String,Object>> getBestSellers(
            @RequestParam(value = "start") Timestamp start,
            @RequestParam(value = "end") Timestamp end
    ){
        return orderService.getBestSellers(start,end);
    }

    @PostMapping(value = "/getrichestusers")
    public List<Map<String,Object>> getRichestUser(
            @RequestParam(value = "start") Timestamp start,
            @RequestParam(value = "end") Timestamp end
    ){
        return orderService.getRichestUser(start,end);
    }

    @PostMapping(value="/getmystats")
    public List<Map<String,Object>> findByTimeAndId(
            @RequestParam(value = "id") int id,
            @RequestParam(value = "start") Timestamp start,
            @RequestParam(value = "end") Timestamp end
    ){
        return orderService.findByTimeAndId(id,start,end);
    }

}
