module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Court_owners', {
      id: {
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      state: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      street: {
        allowNull: true,
        type: Sequelize.STRING
      },
      email: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      personal_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email_verified: {
        type: Sequelize.BOOLEAN
      },
      phone_verified: {
        type: Sequelize.BOOLEAN
      },
      identity_verified: {
        type: Sequelize.BOOLEAN
      },
      terms_conditions: {
        type: Sequelize.BOOLEAN
      },
      blocked: {
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
    await queryInterface.dropTable('Court_owners');
  }
};