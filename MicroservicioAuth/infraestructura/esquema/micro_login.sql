-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-10-2023 a las 22:45:52
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `micro_login`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `name`, `pass`) VALUES
(1, 'aldairam', 'Aldair Asencio', '$2a$08$V5NL6Ujj0WnoAjQxNVDgF.jCRV/zUdAMx4l/.TgtZ3Rc5Mqrm3kI2'),
(2, 'admin', 'Administrador', '$2a$08$1tMBq26AcdoU0WfqQLKCTeJSo5.300hK1iLLrzcnBDoXjHMPrSbam'),
(3, 'usuarioam', 'Usuario', '$2a$08$QwYTff48EamLvTajK2XFyukxGQrqv8zou4CLvHOKr4oRVXUuz767a'),
(4, 'aldair', 'Aldair Asencio Medina', '$2a$08$q9NwW7OW/Zb8B.dS02dNh.eYKjVsVdyF8uUeGgnTt3nhOKkgIX0su'),
(5, 'enrique', 'Enrique Medina', '$2a$08$kGw7djYWrWTm/bpzAp1R0uVodVgYYOVLYsCDbg7ZHfEECFLnjUJ/e');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
