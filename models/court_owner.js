const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Court_owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Court_owner.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    birthday: DataTypes.DATE,
    address: DataTypes.STRING,
    email: DataTypes.CHAR,
    password: DataTypes.CHAR,
    phone: DataTypes.CHAR,
    personal_id: DataTypes.CHAR,
    nationality: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Court_owner',
  });
  return Court_owner;
};