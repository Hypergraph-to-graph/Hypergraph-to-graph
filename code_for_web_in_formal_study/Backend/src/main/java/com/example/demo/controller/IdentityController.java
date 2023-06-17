package com.example.demo.controller;

import com.example.demo.Result.Result;
import com.example.demo.pojo.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class IdentityController {
    @Autowired
    UserService userService;
    @PostMapping("/identity")
    public Result createUser(@RequestBody User user){
        int id = userService.findCurrentId();
        user.setId(id + 1);
        userService.createUser(user);
        return new Result(id + 1,200,"success");
    }

}
