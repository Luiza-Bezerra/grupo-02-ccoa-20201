'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sala = sequelize.define('Sala',{
		idsala: {
			field: 'idSala',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		lummin: {
			field: 'LumMin',
			type: DataTypes.STRING,
			allowNull: false
		},
		lummax: {
			field: 'LumMax',
			type: DataTypes.STRING,
			allowNull: false
		},
		nome: {
			field: 'Nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		numlamp: {
			field: 'NumLamp',
			type: DataTypes.INTEGER,
			allowNull: false
        },
        numsensores: {
			field: 'NumSensores',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		fkFilial: {
			field: 'fkFilial',
			type: DataTypes.INTEGER,
			allowNull: false
        }
	}, 
	{
		tableName: 'Sala', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Sala;
};
