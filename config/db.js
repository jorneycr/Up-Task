const Sequelize = require('sequelize');
const sequelize = new Sequelize('uptasknode','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAlises: false,
    define:{
        timestamps: false
    },
    pool: {
        max:5,
        min:0,
        acquire:30000,
        idle:1000
    }
});