'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Sensor = sequelize.define('Sensor',{
		idsensor: {
			field: 'idSensor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		fksala: {
			field: 'fkSala',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, 
	{
		tableName: 'Sensor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Sensor;
};
