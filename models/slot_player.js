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
    slot_id: DataTypes.BIGINT,
    player_id: DataTypes.BIGINT,
    invite_status: DataTypes.BOOLEAN,
    invitation_responded: DataTypes.BOOLEAN,
    slot_price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Slot_player',
  });
  return Slot_player;
};