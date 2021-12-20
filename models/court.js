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
    court_name: DataTypes.STRING,
    court_address: DataTypes.STRING,
    court_enviroment: DataTypes.STRING,
    court_size: DataTypes.STRING,
    court_available_sports: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    court_baners: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    court_state: DataTypes.STRING,
    court_city: DataTypes.STRING,
    court_street: DataTypes.STRING,
    court_facilities: DataTypes.ARRAY(DataTypes.STRING),
    court_payment_type: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Court',
  });
  return Court;
};