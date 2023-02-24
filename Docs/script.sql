create database sgt;

use sgt;

create table Usuario (
    id int not null AUTO_INCREMENT,
    usuario varchar(50) not null,
    contrasena varchar(100) not null,
    constraint PKUsuario primary key (id));

create table Tarea (
    id int not null AUTO_INCREMENT,
    titulo varchar(50) not null,
    descripcion varchar(100) not null,
    estatus boolean not null,
    fechaE date not null,
    comentarios varchar(255),
    responsable varchar(50),
    tags varchar(100),
    usuario int not null,
    constraint PKTarea primary key (id),
    constraint FKTarea_Usuario foreign key (usuario)
    references Usuario (id));