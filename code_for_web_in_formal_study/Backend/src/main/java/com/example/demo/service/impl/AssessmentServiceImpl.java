package com.example.demo.service.impl;

import com.example.demo.Result.Receive;
import com.example.demo.mapper.AssessmentMapper;
import com.example.demo.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssessmentServiceImpl implements AssessmentService {

    @Autowired
    AssessmentMapper assessmentMapper;
    @Override
    public void saveSort(Receive receive) {
        assessmentMapper.saveSort(receive);
    }

}
