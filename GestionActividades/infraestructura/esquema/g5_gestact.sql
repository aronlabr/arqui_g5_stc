-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 01-11-2023 a las 19:37:29
-- Versión del servidor: 8.2.0
-- Versión de PHP: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `g5_gestact`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL,
  `nombre_full` varchar(100) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `direccion` varchar(200) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `foto` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre_full`, `dni`, `telefono`, `direccion`, `correo`, `foto`) VALUES
(1, 'Armando Paredes', '99999999', '900900900', 'Av. la Marina 2382, San Miguel', 'armando@paredes.com', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id_incidencia` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_puntoatencion` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fecha_ruta` date DEFAULT NULL,
  `descripcion_prob` varchar(200) NOT NULL,
  `descripcion_sol` varchar(200) DEFAULT NULL,
  `fc_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `incidencia`
--

INSERT INTO `incidencia` (`id_incidencia`, `id_cliente`, `id_puntoatencion`, `estado`, `fecha_ruta`, `descripcion_prob`, `descripcion_sol`, `fc_creacion`) VALUES
(1, 1, 1, 0, '2023-11-02', 'Lorem ipsum ipsum ipsum ipsum ipsum ipsum.', NULL, '2023-11-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `punto_atencion`
--

CREATE TABLE `punto_atencion` (
  `id_puntoatencion` int NOT NULL,
  `id_cliente` int NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `latitud` double NOT NULL,
  `longitud` double NOT NULL,
  `ubigeo` int NOT NULL,
  `foto` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `punto_atencion`
--

INSERT INTO `punto_atencion` (`id_puntoatencion`, `id_cliente`, `direccion`, `latitud`, `longitud`, `ubigeo`, `foto`) VALUES
(1, 1, 'Av. la Marina 2382, San Miguel', -12.077491373558173, -77.08750756204068, 15088, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `fk_clientein` (`id_cliente`);

--
-- Indices de la tabla `punto_atencion`
--
ALTER TABLE `punto_atencion`
  ADD PRIMARY KEY (`id_puntoatencion`),
  ADD KEY `fk_clientepa` (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id_incidencia` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `punto_atencion`
--
ALTER TABLE `punto_atencion`
  MODIFY `id_puntoatencion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD CONSTRAINT `fk_clientein` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `punto_atencion`
--
ALTER TABLE `punto_atencion`
  ADD CONSTRAINT `fk_clientepa` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
