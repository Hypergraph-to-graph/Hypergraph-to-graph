/*
 Navicat Premium Data Transfer

 Source Server         : hypergraph
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : hypergraph

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 11/06/2023 14:26:17
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for assessment
-- ----------------------------
DROP TABLE IF EXISTS `assessment`;
CREATE TABLE `assessment`  (
  `id` int NOT NULL,
  `sort1_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort_time_1_1` int NULL DEFAULT NULL,
  `sort1_2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort_time_1_2` int NULL DEFAULT NULL,
  `sort1_3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort_time_1_3` int NULL DEFAULT NULL,
  `judge1_4` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge1_5` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge1_6` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort2_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort2_2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort2_3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge2_4` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge2_5` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge2_6` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort3_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort3_2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort3_3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge3_4` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge3_5` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge3_6` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort4_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort4_2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort4_3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge4_7` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge4_8` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge4_9` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sameEdge1_1_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_2_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_3_1` tinyint(1) NULL DEFAULT NULL,
  `judge5_7` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge5_8` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `judge5_9` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort6_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort6_2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort6_3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_important_1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_important_2` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_important_3` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_important_4` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_important_5` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `other_factors` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `sort_time_2_1` int NULL DEFAULT NULL,
  `sort_time_2_2` int NULL DEFAULT NULL,
  `sort_time_2_3` int NULL DEFAULT NULL,
  `sort_time_3_1` int NULL DEFAULT NULL,
  `sort_time_3_2` int NULL DEFAULT NULL,
  `sort_time_3_3` int NULL DEFAULT NULL,
  `sort_time_4_1` int NULL DEFAULT NULL,
  `sort_time_4_2` int NULL DEFAULT NULL,
  `sort_time_4_3` int NULL DEFAULT NULL,
  `sort_time_5_1` int NULL DEFAULT NULL,
  `sort_time_5_2` int NULL DEFAULT NULL,
  `sort_time_5_3` int NULL DEFAULT NULL,
  `sort_time_5_4` int NULL DEFAULT NULL,
  `sort_time_5_5` int NULL DEFAULT NULL,
  `sort_time_5_6` int NULL DEFAULT NULL,
  `sameEdge1_4_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_5_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_6_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_7_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_8_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_9_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_10_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_11_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge1_12_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_1_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_2_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_3_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_4_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_5_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_6_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_7_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_8_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_9_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_10_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_11_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge2_12_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_1_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_2_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_3_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_4_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_5_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_6_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_7_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_8_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_9_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_10_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_11_1` tinyint(1) NULL DEFAULT NULL,
  `sameEdge3_12_1` tinyint(1) NULL DEFAULT NULL,
  `sort_time_5_13` int NULL DEFAULT NULL,
  `sort_time_5_14` int NULL DEFAULT NULL,
  `sort_time_5_15` int NULL DEFAULT NULL,
  `sort_time_5_16` int NULL DEFAULT NULL,
  `sort_time_5_17` int NULL DEFAULT NULL,
  `sort_time_5_18` int NULL DEFAULT NULL,
  `sort_time_5_19` int NULL DEFAULT NULL,
  `sort_time_5_20` int NULL DEFAULT NULL,
  `sort_time_5_21` int NULL DEFAULT NULL,
  `sort_time_5_22` int NULL DEFAULT NULL,
  `sort_time_5_23` int NULL DEFAULT NULL,
  `sort_time_5_24` int NULL DEFAULT NULL,
  `sort_time_5_25` int NULL DEFAULT NULL,
  `sort_time_5_26` int NULL DEFAULT NULL,
  `sort_time_5_27` int NULL DEFAULT NULL,
  `sort_time_5_28` int NULL DEFAULT NULL,
  `sort_time_5_29` int NULL DEFAULT NULL,
  `sort_time_5_30` int NULL DEFAULT NULL,
  `sort_time_5_31` int NULL DEFAULT NULL,
  `sort_time_5_32` int NULL DEFAULT NULL,
  `sort_time_5_33` int NULL DEFAULT NULL,
  `sort_time_5_34` int NULL DEFAULT NULL,
  `sort_time_5_35` int NULL DEFAULT NULL,
  `sort_time_5_36` int NULL DEFAULT NULL,
  `sort_time_5_7` int NULL DEFAULT NULL,
  `sort_time_5_8` int NULL DEFAULT NULL,
  `sort_time_5_9` int NULL DEFAULT NULL,
  `sort_time_5_10` int NULL DEFAULT NULL,
  `sort_time_5_11` int NULL DEFAULT NULL,
  `sort_time_5_12` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_danish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of assessment
-- ----------------------------
INSERT INTO `assessment` VALUES (1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL,
  `age` int NULL DEFAULT NULL,
  `gender` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `research_field` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_familiar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `is_used` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  `introduce` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_danish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_danish_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 0, '', '', '', '', '');

SET FOREIGN_KEY_CHECKS = 1;
