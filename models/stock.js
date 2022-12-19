'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  stock.init({
    sn: {
      type: DataTypes.INTEGER
    },
    stock_id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    stock_name :{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
     stock_details : {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
     },  
     stock_category:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
     } ,
     stock_unit_price :{
      type: DataTypes.DECIMAL(20, 2)
     },  
     stock_quantity :{
      type: DataTypes.DECIMAL(20, 2)
     },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  },
    {
      sequelize,
      modelName: 'stock',
  });
  return stock;
};