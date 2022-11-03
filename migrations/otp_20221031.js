'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('otp', {
        sn: {
            type: Sequelize.INTEGER,
            autoincrement: true,
            primaryKey: true
        },
        customer_id: {
            type: Sequelize.STRING,
            reference: {
                model: 'customer',
                key:'customer_id'
            },
        },
        otp: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone_number: {
            type: Sequelize.STRING,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        modified_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      })
    },
    async down(queryInterface, Sequelize)
    {
      await queryInterface.dropTable('otp');
    }
  };