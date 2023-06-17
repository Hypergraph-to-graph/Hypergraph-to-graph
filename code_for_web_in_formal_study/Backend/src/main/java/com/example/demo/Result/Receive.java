package com.example.demo.Result;

public class Receive {
    private Object data;
    private int id;
    private int nowquestion;
    private String title;
    private int time;
    String[] array = {
            "sort1_1","sort1_2","sort1_3","judge1_4","judge1_5","judge1_6",
            "sort2_1","sort2_2","sort2_3","judge2_4","judge2_5","judge2_6",
            "sort3_1","sort3_2","sort3_3","judge3_4","judge3_5","judge3_6",
            "sort4_1","sort4_2","sort4_3","judge4_7","judge4_8","judge4_9",
            "sameEdge1_1_1", "sameEdge1_2_1", "sameEdge1_3_1", "sameEdge1_4_1", "sameEdge1_5_1", "sameEdge1_6_1",
            "sameEdge1_7_1", "sameEdge1_8_1", "sameEdge1_9_1", "sameEdge1_10_1", "sameEdge1_11_1", "sameEdge1_12_1",

            "sameEdge2_1_1", "sameEdge2_2_1", "sameEdge2_3_1", "sameEdge2_4_1", "sameEdge2_5_1", "sameEdge2_6_1",
            "sameEdge2_7_1", "sameEdge2_8_1", "sameEdge2_9_1", "sameEdge2_10_1", "sameEdge2_11_1", "sameEdge2_12_1",

            "sameEdge3_1_1", "sameEdge3_2_1", "sameEdge3_3_1", "sameEdge3_4_1", "sameEdge3_5_1", "sameEdge3_6_1",
            "sameEdge3_7_1", "sameEdge3_8_1", "sameEdge3_9_1", "sameEdge3_10_1", "sameEdge3_11_1", "sameEdge3_12_1",

            "judge5_7", "judge5_8", "judge5_9",
            "sort6_1", "sort6_2", "sort6_3",
            "is_important_1", "is_important_2", "is_important_3", "is_important_4", "is_important_5", "is_important_6",
            "other_factors"
    };

    public Receive(Object data, int id, int nowquestion, int time) {
        this.data = data;
        this.id = id;
        this.nowquestion = nowquestion;
        this.time = time;
        setTitle(nowquestion);
    }

    public void setTitle(int question){
        this.title = array[question];
    }

    public void print(){
        System.out.println("data");
        System.out.println(data);
        System.out.println(id);
        System.out.println(nowquestion);
        System.out.println(time);
    }
}
