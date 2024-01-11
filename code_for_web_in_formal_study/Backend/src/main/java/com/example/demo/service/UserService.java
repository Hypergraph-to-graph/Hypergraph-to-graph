package com.example.demo.service;

import com.example.demo.pojo.User;

public interface UserService {
    void createUser(User user);
    int findCurrentId(); 
}
