'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Player.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    height: DataTypes.DECIMAL,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    password: DataTypes.CHAR,
    bio: DataTypes.TEXT,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};