insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (11, 'Arlene Beetham', '804569871', '552089406', '305 Pearson Place', 'abeetham0@yolasite.com');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (2, 'Mollee Glennie', '887337233', '574183858', '15019 Clove Road', 'mglennie1@uiuc.edu');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (3, 'Verina Pedler', '937138791', '518601431', '1251 Waxwing Parkway', 'vpedler2@csmonitor.com');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (4, 'Guthrie Windridge', '942675296', '762303967', '240 Northwestern Trail', 'gwindridge3@so-net.ne.jp');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (5, 'Roddy Holtom', '921594486', '679015173', '621 Hovde Parkway', 'rholtom4@telegraph.co.uk');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (6, 'Haze Turtle', '803653089', '936928725', '15113 Mariners Cove Crossing', 'hturtle5@newsvine.com');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (7, 'Oralie Santry', '814212940', '817488091', '1624 Fisk Avenue', 'osantry6@mozilla.org');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (8, 'Karyn Peachman', '818086004', '739776901', '47469 3rd Circle', 'kpeachman7@arizona.edu');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (9, 'Dierdre Franciotti', '857651387', '465501807', '5 Dawn Road', 'dfranciotti8@jugem.jp');
insert into cliente (id_cliente, nombre_full, dni, telefono, direccion, correo) values (10, 'Latrena MacMychem', '829194184', '623866543', '40 Monument Center', 'lmacmychem9@deliciousdays.com');

insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (21, 2, '449 Prairieview Road', 36.1457192, -86.8066559, 14177);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (2, 6, '4 Hermina Drive', 50.0105928, 12.624753, 14015);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (3, 3, '6 Summit Parkway', 28.040993, 120.658812, 15177);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (4, 1, '7081 Talisman Plaza', 36.865827, 116.231416, 15083);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (5, 6, '75603 Green Ridge Plaza', 43.617445, 124.139465, 14230);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (6, 6, '84 Scofield Terrace', 16.8564272, 120.7963702, 13285);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (7, 7, '048 Vidon Center', -8.639266, 122.281829, 14832);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (8, 3, '808 Larry Parkway', -9.38948, 119.75371, 13667);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (9, 5, '8594 Eagan Lane', 19.5959923, -99.2820233, 13289);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (10, 4, '833 Shasta Junction', 51.2034445, 18.9005028, 15037);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (11, 10, '908 Eagle Crest Crossing', 30.89441, 120.086809, 14523);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (12, 9, '40682 Meadow Valley Center', 40.5974058, 19.8082799, 15039);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (13, 1, '02 Hovde Center', 8.1642301, 99.6756794, 13096);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (14, 10, '7 Ruskin Avenue', 14.1586723, 121.2408815, 12770);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (15, 9, '5 Stuart Hill', 28.706919, 117.821005, 12169);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (16, 4, '066 Schlimgen Place', -7.0890281, 108.8610899, 15124);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (17, 4, '751 Carpenter Trail', 10.3385626, 122.9316044, 13115);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (18, 2, '68967 Kensington Crossing', -4.083144, 137.179103, 13802);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (19, 2, '88313 Truax Center', 23.9211737, -106.8915948, 14943);
insert into punto_atencion (id_puntoatencion, id_cliente, direccion, latitud, longitud, ubigeo) values (20, 4, '5 Shelley Plaza', 32.2009532, 119.4314373, 12799);


insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (2, 10, 2, 0, 'No hay señal de teléfono', 'Reiniciar el dispositivo', '2023-11-26');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (3, 6, 3, 1, 'No se pueden recibir llamadas', 'Restaurar la configuración predeterminada', '2023-11-23');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (4, 1, 4, 1, 'El teléfono no carga', 'Restaurar la configuración predeterminada', '2023-11-25');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (5, 5, 5, 1, 'El servicio de cable se interrumpe', 'Ejecutar un análisis de virus', '2023-11-26');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (6, 1, 6, 0, 'El teléfono no carga', 'Comprobar los controladores del dispositivo', '2023-11-25');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (7, 8, 7, 0, 'No hay señal de teléfono', 'Limpiar la caché del navegador', '2023-11-25');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (8, 2, 8, 1, 'El control remoto del cable no funciona', 'Verificar la conexión a internet', '2023-11-26');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (9, 4, 9, 0, 'No se pueden recibir llamadas', 'Realizar una copia de seguridad y restaurar los datos', '2023-11-29');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (10, 8, 10, 0, 'El teléfono no carga', 'Reiniciar el dispositivo', '2023-11-24');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (11, 3, 11, 1, 'No se pueden recibir llamadas', 'Actualizar el software', '2023-11-28');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (12, 10, 12, 0, 'Problemas con la conexión a internet', 'Reiniciar el dispositivo', '2023-11-26');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (13, 6, 13, 0, 'La velocidad de internet es muy lenta', 'Restaurar la configuración predeterminada', '2023-11-26');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (14, 1, 14, 0, 'No hay señal de teléfono', 'Limpiar la caché del navegador', '2023-11-22');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (15, 5, 15, 0, 'Problemas con la conexión a internet', 'Ejecutar un análisis de virus', '2023-11-28');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (16, 6, 16, 1, 'No hay señal de teléfono', '', '2023-11-29');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (17, 7, 17, 1, 'Problemas con la conexión a internet', '', '2023-11-28');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (18, 2, 18, 0, 'No se pueden ver ciertos canales en el cable', '', '2023-11-29');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (19, 4, 19, 0, 'Problemas con la conexión a internet', '', '2023-11-28');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (20, 4, 20, 1, 'El cable se corta constantemente', '', '2023-11-22');
insert into incidencia (id_incidencia, id_cliente, id_puntoatencion, estado, descripcion_prob, descripcion_sol, fc_creacion) values (21, 3, 1, 1, 'El control remoto del cable no funciona', '', '2023-11-24');
