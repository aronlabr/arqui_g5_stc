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
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (1, 'NEW_VISITA', 0, 1, 'Una visita fue agendada', 1, '2023-11-27 21:52:33');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (2, 'UPDATE_VISITA', 4, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-24 11:16:54');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (3, 'CHECK_VISITA', 2, 0, 'La cuadrilla atendió una visita', 1, '2023-11-24 17:32:22');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (4, 'NEW_VISITA', 0, 5, 'Una visita fue agendada', 1, '2023-11-25 16:20:54');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (5, 'UPDATE_VISITA', 1, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-27 17:33:11');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (6, 'CHECK_VISITA', 2, 0, 'La cuadrilla atendió una visita', 1, '2023-11-24 11:48:22');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (7, 'NEW_VISITA', 0, 4, 'Una visita fue agendada', 1, '2023-11-29 01:33:59');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (8, 'UPDATE_VISITA', 4, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-26 19:43:10');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (9, 'CHECK_VISITA', 5, 0, 'La cuadrilla atendió una visita', 1, '2023-11-25 23:25:22');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (10, 'NEW_VISITA', 0, 1, 'Una visita fue agendada', 1, '2023-11-26 19:07:36');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (11, 'UPDATE_VISITA', 2, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-24 11:58:33');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (12, 'CHECK_VISITA', 5, 0, 'La cuadrilla atendió una visita', 1, '2023-11-26 03:28:54');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (13, 'NEW_VISITA', 0, 5, 'Una visita fue agendada', 1, '2023-11-25 13:51:25');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (14, 'UPDATE_VISITA', 5, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-29 13:57:48');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (15, 'CHECK_VISITA', 2, 0, 'La cuadrilla atendió una visita', 1, '2023-11-30 19:52:35');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (16, 'NEW_VISITA', 0, 3, 'Una visita fue agendada', 1, '2023-11-30 08:16:39');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (17, 'UPDATE_VISITA', 5, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-29 22:38:48');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (18, 'CHECK_VISITA', 5, 0, 'La cuadrilla atendió una visita', 1, '2023-11-24 20:56:48');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (19, 'NEW_VISITA', 0, 4, 'Una visita fue agendada', 1, '2023-11-29 04:20:15');
insert into notificaciones (id_notif, evento, id_emisor, id_destino, mensaje, estado, fc_creacion) values (20, 'UPDATE_VISITA', 2, 0, 'La cuadrilla actualizo una visita', 1, '2023-11-27 07:42:16');

COMMIT;

