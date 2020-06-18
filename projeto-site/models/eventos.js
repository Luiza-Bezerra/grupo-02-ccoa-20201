'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Eventos = sequelize.define('Eventos',{
		ideventos: {
			field: 'idEventos',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		dataevento: {
			field: 'DataEvento',
			type: DataTypes.STRING,
			allowNull: false
		},
		graulum: {
			field: 'GrauLum',
			type: DataTypes.REAL,
			allowNull: false
		},
		fksensor: {
			field: 'fkSensor',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'Eventos', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Eventos;
};
