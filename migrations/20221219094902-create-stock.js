'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stocks', {
      
      sn: {
        type: Sequelize.INTEGER
      },
       stock_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      stock_name :{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
       stock_details : {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
       },  
       stock_category:{
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
       } ,
       stock_unit_price :{
        type: Sequelize.DECIMAL(20, 2)
       },  
       stock_quantity :{
        type: Sequelize.DECIMAL(20, 2)
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stocks');
  }
};