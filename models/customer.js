// 'use strict';

// const { Model } = require("DataTypes");

// module.exports = (sequelize, DataTypes) =>{
//         class customer extends Model{
//         }  
//      customer.init({
//         sn: {
//             type: DataTypes.INTEGER,
//             autoincrement: true,
//             unique: true
//         },
//         customer_id: {
//             type: DataTypes.STRING,
//             primaryKey: true
//         },
//         title: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         lastname: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         othernames: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         is_email_verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         },
//         phone_number: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         is_phone_number_verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         },
//         gender: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         house_number: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         street: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         landmark: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         local_govt: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         dob: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         nin: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         is_nin_verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: null
//         },
//         bvn: {
//             type: DataTypes.STRING,
//             allowNull: true,
//             defaultValue: null
//         },
//         is_bvn_verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: null
//         },
//         country: {
//             type: DataTypes.STRING,
//             defaultValue: null
//         },
//         state_origin: {
//             type: DataTypes.STRING,
//             defaultValue: null
//         },
//         local_got_origin: {
//             type: DataTypes.STRING,
//             defaultValue: null
//         },
//         means_of_id_number: {
//             type: DataTypes.STRING,
//             defaultValue: null
//         },
//         is_means_of_id_number_verified: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: null
//         },
//         photo: {
//             type: DataTypes.STRING,
//             defaultValue: null
//         },
//         marital_status: {
//             type: DataTypes.STRING,
//             defaultValue: null
//         },
//         password_hash: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         password_salt: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         is_diable: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         },
//         is_disable_reason: {
//             type: DataTypes.TEXT,
//             defaultValue: null
//         },
//         created_at: {
//             allowNull: true,
//             type: DataTypes.DATE,
//             defaultValue: DataTypes.NOW,
//         },
//         modified_at: {
//             allowNull: false,
//             type: DataTypes.DATE,
//             defaultValue: DataTypes.NOW,
//         }
//     },
//     {
//         DataTypes,
//         timestamps:true,
//         modelName: 'customer'
//     }
// );  
// return customer;
// };
 
        