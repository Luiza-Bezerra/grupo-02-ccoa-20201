'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'CPF',
			type: DataTypes.INTEGER,
			primaryKey: true
		},		
		nome: {
			field: 'Nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'Email',
			type: DataTypes.STRING,
			allowNull: false
		},
		tipousuario: {
			field: 'TipoUsu',
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
		fkcnpj: {
			field: 'fkCNPJ',
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
