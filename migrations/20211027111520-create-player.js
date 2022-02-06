module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Players', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthday: {
        allowNull: false,
        type: Sequelize.STRING
      },
      height: {
        allowNull: false,
        type: Sequelize.STRING
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      age: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      sport: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      phone_verified: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      terms_conditions: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      blocked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Players');
  }
};