package com.example.demo.pojo;
import com.baomidou.mybatisplus.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@TableName("user")
@AllArgsConstructor
public class User {
    private int id;
    private int age;
    private String gender;
    private String research_field;
    private String is_familiar;
    private String is_used;
    private String introduce;

}
