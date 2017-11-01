/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : youyou

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-10-31 14:04:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `collectId` varchar(255) DEFAULT NULL,
  `goodsImg` varchar(255) DEFAULT NULL,
  `goodsTitle` varchar(255) DEFAULT NULL,
  `goodsPrice` varchar(255) DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of collection
-- ----------------------------
INSERT INTO `collection` VALUES ('00000012', '15f4e12d96e', 'col15f6e08ec87', 'detial01.jpeg', 'MARSHALL 马歇尔 MAJOR II BLUETOOTH头戴式HiFi重低音蓝牙耳机', '1715.00', '2017-10-31 00:06:39');
