package com.example.demo;

import com.example.demo.controller.IdentityController;
import com.example.demo.mapper.UserMapper;
import com.example.demo.pojo.User;
import com.example.demo.service.impl.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class test {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private IdentityController identityController;

    @Test
    public void testsave(){
        User user = new User(8,10,"nan","nan","nan","nan","nan");
//        userService = new UserServiceImpl();
//        userService.createUser(user);
//        user = userMapper.selectValue();
//        System.out.println(user);
        identityController.createUser(user);


    }

}
