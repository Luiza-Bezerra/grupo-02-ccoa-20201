'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Empresa = sequelize.define('Empresa',{
		idempresa: {
			field: 'CNPJ',
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull:false
		},		
		nome: {
			field: 'Nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'Telefone',
			type: DataTypes.STRING,
			allowNull: false
		},
		celular: {
			field: 'Celular',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'Empresa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Empresa;
};
