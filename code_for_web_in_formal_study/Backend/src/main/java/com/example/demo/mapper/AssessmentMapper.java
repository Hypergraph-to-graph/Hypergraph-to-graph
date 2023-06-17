package com.example.demo.mapper;


import com.example.demo.Result.Receive;
import com.example.demo.pojo.Assessment;
import com.example.demo.pojo.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AssessmentMapper {
    @Insert("INSERT INTO assessment(id) VALUES (#{id})")
    void createUser(User user);

    @Update({
            "<script>",
            "UPDATE assessment",
            "SET",
            "<choose>",
            "<when test='title == \"sort1_1\"'>",
            "sort1_1 = #{data},",
            "sort_time_1_1 = #{time}",
            "</when>",
            "<when test='title == \"sort1_2\"'>",
            "sort1_2 = #{data},",
            "sort_time_1_2 = #{time}",
            "</when>",
            "<when test='title == \"sort1_3\"'>",
            "sort1_3 = #{data},",
            "sort_time_1_3 = #{time}",
            "</when>",
            "<when test='title == \"judge1_4\"'>",
            "judge1_4 = #{data.difficult},",
            "judge1_5 = #{data.speed},",
            "judge1_6 = #{data.correct}",
            "</when>",

            "<when test='title == \"sort2_1\"'>",
            "sort2_1 = #{data},",
            "sort_time_2_1 = #{time}",
            "</when>",
            "<when test='title == \"sort2_2\"'>",
            "sort2_2 = #{data},",
            "sort_time_2_2 = #{time}",
            "</when>",
            "<when test='title == \"sort2_3\"'>",
            "sort2_3 = #{data},",
            "sort_time_2_3 = #{time}",
            "</when>",
            "<when test='title == \"judge2_4\"'>",
            "judge2_4 = #{data.difficult},",
            "judge2_5 = #{data.speed},",
            "judge2_6 = #{data.correct}",
            "</when>",

            "<when test='title == \"sort3_1\"'>",
            "sort3_1 = #{data},",
            "sort_time_3_1 = #{time}",
            "</when>",
            "<when test='title == \"sort3_2\"'>",
            "sort3_2 = #{data},",
            "sort_time_3_2 = #{time}",
            "</when>",
            "<when test='title == \"sort3_3\"'>",
            "sort3_3 = #{data},",
            "sort_time_3_3 = #{time}",
            "</when>",
            "<when test='title == \"judge3_4\"'>",
            "judge3_4 = #{data.difficult},",
            "judge3_5 = #{data.speed},",
            "judge3_6 = #{data.correct}",
            "</when>",

            "<when test='title == \"sort4_1\"'>",
            "sort4_1 = #{data},",
            "sort_time_4_1 = #{time}",
            "</when>",
            "<when test='title == \"sort4_2\"'>",
            "sort4_2 = #{data},",
            "sort_time_4_2 = #{time}",
            "</when>",
            "<when test='title == \"sort4_3\"'>",
            "sort4_3 = #{data},",
            "sort_time_4_3 = #{time}",
            "</when>",
            "<when test='title == \"judge4_7\"'>",
            "judge4_7 = #{data.difficult},",
            "judge4_8 = #{data.speed},",
            "judge4_9 = #{data.correct}",
            "</when>",

            "<when test='title == \"sameEdge1_1_1\"'>",
            "sameEdge1_1_1 = #{data},",
            "sort_time_5_1 = #{time}",
            "</when>",
            "<when test='title == \"sameEdge1_2_1\"'>",
            "sameEdge1_2_1 = #{data},",
            "sort_time_5_2 = #{time}",
            "</when>",
            "<when test='title == \"sameEdge1_3_1\"'>",
            "sameEdge1_3_1 = #{data},",
            "sort_time_5_3 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_4_1\"'>",
            "sameEdge1_4_1 = #{data},",
            "sort_time_5_4 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_5_1\"'>",
            "sameEdge1_5_1 = #{data},",
            "sort_time_5_5 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_6_1\"'>",
            "sameEdge1_6_1 = #{data},",
            "sort_time_5_6 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_7_1\"'>",
            "sameEdge1_7_1 = #{data},",
            "sort_time_5_7 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_8_1\"'>",
            "sameEdge1_8_1 = #{data},",
            "sort_time_5_8 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_9_1\"'>",
            "sameEdge1_9_1 = #{data},",
            "sort_time_5_9 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_10_1\"'>",
            "sameEdge1_10_1 = #{data},",
            "sort_time_5_10 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_11_1\"'>",
            "sameEdge1_11_1 = #{data},",
            "sort_time_5_11 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge1_12_1\"'>",
            "sameEdge1_12_1 = #{data},",
            "sort_time_5_12 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_1_1\"'>",
            "sameEdge2_1_1 = #{data},",
            "sort_time_5_13 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_2_1\"'>",
            "sameEdge2_2_1 = #{data},",
            "sort_time_5_14 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_3_1\"'>",
            "sameEdge2_3_1 = #{data},",
            "sort_time_5_15 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_4_1\"'>",
            "sameEdge2_4_1 = #{data},",
            "sort_time_5_16 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_5_1\"'>",
            "sameEdge2_5_1 = #{data},",
            "sort_time_5_17 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_6_1\"'>",
            "sameEdge2_6_1 = #{data},",
            "sort_time_5_18 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_7_1\"'>",
            "sameEdge2_7_1 = #{data},",
            "sort_time_5_19 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_8_1\"'>",
            "sameEdge2_8_1 = #{data},",
            "sort_time_5_20 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_9_1\"'>",
            "sameEdge2_9_1 = #{data},",
            "sort_time_5_21 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_10_1\"'>",
            "sameEdge2_10_1 = #{data},",
            "sort_time_5_22 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_11_1\"'>",
            "sameEdge2_11_1 = #{data},",
            "sort_time_5_23 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge2_12_1\"'>",
            "sameEdge2_12_1 = #{data},",
            "sort_time_5_24 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_1_1\"'>",
            "sameEdge3_1_1 = #{data},",
            "sort_time_5_25 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_2_1\"'>",
            "sameEdge3_2_1 = #{data},",
            "sort_time_5_26 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_3_1\"'>",
            "sameEdge3_3_1 = #{data},",
            "sort_time_5_27 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_4_1\"'>",
            "sameEdge3_4_1 = #{data},",
            "sort_time_5_28 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_5_1\"'>",
            "sameEdge3_5_1 = #{data},",
            "sort_time_5_29 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_6_1\"'>",
            "sameEdge3_6_1 = #{data},",
            "sort_time_5_30 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_7_1\"'>",
            "sameEdge3_7_1 = #{data},",
            "sort_time_5_31 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_8_1\"'>",
            "sameEdge3_8_1 = #{data},",
            "sort_time_5_32 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_9_1\"'>",
            "sameEdge3_9_1 = #{data},",
            "sort_time_5_33 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_10_1\"'>",
            "sameEdge3_10_1 = #{data},",
            "sort_time_5_34 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_11_1\"'>",
            "sameEdge3_11_1 = #{data},",
            "sort_time_5_35 = #{time}",
            "</when>",

            "<when test='title == \"sameEdge3_12_1\"'>",
            "sameEdge3_12_1 = #{data},",
            "sort_time_5_36 = #{time}",
            "</when>",

            "<when test='title == \"judge5_7\"'>",
            "judge5_7 = #{data.difficult},",
            "judge5_8 = #{data.speed},",
            "judge5_9 = #{data.correct}",
            "</when>",

            "<when test='title == \"sort6_1\"'>",
            "sort6_1 = #{data}",
            "</when>",
            "<when test='title == \"sort6_2\"'>",
            "sort6_2 = #{data}",
            "</when>",
            "<when test='title == \"sort6_3\"'>",
            "sort6_3 = #{data}",
            "</when>",

            "<when test='title == \"is_important_1\"'>",
            "is_important_1 = #{data.judge1},",
            "is_important_2 = #{data.judge2},",
            "is_important_3 = #{data.judge3}",
            "</when>",
            "<when test='title == \"is_important_4\"'>",
            "is_important_4 = #{data.judge1},",
            "is_important_5 = #{data.judge2},",
            "is_important_6 = #{data.judge3}",
            "</when>",

            "<when test='title == \"other_factors\"'>",
            "other_factors = #{data}",
            "</when>",

            "</choose>",
            "WHERE id = #{id}",
            "</script>"
    })
    void saveSort(Receive receive);

}
