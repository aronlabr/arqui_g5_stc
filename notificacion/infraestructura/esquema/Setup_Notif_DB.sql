-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema g5_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema g5_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `g5_db` DEFAULT CHARACTER SET utf8 ;
USE `g5_db` ;

-- -----------------------------------------------------
-- Table `g5_db`.`notificaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `g5_db`.`notificaciones` ;

CREATE TABLE IF NOT EXISTS `g5_db`.`notificaciones` (
  `id_notif` INT NOT NULL AUTO_INCREMENT,
  `id_emisor` INT NOT NULL,
  `id_destino` INT NOT NULL,
  `evento` VARCHAR(45) NOT NULL,
  `mensaje` TEXT NOT NULL,
  `estado` TINYINT(1) NOT NULL DEFAULT 0,
  `fc_creacion` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id_notif`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `g5_db`.`notificaciones`
-- -----------------------------------------------------
START TRANSACTION;
USE `g5_db`;
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (1, 0, 5, 'NEW_VISITA', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.', 0, '2023-10-23 21:05:02');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (2, 0, 1, 'NEW_VISITA', 'Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.', 0, '2023-10-21 17:24:52');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (3, 4, 0, 'UPDATE_VISITA', 'In eleifend quam a odio. In hac habitasse platea dictumst.', 1, '2023-10-20 21:13:37');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (4, 5, 0, 'CHECK_VISITA', 'Nulla mollis molestie lorem. Quisque ut erat.', 1, '2023-10-20 11:36:54');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (5, 1, 0, 'CHECK_VISITA', 'Donec dapibus.', 1, '2023-10-25 20:37:47');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (6, 0, 1, 'NEW_VISITA', 'Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.', 0, '2023-10-22 08:12:01');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (7, 1, 0, 'UPDATE_VISITA', 'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.', 0, '2023-10-21 09:03:51');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (8, 0, 5, 'NEW_VISITA', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 0, '2023-10-25 22:53:30');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (9, 1, 0, 'CHECK_VISITA', 'Curabitur gravida nisi at nibh.', 1, '2023-10-26 13:20:35');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (10, 4, 0, 'UPDATE_VISITA', 'Donec ut dolor.', 0, '2023-10-26 00:31:09');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (11, 2, 0, 'UPDATE_VISITA', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.', 0, '2023-10-22 01:02:40');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (12, 4, 0, 'CHECK_VISITA', 'Aenean fermentum.', 0, '2023-10-24 18:08:02');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (13, 5, 0, 'UPDATE_VISITA', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 0, '2023-10-21 07:59:57');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (14, 2, 0, 'UPDATE_VISITA', 'Integer ac leo.', 0, '2023-10-24 11:32:46');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (15, 4, 0, 'UPDATE_VISITA', 'Quisque ut erat. Curabitur gravida nisi at nibh.', 1, '2023-10-22 06:02:25');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (16, 1, 0, 'CHECK_VISITA', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 1, '2023-10-20 19:29:12');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (17, 0, 2, 'NEW_VISITA', 'Suspendisse accumsan tortor quis turpis.', 0, '2023-10-25 03:21:50');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (18, 0, 1, 'NEW_VISITA', 'Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 0, '2023-10-26 11:33:40');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (19, 5, 0, 'UPDATE_VISITA', 'Proin risus. Praesent lectus.', 0, '2023-10-23 02:08:47');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (20, 0, 4, 'NEW_VISITA', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus.', 0, '2023-10-20 02:07:38');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (21, 0, 2, 'NEW_VISITA', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 1, '2023-10-20 09:27:50');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (22, 2, 0, 'UPDATE_VISITA', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 0, '2023-10-26 09:50:00');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (23, 1, 0, 'CHECK_VISITA', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.', 0, '2023-10-23 17:34:36');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (24, 3, 0, 'CHECK_VISITA', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 1, '2023-10-26 15:43:54');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (25, 0, 5, 'NEW_VISITA', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna.', 1, '2023-10-21 00:18:16');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (26, 0, 5, 'NEW_VISITA', 'Vivamus tortor. Duis mattis egestas metus.', 1, '2023-10-24 19:50:41');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (27, 0, 1, 'NEW_VISITA', 'Phasellus sit amet erat. Nulla tempus.', 0, '2023-10-24 22:52:30');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (28, 4, 0, 'CHECK_VISITA', 'Morbi porttitor lorem id ligula.', 0, '2023-10-20 07:50:31');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (29, 5, 0, 'CHECK_VISITA', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 1, '2023-10-25 14:37:27');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (30, 0, 2, 'NEW_VISITA', 'In congue. Etiam justo.', 0, '2023-10-21 03:24:28');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (31, 0, 1, 'NEW_VISITA', 'Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor.', 1, '2023-10-23 22:15:13');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (32, 5, 0, 'UPDATE_VISITA', 'Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 0, '2023-10-22 08:23:13');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (33, 3, 0, 'UPDATE_VISITA', 'Morbi ut odio.', 0, '2023-10-23 22:59:34');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (34, 0, 5, 'NEW_VISITA', 'Morbi a ipsum. Integer a nibh.', 1, '2023-10-21 01:23:03');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (35, 4, 0, 'UPDATE_VISITA', 'Vivamus in felis eu sapien cursus vestibulum.', 1, '2023-10-26 20:19:11');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (36, 2, 0, 'CHECK_VISITA', 'Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 0, '2023-10-22 07:28:26');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (37, 3, 0, 'UPDATE_VISITA', 'Sed sagittis.', 0, '2023-10-21 15:38:36');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (38, 0, 3, 'NEW_VISITA', 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 1, '2023-10-26 13:22:08');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (39, 1, 0, 'UPDATE_VISITA', 'In eleifend quam a odio.', 0, '2023-10-24 09:32:33');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (40, 0, 4, 'NEW_VISITA', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', 1, '2023-10-20 23:55:38');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (41, 5, 0, 'CHECK_VISITA', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1, '2023-10-25 17:30:10');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (42, 0, 5, 'NEW_VISITA', 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 0, '2023-10-24 03:23:31');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (43, 3, 0, 'UPDATE_VISITA', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 0, '2023-10-26 19:48:58');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (44, 3, 0, 'CHECK_VISITA', 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 1, '2023-10-21 21:52:15');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (45, 0, 4, 'NEW_VISITA', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.', 0, '2023-10-22 02:34:37');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (46, 3, 0, 'UPDATE_VISITA', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 0, '2023-10-20 09:30:59');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (47, 5, 0, 'UPDATE_VISITA', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 0, '2023-10-25 15:42:51');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (48, 2, 0, 'CHECK_VISITA', 'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 0, '2023-10-26 15:02:52');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (49, 5, 0, 'UPDATE_VISITA', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est.', 0, '2023-10-20 02:32:38');
INSERT INTO `g5_db`.`notificaciones` (`id_notif`, `id_emisor`, `id_destino`, `evento`, `mensaje`, `estado`, `fc_creacion`) VALUES (50, 0, 5, 'NEW_VISITA', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.', 1, '2023-10-26 08:58:22');

COMMIT;

