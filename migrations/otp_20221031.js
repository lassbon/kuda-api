'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('otp', {
        sn: { 
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        
        },
        customer_id: { 
            type: Sequelize.STRING,
            references: {
                model: 'customer',
                key: 'customer_id'
            },
             
        },
        otp: { 
            type: Sequelize.STRING,
        
        },
        phone: { 
            type: Sequelize.STRING,
        
        },
        email: { 
            type: Sequelize.STRING,
        
        },

      createdAt: { //createdAt
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })
  },
   
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('otp')
    
  }
};