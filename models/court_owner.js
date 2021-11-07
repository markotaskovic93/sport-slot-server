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
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    birthday: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    personal_id: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Court_owner',
  });
  return Court_owner;
};