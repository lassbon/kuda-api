const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
     process.env.DATABASE_NAME, 
     process.env.DATABASE_USER,
     process.env.DATABASE_PASSWORD,
    {
    port: process.env.DATABASE_PORT,   
    host: process.env.DATABASE_HOST,
    dialect: 'mysql2' /* 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    }
);

module.exports= sequelize