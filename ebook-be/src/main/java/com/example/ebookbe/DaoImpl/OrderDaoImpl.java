package com.example.ebookbe.DaoImpl;

import com.example.ebookbe.Entity.*;
import com.example.ebookbe.Dao.OrderDao;
import com.example.ebookbe.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.*;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.*;

@Repository
public class OrderDaoImpl implements OrderDao{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private BookmoreRepository bookmoreRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UseravatarRepository useravatarRepository;

    @Override
    public Order saveOrder(Order order){
        return orderRepository.saveAndFlush(order);
    }

    @Override
    public Orderitem saveItem(Orderitem item) {
        return itemRepository.saveAndFlush(item);
    }

    @Override
    @Transactional
    public void deleteItemByBookId(int bookId){
        itemRepository.deleteByBookId(bookId);
        List<Order> orderList = orderRepository.findAll();
        for(Order order:orderList)
        {
            if(order.getNeworder().isEmpty())
                orderRepository.deleteByOrderId(order.getOrderId());
        }
    }

    @Override
    public List<Order> findAll(){
        List<Order>   orderList = orderRepository.findAll();
        for (Order order:orderList) {
            List<Orderitem> itemList = order.getNeworder();

            for(Orderitem orderitem:itemList){
                Book book = orderitem.getBook();
                Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
                if(bookmore.isPresent())
                    book.setImage(bookmore.get().getImage());
                else
                    book.setImage(null);
                orderitem.setBook(book);
            }

            Optional<User> user = userRepository.findById(order.getUserId());
            if(user.isPresent())
                order.setUsername(user.get().getUsername());
        }
        return orderList;
    }

    @Override
    public List<Map<String,Object>> findByTimeGroupByBook(Timestamp start, Timestamp end){
        List objectList = itemRepository.findByTimeGroupByBook(start,end);

        List<Map<String,Object>> mapList = new ArrayList<>();

        int rank = 0;

        for(Object object:objectList)
        {
            Object[] row = (Object[]) object;
            Map<String,Object> map = new HashMap<String, Object>();

            rank++;
            map.put("rank",rank);

            map.put("num",row[0]);

            Book book = (Book)row[1];
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
            {
                book.setImage(bookmore.get().getImage());
                book.setDescription(bookmore.get().getDescription());
            }
            else
            {
                book.setImage(null);
                book.setDescription(null);
            }
            map.put("book",book);

            mapList.add(map);
        }
        return mapList;
    }

    @Override
    public List<Map<String,Object>> findByTimeGroupByUser(Timestamp start,Timestamp end){
        List objectList = itemRepository.findByTimeGroupByUser(start,end);

        List<Map<String,Object>> mapList = new ArrayList<>();

        int rank = 0;

        for(Object object:objectList)
        {
            Object[] row = (Object[]) object;
            Map<String,Object> map = new HashMap<String, Object>();

            rank++;
            map.put("rank",rank);

            map.put("totalprice",row[0]);

            map.put("totalnum",row[1]);

            User user = (User)row[2];
            user.setCart(null);
            user.setOrderList(null);
            user.setPassword(null);
            Optional<Useravatar> Useravatar = useravatarRepository.findById(user.getId());
            if(Useravatar.isPresent())
                user.setAvatar(Useravatar.get().getAvatar());
            else
                user.setAvatar(null);
            map.put("user",user);

            mapList.add(map);
        }
        return mapList;
    }

    @Override
    public List<Map<String,Object>> findByTimeAndId(int id, Timestamp start,Timestamp end){
        List objectList = itemRepository.findByTimeAndId(id,start,end);

        List<Map<String,Object>> mapList = new ArrayList<>();

        for(Object object:objectList)
        {
            Object[] row = (Object[]) object;
            Map<String,Object> map = new HashMap<String, Object>();

            map.put("totalprice",row[0]);

            map.put("totalnum",row[1]);

            Book book = (Book)row[2];
            Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
            if(bookmore.isPresent())
            {
                book.setImage(bookmore.get().getImage());
                book.setDescription(bookmore.get().getDescription());
            }
            else
            {
                book.setImage(null);
                book.setDescription(null);
            }

            map.put("book",book);

            mapList.add(map);
        }
        return mapList;
    }

    @Override
    public List<Order> findByUserId(int userId){
        List<Order> orderList = orderRepository.findByUserId(userId);
        for (Order order:orderList) {
            List<Orderitem> itemList = order.getNeworder();

            for(Orderitem orderitem:itemList){
                Book book = orderitem.getBook();
                Optional<Bookmore> bookmore = bookmoreRepository.findById(book.getBookId());
                if(bookmore.isPresent())
                    book.setImage(bookmore.get().getImage());
                else
                    book.setImage(null);
                orderitem.setBook(book);
            }

            Optional<User> user = userRepository.findById(order.getUserId());
            if(user.isPresent())
                order.setUsername(user.get().getUsername());
        }

        return orderList;
    }
}
