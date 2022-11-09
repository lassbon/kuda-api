'use strict';


const { DataTypes  } = require("sequelize");

module.exports = (sequelize, DataTypes) => 
{
  const otp = sequelize.define('otps', 
  {
    sn: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    
    },
    customer_id: { 
        type: DataTypes.STRING,    
    },
    otp: { 
        type: DataTypes.STRING,
    
    },
    phone: { 
        type: DataTypes.STRING,
    
    },
    email: { 
        type: DataTypes.STRING,
    
    },

createdAt: { //createdAt
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {});

 
  return otp;


}