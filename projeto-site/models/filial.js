'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Filial = sequelize.define('Filial',{
		idfilial: {
			field: 'idFilial',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		telefone: {
			field: 'Telefone',
			type: DataTypes.STRING,
			allowNull: false
		},
		rua: {
			field: 'Rua',
			type: DataTypes.STRING,
			allowNull: false
		},
		bairro: {
			field: 'Bairro',
			type: DataTypes.STRING,
			allowNull: false
        },
        cidade: {
			field: 'Cidade',
			type: DataTypes.STRING,
			allowNull: false
		},
		numero: {
			field: 'Numero',
			type: DataTypes.INTEGER,
			allowNull: false
        },
        estado: {
			field: 'Estado',
			type: DataTypes.STRING,
			allowNull: false
		},
		fkcnpj: {
			field: 'fkCNPJ',
			type: DataTypes.STRING,
			allowNull: false
        },
        fkusuario: {
			field: 'fkUsuario',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'Filial', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Filial;
};
