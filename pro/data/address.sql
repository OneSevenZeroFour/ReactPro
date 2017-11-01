/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : youyou

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-10-31 14:04:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `addressId` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `elephone` varchar(255) DEFAULT NULL,
  `customer` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('00000020', '15f5351a1c3', 'add15f535b7491', '广东省 广州市 越秀区 xxxxx', 'xxx', 'xx', '1508932023431', '2017-10-25 19:47:03');
INSERT INTO `address` VALUES ('00000018', '15f51cec364', 'add15f5232286a', '广东省 广州市 越秀区 ss', 'ss', 'xxx', '', '2017-10-25 14:22:19');
INSERT INTO `address` VALUES ('00000019', '15f5351a1c3', 'add15f5356fc70', '广东省 广州市 越秀区 xxx', 'xx', 'xxxx', '1508931730537', '2017-10-25 19:42:10');
INSERT INTO `address` VALUES ('00000016', '15f51cec364', 'add15f51cf2d28', '广东省 广州市 越秀区 xxx', 'xxx', 'xxx', '1508912030358', '2017-10-25 14:13:50');
INSERT INTO `address` VALUES ('00000014', '15f514f47e2', 'add15f517eaac7', '广东省 广州市 越秀区 xxxx', 'xxx', 'xxx', '1508904058359', '2017-10-25 12:00:58');
INSERT INTO `address` VALUES ('00000015', '15f514f47e2', 'add15f517eda4f', '广东省 广州市 越秀区 xxxxxxx', 'xxx', 'xxxxxxxxx', '1508904057563', '2017-10-25 12:00:57');
INSERT INTO `address` VALUES ('00000017', '15f51cec364', 'add15f522a4eff', '广东省 广州市 越秀区 sss', 'ssssss', 'sssss', '1508912025335', '2017-10-25 14:22:08');
INSERT INTO `address` VALUES ('00000021', '15f6c63f707', 'add15f6c7b3a04', '广东省 湛江市 徐闻县 xxx', 'xxx', 'xxxx', '1509353569236', '2017-10-30 16:52:49');
INSERT INTO `address` VALUES ('00000023', '15f4e12d96e', 'add15f6e04f62e', '广东省 湛江市 徐闻县 xxx', 'xxx', 'xxx', '1509379339813', '2017-10-31 00:02:19');
