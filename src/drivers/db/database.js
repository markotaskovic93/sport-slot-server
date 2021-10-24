import { Sequelize } from "sequelize";

const sequelize = new Sequelize('databaseName', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize

