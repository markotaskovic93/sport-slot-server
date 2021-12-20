const IDGenerator = require('../helpers/IDGenerator.js')
const bcrypt = require('bcrypt')
const { Model } = require('sequelize')

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

    static async storePlayer(req, res) {
      try {
        let hashedPassword = bcrypt.hashSync(req.body.password, 10)
        let generatedID = IDGenerator()
        return this.create({
            id: generatedID,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            birthday: req.body.birthday,
            height: req.body.height,
            email: req.body.email,
            address: req.body.address,
            state: req.body.state,
            city: req.body.city,
            street: req.body.street,
            phone: req.body.phone,
            password: hashedPassword,
            bio: req.body.bio,
            verified: false,
            blocked: false,
            role: 'player'
        }).then(player => {
            return res.status(200).json(player)
        })
        .catch(error => {
            return res.status(400).json(`error 400: ${error}`)
        })
      } catch (error) {
          return res.status(500).json({
              message: `Server error: ${error}`
          }) 
      }
    }

  };
  Player.init({
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthday: DataTypes.STRING,
    avatar: DataTypes.STRING,
    height: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    state: DataTypes.STRING,
    email: DataTypes.STRING, 
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.TEXT,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};