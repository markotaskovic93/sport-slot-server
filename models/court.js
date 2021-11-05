'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Court.init({
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    court_owner_id: DataTypes.BIGINT,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    court_enviroment: DataTypes.STRING,
    court_size: DataTypes.STRING,
    available_sports: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    baners: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};