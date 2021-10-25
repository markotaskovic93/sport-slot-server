const { Sequelize } = require("sequelize");
const DB_CONFIG = require("../../config/config.json")

const sequelize = new Sequelize(DB_CONFIG.development.database, DB_CONFIG.development.username, DB_CONFIG.development.password, {
    host: DB_CONFIG.development.host,
    dialect: DB_CONFIG.development.dialect
})

module.exports = sequelize

