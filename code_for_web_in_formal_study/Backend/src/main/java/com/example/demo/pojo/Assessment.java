package com.example.demo.pojo;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@TableName("assessment")
@AllArgsConstructor
public class Assessment {
    private int id;
    private String sort1_1;
    private String sort1_2;
    private String sort1_3;
    private String judge1_4;
    private String judge1_5;
    private String judge1_6;

    private String sort2_1;
    private String sort2_2;
    private String sort2_3;
    private String judge2_4;
    private String judge2_5;
    private String judge2_6;

    private String sort3_1;
    private String sort3_2;
    private String sort3_3;
    private String judge3_4;
    private String judge3_5;
    private String judge3_6;

    private String sort4_1;
    private String sort4_2;
    private String sort4_3;
    private String sort4_4;
    private String sort4_5;
    private String sort4_6;
    private String judge4_7;
    private String judge4_8;
    private String judge4_9;

    private String sameEdge5_1;
    private String sameEdge5_2;
    private String sameEdge5_3;
    private String sameEdge5_4;
    private String sameEdge5_5;
    private String sameEdge5_6;
    private String sameEdge5_7;
    private String sameEdge5_8;
    private String sameEdge5_9;

    private String sort6_1;
    private String sort6_2;
    private String sort6_3;

    private String is_important_1;
    private String is_important_2;
    private String is_important_3;
    private String is_important_4;
    private String is_important_5;
    private String is_important_6;

    private String other_factors;

}
