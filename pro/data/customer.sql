/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : youyou

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-10-31 14:04:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(8) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `elephone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `timesDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `userId` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('00000012', 'Zhongshan 453', '13631421075', 'Nanjing', null, null, null, null, '2017-10-24 12:11:42', 'ky122');
INSERT INTO `customer` VALUES ('00000021', null, '13456123456', null, '12345', null, null, null, '2017-10-24 19:09:39', '15f4e12d96e');
INSERT INTO `customer` VALUES ('00000014', null, '111', null, null, null, null, null, '2017-10-24 14:18:30', '123');
INSERT INTO `customer` VALUES ('00000015', null, '12345', null, null, null, null, null, '2017-10-24 14:18:38', '1456');
INSERT INTO `customer` VALUES ('00000016', null, '35677', null, null, null, null, null, '2017-10-24 14:18:47', '2678r');
INSERT INTO `customer` VALUES ('00000017', null, 'ebtte', null, null, null, null, null, '2017-10-24 14:18:58', '23533');
INSERT INTO `customer` VALUES ('00000018', null, '24568', null, null, null, null, null, '2017-10-24 14:19:06', '3354f');
INSERT INTO `customer` VALUES ('00000019', null, '111', null, null, null, null, null, '2017-10-24 14:19:54', '123');
INSERT INTO `customer` VALUES ('00000020', null, '12345', null, null, null, null, null, '2017-10-24 16:38:12', '3456');
INSERT INTO `customer` VALUES ('00000022', null, '12345678901', null, '123456', null, null, null, '2017-10-24 19:10:52', '15f4e13f669');
INSERT INTO `customer` VALUES ('00000023', null, '12346', null, '11', null, null, null, '2017-10-24 19:14:19', '15f4e171f92');
INSERT INTO `customer` VALUES ('00000024', null, '12347', null, '11', null, null, null, '2017-10-24 19:16:18', '15f4e18f0fb');
INSERT INTO `customer` VALUES ('00000025', null, '12348', null, '11', null, null, null, '2017-10-24 19:17:06', '15f4e19aea3');
INSERT INTO `customer` VALUES ('00000026', null, '123444', null, '11', null, null, null, '2017-10-24 19:17:45', '15f4e1a43f6');
INSERT INTO `customer` VALUES ('00000027', null, '134689', null, '123', null, null, null, '2017-10-24 19:22:07', '15f4e1e45dd');
INSERT INTO `customer` VALUES ('00000028', null, '134565756', null, '11111', null, null, null, '2017-10-25 10:13:10', '15f514e0d12');
INSERT INTO `customer` VALUES ('00000029', null, '134565757', null, '11111', null, null, null, '2017-10-25 10:14:00', '15f514ed1b1');
INSERT INTO `customer` VALUES ('00000030', null, '134565758', null, '11111', null, null, null, '2017-10-25 10:14:12', '15f514f0052');
INSERT INTO `customer` VALUES ('00000031', null, '111111111', null, '1111', null, null, null, '2017-10-25 10:14:31', '15f514f47e2');
INSERT INTO `customer` VALUES ('00000032', null, '1222222', null, '11', null, null, null, '2017-10-25 12:33:45', '15f51cec364');
INSERT INTO `customer` VALUES ('00000033', null, '13631421080', null, '111111', null, null, null, '2017-10-25 14:36:06', '15f523ec406');
INSERT INTO `customer` VALUES ('00000034', null, '13631421081', null, '111111', null, null, null, '2017-10-25 14:39:33', '15f5241ed76');
INSERT INTO `customer` VALUES ('00000035', null, '13631421082', null, '111111', null, null, null, '2017-10-25 19:35:32', '15f5350ea0a');
INSERT INTO `customer` VALUES ('00000036', null, '13631421083', null, '111111', null, null, null, '2017-10-25 19:36:19', '15f5351a1c3');
INSERT INTO `customer` VALUES ('00000037', null, '13631421084', null, '111111', null, null, null, '2017-10-30 16:26:51', '15f6c63f707');
