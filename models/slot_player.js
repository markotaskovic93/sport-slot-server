'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot_player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slot_player.init({
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    slot_reservation_id: DataTypes.BIGINT,
    player_id: DataTypes.BIGINT,
    invitation_status: DataTypes.BOOLEAN,
    invitation_responded: DataTypes.BOOLEAN,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Slot_player',
  });
  return Slot_player;
};