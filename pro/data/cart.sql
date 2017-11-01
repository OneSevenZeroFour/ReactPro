/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : youyou

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-10-31 14:04:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `cartId` varchar(255) DEFAULT NULL,
  `shops` varchar(255) DEFAULT NULL,
  `goodsImg` varchar(255) DEFAULT NULL,
  `goodsTitle` varchar(255) DEFAULT NULL,
  `goodsNum` varchar(255) DEFAULT NULL,
  `goodsPrice` varchar(255) DEFAULT NULL,
  `goodsStyle` varchar(255) DEFAULT NULL,
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------
INSERT INTO `cart` VALUES ('00000044', '15f4e12d96e', 'car15f6e2cafd7', '我帮海购专营店', 'http://img04.bubugao.com/15741748a06_2_2272d9b3e48d325e37f384fa6ff8c9c4_800x800.jpeg!l4', '【组合装】U By Kotex绵柔日用4包×14片+夜用卫生巾2包×10片 澳洲直邮', '4', '196', 'U By Kotex', '2017-10-31 00:45:43');
