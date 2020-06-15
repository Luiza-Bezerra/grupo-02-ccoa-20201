'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'idUsuario',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'Nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		login: {
			field: 'Email',
			type: DataTypes.STRING,
			allowNull: false
		},
		tipousuario: {
			field: 'TipoUsuario',
			type: DataTypes.STRING,
			allowNull: false
		},
		cpf: {
			field: 'CPF',
			type: DataTypes.STRING,
			allowNull: false
		},
		rg: {
			field: 'RG',
			type: DataTypes.STRING,
			allowNull: false
		},
		datanasc: {
			field: 'DataNasc',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'Senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		empresa: {
			field: 'fkEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'Usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
