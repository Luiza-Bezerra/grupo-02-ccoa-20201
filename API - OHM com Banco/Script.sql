create database monitoramento;
#drop database monitoramento;
use monitoramento;

create table tbEmpresa (
	idEmpresa int primary key auto_increment,
    nomeEmpresa varchar(45),
    endereco varchar(45)
)auto_increment = 1000;

create table tbUsuario (
	idUsuario int primary key auto_increment,
    login varchar(45),
    senha varchar(45),
    fkEmpresaUsuario int,
    foreign key(fkEmpresaUsuario) references tbEmpresa(idEmpresa)
) auto_increment = 10000;

create table tbServidor (
	idServidor int primary key auto_increment,
    fkEmpresaServidor int,
    foreign key(fkEmpresaServidor) references tbEmpresa(idEmpresa)
)auto_increment = 0;

create table tbAcesso (
	fkUsuario int,
    fkServidorAcesso int,
    dataHoraAcesso datetime,
    primary key(fkUsuario, fkServidorAcesso)
);

create table tbComponente (
	idComponente int primary key auto_increment,
    nomeComponente varchar(45),
    metrica varchar(45)
)auto_increment = 100;

create table tbLeitura (
	dataHoraLeitura datetime,
    dadoLeitura float,
    fkServidorLeitura int,
    fkComponente int,
    foreign key(fkServidorLeitura) references tbServidor(idServidor),
    foreign key(fkComponente) references tbComponente(idComponente),
    primary key(dataHoraLeitura, fkServidorLeitura, fkComponente)
);

desc tbLeitura;

desc tbServidor;

insert into tbEmpresa (nomeEmpresa, endereco) values
('Luminous', 'Rua Hadock Lobo');

select * from tbEmpresa;
select * from tbUsuario;
select * from tbServidor;
select * from tbComponente;
select * from tbLeitura;
select nomeComponente as 'Componente', dadoLeitura as 'Valor', metrica as 'Metrica' from tbLeitura, tbComponente where fkComponente = idComponente;

insert into tbUsuario (login, senha, fkEmpresaUsuario) values
('func1', '123', 1000);

insert into tbServidor (fkEmpresaServidor) values
(1000);

insert into tbComponente (nomeComponente, metrica) values
('Nome da Maquina','Nome'),
('Placa Mãe','Nome'),
('Clock','MHz'),
('Temperatura','ºC'),
('Ram','GB');

