'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court_slots extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Court_slots.init({
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    court_id: DataTypes.BIGINT,
    court_slot_date: DataTypes.STRING,
    court_slot_start_time: DataTypes.STRING,
    court_slot_end_time: DataTypes.STRING,
    court_slot_price: DataTypes.STRING,
    court_slot_discount: DataTypes.STRING,
    booked: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Court_slots',
  });
  return Court_slots;
};