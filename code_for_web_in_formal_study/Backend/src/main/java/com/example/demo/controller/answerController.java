package com.example.demo.controller;

import com.example.demo.Result.Receive;
import com.example.demo.Result.Result;
import com.example.demo.mapper.AssessmentMapper;
import com.example.demo.mapper.UserMapper;
import com.example.demo.pojo.Assessment;
import com.example.demo.pojo.User;
import com.example.demo.service.AssessmentService;
import com.example.demo.service.UserService;
import com.example.demo.service.impl.AssessmentServiceImpl;
import com.example.demo.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class answerController {
    @Autowired
    AssessmentServiceImpl assessmentService;

    @Autowired
    UserServiceImpl userService;

    @PostMapping("/answer")
    public Result submitAnswer(@RequestBody Receive receive){
//        receive.print();
        assessmentService.saveSort(receive);
        return new Result(1,200,"success");
    }
}
