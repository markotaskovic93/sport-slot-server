'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fee extends Model {
    
  };
  Fee.init({
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    slot_base_fee: DataTypes.STRING,
    slot_additional_fee: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fee',
  });
  return Fee;
};