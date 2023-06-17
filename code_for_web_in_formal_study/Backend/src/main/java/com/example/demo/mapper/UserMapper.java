package com.example.demo.mapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.demo.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface UserMapper {

    @Insert("INSERT INTO user(id,age,gender,research_field,is_familiar,is_used,introduce) VALUES (#{id},#{age},#{gender},#{research_field},#{is_familiar},#{is_used},#{introduce})")
    void createUser(User user);

    @Select("Select MAX(id) FROM user")
    int findCurrentId();

}
