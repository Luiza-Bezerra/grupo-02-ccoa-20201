create database luminous;
use luminous;
create table usuario 
(cnpj varchar(16) primary key,
nome varchar(50) ,
senha varchar(20),
email varchar(50)
);

create table filial (
id_filial int primary key auto_increment,
numero int,
estado varchar(2),
bairro varchar(30),
cidade varchar(30),
rua varchar(50),
fk_cnpj_usuario  varchar(16),
   foreign key (fk_cnpj_usuario) references usuario(cnpj)
);

create table comodo (
id_comodo int primary key auto_increment,
nome varchar(30),
qtde_lampadas int,
fk_filial int,
foreign key (fk_filial) references filial(id_filial)) auto_increment = 100;

create table sensor (
id_sensor int primary key auto_increment,
grau_luminosidade float,
fk_comodo int,
foreign key (fk_comodo) references comodo(id_comodo)
) auto_increment = 1000;

drop database luminous;

