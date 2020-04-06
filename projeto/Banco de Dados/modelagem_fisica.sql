create database luminous;
use luminous;
create table usuario 
(
id_empresa int primary key,
cnpj varchar(16),
nome varchar(50) ,
senha varchar(20),
email varchar(50),
tel1 varchar(12),
tel2 varchar(12)
);

create table filial (
id_filial int primary key auto_increment,
numero int,
estado varchar(2),
bairro varchar(30),
cidade varchar(30),
rua varchar(50),
fk_usuario int,
   foreign key (fk_usuario) references usuario(id_empresa)
)auto_increment=100;

create table comodo (
id_comodo int primary key auto_increment,
nome varchar(30),
qtde_lampadas int,
fk_filial int,
num_sensores int,
foreign key (fk_filial) references filial(id_filial)) auto_increment = 1000;

create table sensor (
id_sensor int primary key auto_increment,
grau_luminosidade float,
fk_comodo int,
foreign key (fk_comodo) references comodo(id_comodo)
) auto_increment = 10000;

drop database luminous;

