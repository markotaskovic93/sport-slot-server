const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot_reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Slot_reservation.init({
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    }, 
    court_id: DataTypes.BIGINT,
    slot_id: DataTypes.BIGINT,
    player_id: DataTypes.BIGINT,
    players_needed: DataTypes.STRING,
    reservation_status: DataTypes.STRING,
    blocked: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Slot_reservation',
  });
  return Slot_reservation;
};