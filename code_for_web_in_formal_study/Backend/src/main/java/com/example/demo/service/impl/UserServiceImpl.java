package com.example.demo.service.impl;

import com.example.demo.mapper.AssessmentMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.pojo.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private AssessmentMapper assessmentMapper;

    @Override
    public void createUser(User user) {
        userMapper.createUser(user);
        assessmentMapper.createUser(user);
    }

    @Override
    public int findCurrentId() {
        return userMapper.findCurrentId();
    }
}
