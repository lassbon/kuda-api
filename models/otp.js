'use strict';

const { Model } = require('DataTypes');

module.exports = (sequelize, DataTypes) => {
	class otp extends Model {
		
	}
    otp.init({
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true
       }, 
        otp: DataTypes.STRING,
        phone: DataTypes.STRING,
        email:  DataTypes.STRING
      }, {
        sequelize,
        modelName: 'otp',
      });
      return otp;
    };